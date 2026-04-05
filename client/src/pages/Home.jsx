import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

import Hero1 from "../assets/about.jpg";
import Hero2 from "../assets/2.jpg";
import Hero3 from "../assets/3.jpg";
import Hero4 from "../assets/4.jpg";
import Hero5 from "../assets/5.jpg";
import Hero6 from "../assets/6.jpg";
import Hero7 from "../assets/1.jpg";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedParticipants, setSelectedParticipants] = useState(null);
  const [registeringId, setRegisteringId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const heroImages = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7];
  const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://college-event-management-portal-backend.onrender.com/api";

const BACKEND_URL = API_URL.replace("/api", "");

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
    "Competition",
    "Placement",
    "Career Guidance",
    "Guest Lecture",
    "Club Activity",
    "Cultural",
    "Fest",
    "Sports",
  ];

  const fetchEvents = async () => {
    try {
      const res = await API.get(`/events?search=${search}&category=${category}`);
      setEvents(res.data || []);
    } catch (err) {
      console.log("Fetch events error:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleRegister = async (id) => {
    try {
      setRegisteringId(id);
      const res = await API.post("/registrations", { eventId: id });
      alert(res.data.message || "Joined successfully");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Join failed");
    } finally {
      setRegisteringId(null);
    }
  };

  const filteredEvents = useMemo(() => events, [events]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.10),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.10),_transparent_25%),linear-gradient(to_bottom_right,_#f8fafc,_#ffffff,_#f8fafc)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-[0_30px_100px_rgba(2,6,23,0.35)]">
          <div className="absolute w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>
          <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-6 md:p-8 lg:p-10">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1]">
                Explore, Join & Manage
                <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                  College Events Beautifully
                </span>
              </h1>

              <p className="mt-4 text-slate-300 text-sm md:text-base leading-7 max-w-xl">
                A premium college event portal where students can discover events,
                register instantly, and explore joined participants with a modern,
                engaging, and responsive experience.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="#events-section"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-white font-semibold shadow-xl hover:scale-[1.03] transition"
                >
                  Explore Events
                </a>

                {!user && (
                  <a
                    href="/register"
                    className="px-6 py-3 rounded-2xl border border-white/20 bg-white/10 text-white font-semibold backdrop-blur-md hover:bg-white/20 transition"
                  >
                    Student Registration
                  </a>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Events", value: `${events.length}+` },
                  { label: "Students", value: "500+" },
                  { label: "Categories", value: `${categories.length}` },
                  { label: "Experience", value: "Premium" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md px-4 py-3"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {item.value}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-fuchsia-500/30 to-blue-500/30 blur-2xl rounded-[30px]"></div>

              <div className="relative rounded-[30px] overflow-hidden border border-white/10 shadow-2xl bg-white/10 backdrop-blur-md">
                <div className="relative h-[240px] md:h-[360px]">
                  {heroImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`hero-${i}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        currentSlide === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}



                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-[24px] border border-white/60 bg-white/80 backdrop-blur-2xl shadow-[0_12px_35px_rgba(15,23,42,0.08)] p-4">
            <div className="grid md:grid-cols-[1fr_240px] gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Search Events
                </label>
                <input
                  type="text"
                  placeholder="Search by title, location, or keyword..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-fuchsia-500 outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-violet-500 outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section id="events-section" className="mt-12">
          <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-fuchsia-600 uppercase tracking-[0.2em]">
                Featured Events
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Explore Available Events
              </h2>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow">
              Total Events: {filteredEvents.length}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="rounded-[28px] bg-white border border-slate-100 shadow-lg p-10 text-center">
              <h3 className="text-2xl font-bold text-slate-900">No events found</h3>
              <p className="text-slate-500 mt-2">
                Try changing the search text or category filter.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const participants = event.participants || [];
                const totalRegistered =
                  event.totalRegistered ?? participants.length ?? 0;
                const isRegistered = Boolean(event.isRegistered);

                const seatsLeft =
                  typeof event.capacity === "number"
                    ? Math.max(event.capacity - totalRegistered, 0)
                    : Number.isFinite(Number(event.capacity))
                    ? Math.max(Number(event.capacity) - totalRegistered, 0)
                    : "N/A";

                return (
                  <div
                    key={event._id}
                    className="group relative overflow-hidden rounded-[26px] border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)] transition-all duration-500"
                  >
                    <div className="relative h-44 overflow-hidden">
                      {event.image ? (
                        <img
                          src={`${BACKEND_URL}${event.image}`}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                          {event.title?.charAt(0) || "E"}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent"></div>

                      <span className="absolute top-3 left-3 bg-white/95 text-slate-800 px-3 py-1 rounded-full text-[11px] font-bold shadow">
                        {event.category || "General"}
                      </span>

                      <div className="absolute bottom-3 left-4 right-4">
                        <h2 className="text-white font-bold text-lg line-clamp-1">
                          {event.title}
                        </h2>
                        <p className="text-slate-200 text-xs mt-1 line-clamp-1">
                          {event.location || "Campus Location"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-slate-500 text-sm leading-6 line-clamp-2 min-h-[44px]">
                        {event.description || "No description available."}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-xs gap-2 flex-wrap">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-50 text-slate-700">
                          <span className="text-[13px]">📅</span>
                          <span className="font-medium">
                            {event.date
                              ? new Date(event.date).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-50 text-slate-700">
                          <span className="text-[13px]">⏰</span>
                          <span className="font-medium">
                            {event.time || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-50 text-slate-700">
                          <span className="text-[13px]">👥</span>
                          <span className="font-medium">
                            {event.capacity || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-1 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              Joined Students
                            </p>
                            <h4 className="text-base font-bold text-slate-900 mt-1">
                              {totalRegistered} Registered
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                              Seats Left: {seatsLeft}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedParticipants({
                                title: event.title,
                                participants,
                              })
                            }
                            className="text-xs font-bold text-fuchsia-600 hover:text-fuchsia-700 transition"
                          >
                            View Full List
                          </button>
                        </div>

                        {participants.length > 0 ? (
                          <div className="flex -space-x-2 mt-3">
                            {participants.slice(0, 4).map((student, index) => (
                              <img
                                key={student?._id || index}
                                src={
                                  student?.image
                                    ? `${BACKEND_URL}${student.image}`
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        student?.name || "Student"
                                      )}&background=e2e8f0&color=334155`
                                }
                                alt={student?.name || "Student"}
                                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow"
                              />
                            ))}

                            {participants.length > 4 && (
                              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 text-slate-700 flex items-center justify-center text-[11px] font-bold shadow">
                                +{participants.length - 4}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 mt-3">
                            No students joined yet.
                          </p>
                        )}
                      </div>

                      {user?.role === "student" && (
                        <button
                          onClick={() => handleRegister(event._id)}
                          disabled={
                            isRegistered ||
                            registeringId === event._id ||
                            seatsLeft === 0
                          }
                          className={`mt-4 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isRegistered
                              ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                              : registeringId === event._id
                              ? "bg-slate-300 text-slate-600 cursor-wait"
                              : seatsLeft === 0
                              ? "bg-red-100 text-red-600 cursor-not-allowed"
                              : "bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-white shadow-md hover:scale-[1.01]"
                          }`}
                        >
                          {isRegistered
                            ? "Already Joined"
                            : registeringId === event._id
                            ? "Joining..."
                            : seatsLeft === 0
                            ? "Event Full"
                            : "Join Event"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {selectedParticipants && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-3xl rounded-[30px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] relative overflow-hidden">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-6 py-6 text-white">
              <button
                onClick={() => setSelectedParticipants(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg"
              >
                ✕
              </button>

              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Participants
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold mt-2">
                {selectedParticipants.title}
              </h3>
              <p className="text-slate-300 mt-1">Joined Students List</p>
            </div>

            <div className="p-6">
              {selectedParticipants.participants?.length > 0 ? (
                <div className="max-h-[460px] overflow-y-auto grid sm:grid-cols-2 gap-4 pr-1">
                  {selectedParticipants.participants.map((student, index) => (
                    <div
                      key={student?._id || index}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <img
                        src={
                          student?.image
                            ? `${BACKEND_URL}${student.image}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                student?.name || "Student"
                              )}&background=e2e8f0&color=334155`
                        }
                        alt={student?.name || "Student"}
                        className="w-16 h-16 rounded-full object-cover border"
                      />

                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">
                          {student?.name || "Student"}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {student?.email || "No email"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {student?.course || "N/A"} • {student?.year || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No participants yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;