import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { fetchCurrentUser, fetchPublicUsers } from '../service/userService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await fetchCurrentUser(userId, token);
        setLoggedInUser(currentUser);

        const publicUsers = await fetchPublicUsers(token);
        setUsers(publicUsers);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    if (userId && token) loadData();
  }, [userId, token]);

  // 🔹 Pagination logic
  const filteredUsers = users.filter((u) => u._id !== loggedInUser?._id && u.id !== loggedInUser?.id);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  return (
    <div className="bg-[#F9F3EF] min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-extrabold text-[#1B3C53] text-center mb-10 tracking-tight">
        Skill Swappers Around You
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <select className="border border-[#D2C1B6] px-4 py-2 rounded-md focus:outline-none text-[#1B3C53] w-full sm:w-auto">
          <option value="">Availability</option>
          <option value="Evenings">Evenings</option>
          <option value="Weekends">Weekends</option>
        </select>
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full border border-[#D2C1B6] px-4 py-2 rounded-md text-[#1B3C53] pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#456882]" size={18} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Logged-in User Card */}
        {loggedInUser && (
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2D6CE] transition hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={loggedInUser.avatar || 'https://i.pravatar.cc/100?img=9'}
                alt={loggedInUser.fullName || loggedInUser.name}
                className="w-16 h-16 rounded-full border-2 border-[#456882]"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#1B3C53]">
                  {loggedInUser.fullName || loggedInUser.name}
                </h3>
                <p className="text-sm text-[#456882]">⭐ {loggedInUser.rating || 'N/A'}</p>
              </div>
            </div>
            <p className="text-[#1B3C53] font-medium mb-1">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(loggedInUser.skillsOffered || []).map((skill, i) => (
                <span key={i} className="bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-[#1B3C53] font-medium mb-1">Looking for:</p>
            <div className="flex flex-wrap gap-2">
              {(loggedInUser.skillsWanted || []).map((skill, i) => (
                <span key={i} className="bg-[#456882] text-white px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Other Public Users */}
        {currentUsers.map((user) => (
          <div
            key={user._id || user.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-[#E2D6CE] transition hover:shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.avatar || 'https://i.pravatar.cc/100'}
                alt={user.fullName || user.name}
                className="w-16 h-16 rounded-full border-2 border-[#456882]"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#1B3C53]">
                  {user.fullName || user.name}
                </h3>
                <p className="text-sm text-[#456882]">⭐ {user.rating || 'N/A'}</p>
              </div>
            </div>

            <p className="text-[#1B3C53] font-medium mb-1">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(user.skillsOffered || user.skillsHave || []).map((skill, i) => (
                <span key={i} className="bg-[#2A9D8F] text-white px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-[#1B3C53] font-medium mb-1">Looking for:</p>
            <div className="flex flex-wrap gap-2">
              {(user.skillsWanted || user.skillsNeed || []).map((skill, i) => (
                <span key={i} className="bg-[#E76F51] text-white px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => navigate(`/swap-request/${user._id || user.id}`)}
                className="bg-[#456882] hover:bg-[#1B3C53] text-white px-4 py-2 rounded-md text-sm"
              >
                Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-full text-sm ${
                page === currentPage
                  ? 'bg-[#456882] text-white'
                  : 'text-[#1B3C53] hover:bg-[#456882] hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
