import { useEffect, useState } from "react";
import API from "../api/api";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://college-event-management-portal-backend.onrender.com/api";

const BACKEND_URL = API_URL.replace("/api", "");

  const fetchMyRegistrations = async () => {
    try {
      setLoading(true);
      const res = await API.get("/registrations/my/all");
      setRegistrations(res.data || []);
    } catch (error) {
      console.error("My registrations fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl p-8 md:p-10">
          <div className="absolute top-0 right-0 w-60 h-60 bg-violet-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <p className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-sm mb-4">
              📚 Student Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">
              My Registrations
            </h1>
            <p className="mt-3 text-slate-300 max-w-2xl">
              View all events you have successfully registered for in one place.
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-[1.75rem] shadow-xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-slate-200"></div>
                <div className="p-6">
                  <div className="h-7 bg-slate-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5 mb-5"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-slate-200 rounded-2xl"></div>
                    <div className="h-16 bg-slate-200 rounded-2xl"></div>
                    <div className="h-16 bg-slate-200 rounded-2xl"></div>
                    <div className="h-16 bg-slate-200 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && registrations.length === 0 && (
          <div className="mt-10 bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-slate-800">
              No Registrations Yet
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              You have not registered for any events yet. Explore events and
              register to see them here.
            </p>
          </div>
        )}

        {!loading && registrations.length > 0 && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {registrations.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-[1.75rem] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
              >
                <div className="relative h-56 overflow-hidden">
                  {item.event?.image ? (
                    <img
                      src={`${BACKEND_URL}${item.event.image}`}
                      alt={item.event?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 flex items-center justify-center text-white text-5xl font-bold">
                      {item.event?.title?.charAt(0) || "E"}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.event?.category || "General"}
                  </div>

                  <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    Registered
                  </div>

                  <h2 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold">
                    {item.event?.title || "Untitled Event"}
                  </h2>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 leading-6">
                    {item.event?.description || "No description available."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        Date
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {item.event?.date
                          ? new Date(item.event.date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        Time
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {item.event?.time || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        Location
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {item.event?.location || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        Organizer
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {item.event?.createdBy?.name || "Admin"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4">
                    <p className="text-sm text-blue-700 font-medium">
                      ✅ Your seat is successfully reserved for this event.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;