// export const getSwaps = async (token) => {
//   const res = await fetch('http://localhost:8000/api/swaps', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('Failed to fetch swaps');
//   return res.json();
// };

// export const updateSwapStatus = async (swapId, status, token) => {
//   const res = await fetch(`http://localhost:8000/api/swaps/${swapId}`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ status }),
//   });
//   if (!res.ok) throw new Error('Failed to update status');
//   return res.json();
// };

// export const deleteSwap = async (swapId, token) => {
//   const res = await fetch(`http://localhost:8000/api/swaps/${swapId}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('Failed to delete swap');
//   return res.json();
// };


// // service/swapService.js
// export const createSwapRequest = async (body, token) => {
//   const res = await fetch('http://localhost:8000/api/swaps', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error('Failed to send swap request');
//   return res.json();
// };


// export const getSwaps = async (token) => {
//   const res = await fetch('http://localhost:8000/api/swaps', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('Failed to fetch swaps');
//   return res.json();
// };

// export const updateSwapStatus = async (swapId, status, token) => {
//   const res = await fetch(`http://localhost:8000/api/swaps/${swapId}`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ status }),
//   });
//   if (!res.ok) throw new Error('Failed to update status');
//   return res.json();
// };

// export const deleteSwap = async (swapId, token) => {
//   const res = await fetch(`http://localhost:8000/api/swaps/${swapId}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('Failed to delete swap');
//   return res.json();
// };


// // service/swapService.js
// export const createSwapRequest = async (body, token) => {
//   const res = await fetch('http://localhost:8000/api/swaps', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error('Failed to send swap request');
//   return res.json();
// };
// ✅ Get all swap requests
export const getSwaps = async () => {
    const swaps = JSON.parse(localStorage.getItem('swaps')) || [];
    return swaps;
};

// ✅ Update status of a swap
export const updateSwapStatus = async (swapId, status) => {
    const swaps = JSON.parse(localStorage.getItem('swaps')) || [];
    const updated = swaps.map((s) =>
        s._id === swapId ? { ...s, status } : s
    );
    localStorage.setItem('swaps', JSON.stringify(updated));
    return { success: true };
};

// ✅ Delete a swap
export const deleteSwap = async (swapId) => {
    const swaps = JSON.parse(localStorage.getItem('swaps')) || [];
    const updated = swaps.filter((s) => s._id !== swapId);
    localStorage.setItem('swaps', JSON.stringify(updated));
    return { success: true };
};

// ✅ Create new swap request
export const createSwapRequest = async (body) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const swaps = JSON.parse(localStorage.getItem('swaps')) || [];

    const newSwap = {
        _id: Date.now().toString(),
        fromUser: {
            id: user.id,
            fullName: user.fullName,
            avatar: user.avatar,
        },
        toUser: getDummyUserById(parseInt(body.toUser)),
        message: body.message,
        status: 'pending',
    };

    swaps.push(newSwap);
    localStorage.setItem('swaps', JSON.stringify(swaps));
    return newSwap;
};

// ✅ Dummy user resolver (match from dummyUsers)
const getDummyUserById = (id) => {
    const users = JSON.parse(localStorage.getItem('publicUsers')) || [];
    return users.find((u) => u.id === id) || { id, fullName: 'Unknown', avatar: '' };
};



