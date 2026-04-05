import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    year: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const years = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Final Year"
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("phone", form.phone);
      formData.append("course", form.course);
      formData.append("year", form.year);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await API.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Registration successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl p-8 md:p-10">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">
            Register as a student and join college events
          </p>
        </div>

        <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="text"
            placeholder="Course (BCA, B.Tech, MBA...)"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />

          <select
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Profile Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          {imageFile && (
            <div className="md:col-span-2">
              <p className="text-sm text-slate-600 mb-2">Image Preview</p>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                className="w-24 h-24 rounded-2xl object-cover border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 w-full py-3.5 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 hover:scale-[1.01]"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;