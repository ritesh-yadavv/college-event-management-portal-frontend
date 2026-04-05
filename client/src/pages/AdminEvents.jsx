import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function AdminEvents() {
  const [events, setEvents] = useState([]);
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://college-event-management-portal-backend.onrender.com/api";

const BACKEND_URL = API_URL.replace("/api", "");

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Fetch events error:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await API.delete(`/events/${id}`);
      alert(res.data.message);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Manage Events</h1>

        <Link
          to="/admin/events/new"
          className="bg-slate-900 text-white px-5 py-3 rounded-xl"
        >
          Add New Event
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-[1.75rem] shadow-xl overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500">
              {event.image ? (
                <img
                  src={`${BACKEND_URL}${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {event.title?.charAt(0)}
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-slate-900">
                {event.title}
              </h2>
              <p className="text-slate-600 mt-3">{event.description}</p>

              <div className="mt-5 space-y-2 text-sm">
                <p>
                  <strong>Date:</strong>{" "}
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {event.time || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {event.location || "N/A"}
                </p>
                <p>
                  <strong>Capacity:</strong> {event.capacity || "N/A"}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <Link
                  to={`/admin/events/edit/${event._id}`}
                  className="flex-1 bg-yellow-500 text-white px-4 py-3 rounded-xl text-center"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;