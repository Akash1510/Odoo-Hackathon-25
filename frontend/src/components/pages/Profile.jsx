import React, { useEffect, useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import {motion}  from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userId = user?._id || user?.id; // support for different ID keys

  const [form, setForm] = useState({
    name: '',
    location: '',
    avatar: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    profileVisibility: 'Public',
  });

  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillNeeded, setNewSkillNeeded] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const user = await res.json();
        setForm({
          name: user.fullName || '',
          location: user.location || '',
          avatar: user.avatar || '',
          skillsOffered: user.skillsOffered || [],
          skillsWanted: user.skillsWanted || [],
          availability: user.availability || '',
          profileVisibility: user.isPublic ? 'Public' : 'Private',
        });
      } catch (error) {
        toast.error('Error loading profile.');
        console.error('Fetch error:', error);
      }
    };

    if (userId && token) fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removeSkill = (key, index) => {
    const updated = [...form[key]];
    updated.splice(index, 1);
    setForm({ ...form, [key]: updated });
  };

  const addSkill = (key, value, setValue) => {
    if (value.trim() && !form[key].includes(value.trim())) {
      setForm({ ...form, [key]: [...form[key], value.trim()] });
      setValue('');
    }
  };

  const handleAvatarChange = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setForm({ ...form, avatar: url });
      toast.success('Avatar updated');
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (!form.location.trim()) return toast.error('Location is required');

    try {
      const payload = {
        fullName: form.name,
        location: form.location,
        skillsOffered: form.skillsOffered,
        skillsWanted: form.skillsWanted,
        availability: form.availability,
        isPublic: form.profileVisibility === 'Public',
        avatar: form.avatar,
      };

      const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Update failed');

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error('Save error:', error);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-x-4">
          <button onClick={handleSave} className="text-green-600 hover:underline font-semibold flex items-center gap-1">
            <CheckCircle2 size={18} /> Save
          </button>
          <button onClick={() => navigate('/home')} className="text-red-500 hover:underline font-semibold flex items-center gap-1">
            <XCircle size={18} /> Discard
          </button>
        </div>
        <div className="space-x-4">
          <button className="hover:underline text-[#1B3C53]"><Link to='/swap-request'>Swap Request</Link></button>
          <button onClick={() => navigate('/home')} className="hover:underline text-[#1B3C53]">Home</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="flex flex-col items-center gap-2 md:col-span-1">
          <motion.img
            src={form.avatar || 'https://i.pravatar.cc/120?img=5'}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-[#456882]"
            whileHover={{ scale: 1.05 }}
          />
          <button onClick={handleAvatarChange} className="text-sm text-[#1B3C53] flex items-center gap-1">
            <Pencil className="w-4 h-4" /> Add / Edit
          </button>
          <button onClick={() => setForm({ ...form, avatar: '' })} className="text-sm text-red-500 flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block font-semibold text-[#1B3C53]">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1B3C53]">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#1B3C53]">Skills Offered</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.skillsOffered.map((skill, i) => (
                  <span key={i} className="bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full text-sm flex items-center">
                    {skill}
                    <button onClick={() => removeSkill('skillsOffered', i)} className="ml-2 text-xs text-red-500">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newSkillOffered}
                  onChange={(e) => setNewSkillOffered(e.target.value)}
                  placeholder="Add skill"
                  className="border px-3 py-1 rounded-md w-full"
                />
                <button
                  onClick={() => addSkill('skillsOffered', newSkillOffered, setNewSkillOffered)}
                  className="bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-md flex items-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1B3C53]">Skills Wanted</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.skillsWanted.map((skill, i) => (
                  <span key={i} className="bg-[#456882] text-white px-3 py-1 rounded-full text-sm flex items-center">
                    {skill}
                    <button onClick={() => removeSkill('skillsWanted', i)} className="ml-2 text-xs text-red-300">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newSkillNeeded}
                  onChange={(e) => setNewSkillNeeded(e.target.value)}
                  placeholder="Add skill"
                  className="border px-3 py-1 rounded-md w-full"
                />
                <button
                  onClick={() => addSkill('skillsWanted', newSkillNeeded, setNewSkillNeeded)}
                  className="bg-[#456882] text-white px-3 py-1 rounded-md flex items-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#1B3C53]">Availability</label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#1B3C53]">Profile Visibility</label>
              <select
                name="profileVisibility"
                value={form.profileVisibility}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md mt-1"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
