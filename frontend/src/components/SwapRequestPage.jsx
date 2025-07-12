// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { fetchPublicUsers } from './service/userService';
// import { createSwapRequest } from './service/swapService'; // ✅ Ensure this exists

// const SwapRequestPage = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const [receiver, setReceiver] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const users = await fetchPublicUsers(token);
//         const user = users.find((u) => (u._id || u.id) === userId);
//         if (!user) {
//           toast.error('User not found');
//           navigate('/home');
//         }
//         setReceiver(user);
//       } catch {
//         toast.error('Failed to load user');
//       }
//     };
//     if (userId) loadUser();
//   }, [userId, navigate, token]);

//   const handleSendRequest = async () => {
//     try {
//       if (!message.trim()) {
//         toast.error('Please enter a message');
//         return;
//       }

//       await createSwapRequest({ toUser: userId, message }, token);
//       toast.success('Swap request sent!');
//       navigate('/swap-center');
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Failed to send request');
//     }
//   };

//   if (!receiver) return null;

//   return (
//     <div className="max-w-xl mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold text-[#1B3C53] mb-6 text-center">📩 Send Swap Request</h2>

//       <div className="bg-white shadow rounded-xl p-6 border border-[#E2D6CE]">
//         <div className="flex items-center gap-4 mb-4">
//           <img
//             src={receiver.avatar || 'https://i.pravatar.cc/100'}
//             alt={receiver.fullName || receiver.name}
//             className="w-16 h-16 rounded-full border-2 border-[#456882]"
//           />
//           <div>
//             <h3 className="text-xl font-semibold text-[#1B3C53]">
//               {receiver.fullName || receiver.name}
//             </h3>
//             <p className="text-sm text-[#456882]">⭐ {receiver.rating || 'N/A'}</p>
//           </div>
//         </div>

//         <textarea
//           rows={5}
//           placeholder="Write a message to describe your swap request..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full border border-[#D2C1B6] p-3 rounded-md text-[#1B3C53] mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#456882]"
//         ></textarea>

//         <div className="flex justify-end">
//           <button
//             onClick={handleSendRequest}
//             className="bg-[#456882] hover:bg-[#1B3C53] text-white px-5 py-2 rounded-md text-sm font-medium"
//           >
//             Send Request
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwapRequestPage;
// // 


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchPublicUsers } from './service/userService';

const SwapRequestPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const sender = JSON.parse(localStorage.getItem('user'));
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadReceiver = async () => {
      try {
        const users = await fetchPublicUsers(token);
        const match = users.find((u) => (u._id || u.id)?.toString() === userId?.toString());
        if (!match) {
          toast.error('User not found');
          navigate('/home');
          return;
        }
        setReceiver(match);
      } catch {
        toast.error('Failed to load user');
      }
    };
    loadReceiver();
  }, [userId, navigate, token]);

  const handleSendRequest = () => {
    if (!message.trim()) return toast.error('Message required');

    const existing = JSON.parse(localStorage.getItem('swaps')) || [];

    const alreadyRequested = existing.find(
      (swap) =>
        swap.fromUser.id === sender.id && swap.toUser.id === receiver.id
    );
    if (alreadyRequested) return toast.error('Already requested!');

    const newSwap = {
      _id: Date.now().toString(), // fake ID
      fromUser: {
        id: sender.id,
        fullName: sender.fullName || sender.name,
        avatar: sender.avatar,
      },
      toUser: {
        id: receiver.id,
        fullName: receiver.fullName || receiver.name,
        avatar: receiver.avatar,
      },
      message,
      status: 'pending',
    };

    const updated = [...existing, newSwap];
    localStorage.setItem('swaps', JSON.stringify(updated));

    toast.success('Swap request sent!');
    navigate('/swap-request'); // to SwapCenter
  };

  if (!receiver) return null;

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-[#1B3C53] mb-6 text-center">📩 Send Swap Request</h2>

      <div className="bg-white shadow rounded-xl p-6 border border-[#E2D6CE]">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={receiver.avatar || 'https://i.pravatar.cc/100'}
            alt={receiver.fullName || receiver.name}
            className="w-16 h-16 rounded-full border-2 border-[#456882]"
          />
          <div>
            <h3 className="text-xl font-semibold text-[#1B3C53]">
              {receiver.fullName || receiver.name}
            </h3>
            <p className="text-sm text-[#456882]">⭐ {receiver.rating || 'N/A'}</p>
          </div>
        </div>

        <textarea
          rows={5}
          placeholder="Write a message to describe your swap request..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[#D2C1B6] p-3 rounded-md text-[#1B3C53] mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#456882]"
        ></textarea>

        <div className="flex justify-end">
          <button
            onClick={handleSendRequest}
            className="bg-[#456882] hover:bg-[#1B3C53] text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapRequestPage;
