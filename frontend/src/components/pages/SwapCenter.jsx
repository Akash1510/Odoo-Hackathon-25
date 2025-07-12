
// import React, { useEffect, useState } from 'react';
// import { getSwaps, updateSwapStatus, deleteSwap } from '../service/swapService';
// import { toast } from 'react-hot-toast';

// const SwapCenter = () => {
//   const [swaps, setSwaps] = useState([]);
//   const [loadingSwapId, setLoadingSwapId] = useState(null);

//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user?._id || user?.id;

//   useEffect(() => {
//     const loadSwaps = async () => {
//       try {
//         const data = await getSwaps(token);
//         setSwaps(data);
//       } catch {
//         toast.error('❌ Failed to load swaps');
//       }
//     };

//     if (token) loadSwaps();
//   }, [token]);

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       setLoadingSwapId(id);
//       await updateSwapStatus(id, status, token);
//       setSwaps((prev) => prev.map((s) => (s._id === id ? { ...s, status } : s)));
//       toast.success(`✅ Swap ${status}`);
//     } catch {
//       toast.error('❌ Failed to update swap');
//     } finally {
//       setLoadingSwapId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       setLoadingSwapId(id);
//       await deleteSwap(id, token);
//       setSwaps((prev) => prev.filter((s) => s._id !== id));
//       toast.success('🗑️ Swap deleted');
//     } catch {
//       toast.error('❌ Failed to delete swap');
//     } finally {
//       setLoadingSwapId(null);
//     }
//   };

//   const incoming = swaps.filter((s) => s.toUser._id === userId);
//   const sent = swaps.filter((s) => s.fromUser._id === userId);

//   const SwapCard = ({ swap, incoming }) => {
//     const otherUser = incoming ? swap.fromUser : swap.toUser;
//     const isPending = swap.status === 'pending';

//     return (
//       <div className="bg-white border border-[#E2D6CE] rounded-xl shadow-sm p-5 space-y-3 transition hover:shadow-md">
//         <div className="flex items-center gap-4">
//           <img
//             src={otherUser?.avatar || 'https://i.pravatar.cc/100'}
//             alt="avatar"
//             className="w-14 h-14 rounded-full border object-cover"
//           />
//           <div>
//             <h3 className="font-semibold text-lg text-[#1B3C53]">
//               {otherUser?.fullName || otherUser?.name || 'Unknown User'}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {swap.message || 'No message provided'}
//             </p>
//             <span
//               className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full 
//                 ${
//                   swap.status === 'pending'
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : swap.status === 'accepted'
//                     ? 'bg-green-100 text-green-700'
//                     : swap.status === 'rejected'
//                     ? 'bg-red-100 text-red-700'
//                     : 'bg-gray-100 text-gray-700'
//                 }`}
//             >
//               {swap.status.toUpperCase()}
//             </span>
//           </div>
//         </div>

//         {isPending && (
//           <div className="flex justify-end gap-3 pt-2">
//             {incoming ? (
//               <>
//                 <button
//                   onClick={() => handleUpdateStatus(swap._id, 'accepted')}
//                   disabled={loadingSwapId === swap._id}
//                   className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleUpdateStatus(swap._id, 'rejected')}
//                   disabled={loadingSwapId === swap._id}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
//                 >
//                   Reject
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleUpdateStatus(swap._id, 'cancelled')}
//                 disabled={loadingSwapId === swap._id}
//                 className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         )}

//         {!isPending && !incoming && (
//           <div className="text-right">
//             <button
//               onClick={() => handleDelete(swap._id)}
//               disabled={loadingSwapId === swap._id}
//               className="text-xs text-red-600 hover:underline disabled:opacity-50"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-center text-[#1B3C53] mb-10">
//         🔄 Swap Center
//       </h2>

//       {/* Incoming Requests */}
//       <div className="mb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-3">
//           Incoming Requests
//         </h3>
//         {incoming.length === 0 ? (
//           <p className="text-gray-500 text-sm">No incoming requests.</p>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2">
//             {incoming.map((s) => (
//               <SwapCard key={s._id} swap={s} incoming={true} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Sent Requests */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-3">
//           Sent Requests
//         </h3>
//         {sent.length === 0 ? (
//           <p className="text-gray-500 text-sm">No sent requests.</p>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2">
//             {sent.map((s) => (
//               <SwapCard key={s._id} swap={s} incoming={false} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SwapCenter;


import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const SwapCenter = () => {
  const [swaps, setSwaps] = useState([]);
  const [loadingSwapId, setLoadingSwapId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;

  // 🟡 Load swaps from localStorage
  useEffect(() => {
    const loadDummySwaps = () => {
      const storedSwaps = JSON.parse(localStorage.getItem('swaps')) || [];
      setSwaps(storedSwaps);
    };
    loadDummySwaps();
  }, []);

  const saveSwaps = (updated) => {
    setSwaps(updated);
    localStorage.setItem('swaps', JSON.stringify(updated));
  };

  const handleUpdateStatus = (id, status) => {
    setLoadingSwapId(id);
    setTimeout(() => {
      const updated = swaps.map((s) =>
        s._id === id ? { ...s, status } : s
      );
      saveSwaps(updated);
      toast.success(`✅ Swap ${status}`);
      setLoadingSwapId(null);
    }, 400); // Simulate delay
  };

  const handleDelete = (id) => {
    setLoadingSwapId(id);
    setTimeout(() => {
      const updated = swaps.filter((s) => s._id !== id);
      saveSwaps(updated);
      toast.success('🗑️ Swap deleted');
      setLoadingSwapId(null);
    }, 300); // Simulate delay
  };

  const incoming = swaps.filter((s) => s.toUser?.id === userId);
  const sent = swaps.filter((s) => s.fromUser?.id === userId);

  const SwapCard = ({ swap, incoming }) => {
    const otherUser = incoming ? swap.fromUser : swap.toUser;
    const isPending = swap.status === 'pending';

    return (
      <div className="bg-white border border-[#E2D6CE] rounded-xl shadow-sm p-5 space-y-3 transition hover:shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={otherUser?.avatar || 'https://i.pravatar.cc/100'}
            alt="avatar"
            className="w-14 h-14 rounded-full border object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-[#1B3C53]">
              {otherUser?.fullName || otherUser?.name || 'Unknown'}
            </h3>
            <p className="text-sm text-gray-500">
              {swap.message || 'No message'}
            </p>
            <span
              className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full 
                ${
                  swap.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : swap.status === 'accepted'
                    ? 'bg-green-100 text-green-700'
                    : swap.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
            >
              {swap.status.toUpperCase()}
            </span>
          </div>
        </div>

        {isPending && (
          <div className="flex justify-end gap-3 pt-2">
            {incoming ? (
              <>
                <button
                  onClick={() => handleUpdateStatus(swap._id, 'accepted')}
                  disabled={loadingSwapId === swap._id}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(swap._id, 'rejected')}
                  disabled={loadingSwapId === swap._id}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                  Reject
                </button>
              </>
            ) : (
              <button
                onClick={() => handleUpdateStatus(swap._id, 'cancelled')}
                disabled={loadingSwapId === swap._id}
                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {!isPending && !incoming && (
          <div className="text-right">
            <button
              onClick={() => handleDelete(swap._id)}
              disabled={loadingSwapId === swap._id}
              className="text-xs text-red-600 hover:underline disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-[#1B3C53] mb-10">
        🔄 Swap Center
      </h2>

      {/* Incoming Requests */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Incoming Requests
        </h3>
        {incoming.length === 0 ? (
          <p className="text-gray-500 text-sm">No incoming requests.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {incoming.map((s) => (
              <SwapCard key={s._id} swap={s} incoming={true} />
            ))}
          </div>
        )}
      </div>

      {/* Sent Requests */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Sent Requests
        </h3>
        {sent.length === 0 ? (
          <p className="text-gray-500 text-sm">No sent requests.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {sent.map((s) => (
              <SwapCard key={s._id} swap={s} incoming={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapCenter;
