// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     skillsOffered: "",
//     skillsWanted: "",
//     availability: "weekends",
//     isPublic: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Simulate saving user data
//     localStorage.setItem("user", JSON.stringify(formData));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF]">
//       <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border border-[#D2C1B6]">
//         <h2 className="text-2xl font-bold text-[#1B3C53] mb-6 text-center">
//           Create Your SkillSwap Profile
//         </h2>

//         <form onSubmit={handleSignup} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[#1B3C53] font-medium">Full Name</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-[#1B3C53] font-medium">Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#1B3C53] font-medium">Password</label>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[#1B3C53] font-medium">Skills Offered</label>
//               <input
//                 name="skillsOffered"
//                 type="text"
//                 value={formData.skillsOffered}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//                 placeholder="e.g. Excel, Photoshop"
//               />
//             </div>

//             <div>
//               <label className="block text-[#1B3C53] font-medium">Skills Wanted</label>
//               <input
//                 name="skillsWanted"
//                 type="text"
//                 value={formData.skillsWanted}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//                 placeholder="e.g. Cooking, Writing"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#1B3C53] font-medium">Availability</label>
//             <select
//               name="availability"
//               value={formData.availability}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
//             >
//               <option value="weekends">Weekends</option>
//               <option value="evenings">Evenings</option>
//               <option value="weekdays">Weekdays</option>
//             </select>
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="isPublic"
//               checked={formData.isPublic}
//               onChange={handleChange}
//               className="accent-[#456882]"
//             />
//             <label className="text-[#1B3C53]">Make my profile public</label>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 mt-2 bg-[#456882] text-[#F9F3EF] rounded-md hover:bg-[#1B3C53]"
//           >
//             Create Account
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-[#1B3C53]">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#456882] underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "weekends",
    isPublic: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF]">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border border-[#D2C1B6]">
        <h2 className="text-2xl font-bold text-[#1B3C53] mb-6 text-center">
          Create Your SkillSwap Profile
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1B3C53] font-medium">Full Name</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1B3C53] font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1B3C53] font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1B3C53] font-medium">Skills Offered</label>
              <input
                name="skillsOffered"
                type="text"
                value={formData.skillsOffered}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
                placeholder="e.g. Excel, Photoshop"
              />
            </div>

            <div>
              <label className="block text-[#1B3C53] font-medium">Skills Wanted</label>
              <input
                name="skillsWanted"
                type="text"
                value={formData.skillsWanted}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
                placeholder="e.g. Cooking, Writing"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1B3C53] font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53]"
            >
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="weekdays">Weekdays</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="accent-[#456882]"
            />
            <label className="text-[#1B3C53]">Make my profile public</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#456882] text-[#F9F3EF] rounded-md hover:bg-[#1B3C53]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#1B3C53]">
          Already have an account?{" "}
          <a href="/login" className="text-[#456882] underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

