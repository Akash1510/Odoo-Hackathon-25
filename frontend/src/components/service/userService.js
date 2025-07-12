const useDummy = true; // 🔁 Toggle this to false to use real API

// 🔸 Avatar fallback (optional)
const defaultAvatarUrl = 'https://i.pravatar.cc/100?img=9';

// 🔸 Dummy User Data
const dummyUsers = [
    {
        id: 1,
        name: "Aarav Mehta",
        avatar: "https://i.pravatar.cc/100?img=11",
        skillsHave: ["Guitar", "Photoshop"],
        skillsNeed: ["Excel", "Web Design"],
        rating: 4.8,
    },
    {
        id: 2,
        name: "Riya Sharma",
        avatar: "https://i.pravatar.cc/100?img=23",
        skillsHave: ["Cooking", "Yoga"],
        skillsNeed: ["Digital Marketing", "Blog Writing"],
        rating: 4.6,
    },
    {
        id: 3,
        name: "Kabir Verma",
        avatar: "https://i.pravatar.cc/100?img=34",
        skillsHave: ["Video Editing", "After Effects"],
        skillsNeed: ["Guitar"],
        rating: 4.9,
    },
    {
        id: 4,
        name: "Sneha Rajput",
        avatar: "https://i.pravatar.cc/100?img=17",
        skillsHave: ["Excel", "Canva"],
        skillsNeed: ["Voice Over", "Podcast Editing"],
        rating: 4.7,
    },
    {
        id: 5,
        name: "Yash Agarwal",
        avatar: "https://i.pravatar.cc/100?img=8",
        skillsHave: ["Python", "Automation"],
        skillsNeed: ["Public Speaking", "UI Design"],
        rating: 4.5,
    },
    {
        id: 6,
        name: "Ishita Bansal",
        avatar: "https://i.pravatar.cc/100?img=25",
        skillsHave: ["Illustration", "Figma"],
        skillsNeed: ["Backend Development"],
        rating: 4.4,
    },
    {
        id: 7,
        name: "Arjun Reddy",
        avatar: "https://i.pravatar.cc/100?img=12",
        skillsHave: ["Photography", "Lightroom"],
        skillsNeed: ["Reels Editing", "Color Grading"],
        rating: 4.2,
    },
    {
        id: 8,
        name: "Zoya Sheikh",
        avatar: "https://i.pravatar.cc/100?img=32",
        skillsHave: ["Sketching", "2D Animation"],
        skillsNeed: ["Sound Design", "Narration"],
        rating: 4.6,
    },
    {
        id: 9,
        name: "Devansh Sinha",
        avatar: "https://i.pravatar.cc/100?img=39",
        skillsHave: ["Java", "Spring Boot"],
        skillsNeed: ["DevOps", "CI/CD"],
        rating: 4.3,
    },
    {
        id: 10,
        name: "Meera Patel",
        avatar: "https://i.pravatar.cc/100?img=28",
        skillsHave: ["Digital Marketing", "SEO"],
        skillsNeed: ["Motion Graphics", "Scriptwriting"],
        rating: 4.9,
    },
    {
        id: 11,
        name: "Sameer Khan",
        avatar: "https://i.pravatar.cc/100?img=7",
        skillsHave: ["Reels Editing", "CapCut"],
        skillsNeed: ["Voice Over", "Acting"],
        rating: 4.7,
    },
    {
        id: 12,
        name: "Anaya Iyer",
        avatar: "https://i.pravatar.cc/100?img=20",
        skillsHave: ["Creative Writing", "Blogging"],
        skillsNeed: ["Content Planning", "Thumbnail Design"],
        rating: 4.5,
    },
];

// 🟢 Dummy API functions
const fetchCurrentUserDummy = async (userId) => ({
    id: userId,
    fullName: "Akash Jadhav",
    avatar: "https://i.pravatar.cc/100?img=50",
    skillsOffered: ["Excel", "Photoshop"],
    skillsWanted: ["React", "Node.js"],
    rating: 4.8,
    isPublic: true,
});

const fetchPublicUsersDummy = async () => {
    return dummyUsers.map((user) => ({
        ...user,
        skillsOffered: user.skillsHave,
        skillsWanted: user.skillsNeed,
        fullName: user.name,
        _id: user.id,
        avatar: user.avatar || defaultAvatarUrl,
        isPublic: true,
    }));
};

// 🔵 Real API functions
const fetchCurrentUserAPI = async (userId, token) => {
    const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('❌ Failed to fetch current user');
    return res.json();
};

const fetchPublicUsersAPI = async (token) => {
    const res = await fetch('http://localhost:8000/api/users/all', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('❌ Failed to fetch public users');
    return res.json();
};

// ✅ Final export
export const fetchCurrentUser = async (userId, token) =>
    useDummy ? fetchCurrentUserDummy(userId) : fetchCurrentUserAPI(userId, token);

export const fetchPublicUsers = async (token) =>
    useDummy ? fetchPublicUsersDummy() : fetchPublicUsersAPI(token);
