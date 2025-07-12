export const submitFeedback = async (toUser, rating, comment, token) => {
    const res = await fetch(`http://localhost:8000/api/feedback`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toUser, rating, comment }),
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    return res.json();
};

export const getFeedbacks = async (userId) => {
    const res = await fetch(`http://localhost:8000/api/feedback/${userId}`);
    if (!res.ok) throw new Error('Failed to load feedback');
    return res.json();
};
