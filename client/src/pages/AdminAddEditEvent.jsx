import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function AdminAddEditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "Technical",
    "Academic",
    "Workshop",
    "Seminar",
    "Webinar",
    "Training",
    "Skill Development",
    "Research",
    "Innovation",
    "Hackathon",
    "Placement",
    "Career Guidance",
    "Guest Lecture",
    "Competition",
    "Quiz",
    "Coding Contest",
    "Debate",
    "Presentation",
    "Cultural",
    "Fest",
    "Freshers Party",
    "Farewell Party",
    "DJ Night",
    "Talent Show",
    "Open Mic",
    "Dance",
    "Music",
    "Drama",
    "Fashion Show",
    "Club Activity",
    "Literary",
    "Photography",
    "Art & Craft",
    "Sports",
    "Tournament",
    "E-Sports",
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const isEditMode = Boolean(id);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://college-event-management-portal-backend.onrender.com/api";

  const BACKEND_URL = API_URL.replace("/api", "");

  const fetchSingleEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        date: res.data.date ? res.data.date.split("T")[0] : "",
        time: res.data.time || "",
        location: res.data.location || "",
        category: res.data.category || "",
        capacity: res.data.capacity || "",
        image: res.data.image || "",
      });
    } catch (error) {
      console.error("Fetch single event error:", error);
      alert(error.response?.data?.message || "Failed to load event");
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchSingleEvent();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const numericCapacity = Number(form.capacity);

    if (!Number.isInteger(numericCapacity) || numericCapacity <= 0) {
      return alert("Capacity must be a positive number");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("capacity", numericCapacity);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let res;

      if (isEditMode) {
        res = await API.put(`/events/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await API.post("/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert(res.data.message);
      navigate("/admin/events");
    } catch (error) {
      console.error("Event form submit error:", error);
      console.error("Server response:", error.response?.data);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setForm({ ...form, capacity: "" });
      return;
    }

    const numericValue = Number(value);

    if (numericValue < 1) {
      setForm({ ...form, capacity: "" });
      return;
    }

    setForm({ ...form, capacity: value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-[2rem] shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {isEditMode ? "Edit Event" : "Create Event"}
        </h1>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Event Title"
            className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2 min-h-[130px]"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <input
            type="date"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            type="time"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />

          <select
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Capacity"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={form.capacity}
            onChange={handleCapacityChange}
            min="1"
            step="1"
            required
          />

          <input
            type="file"
            accept="image/*"
            className="rounded-xl border border-slate-200 px-4 py-3"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
          />
        </div>

        {form.image && !imageFile && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-2">Current Image:</p>
            <img
              src={`${BACKEND_URL}${form.image}`}
              alt="event"
              className="w-40 h-28 object-cover rounded-lg border"
            />
          </div>
        )}

        {imageFile && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-2">Selected Image:</p>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-40 h-28 object-cover rounded-lg border"
            />
          </div>
        )}

        <button className="mt-8 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 text-white py-4 rounded-xl">
          {isEditMode ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddEditEvent;