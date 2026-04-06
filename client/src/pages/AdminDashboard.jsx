import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalEvents: 0,
    totalRegistrations: 0,
  });
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://college-event-management-portal-backend.onrender.com/api";

  const BACKEND_URL = API_URL.replace("/api", "");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [statsRes, registrationsRes] = await Promise.all([
        API.get("/admin/dashboard"),
        API.get("/admin/registrations"),
      ]);

      setStats(
        statsRes.data || {
          totalUsers: 0,
          totalStudents: 0,
          totalAdmins: 0,
          totalEvents: 0,
          totalRegistrations: 0,
        }
      );

      setRegistrations(registrationsRes.data || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteRegistration = async (registrationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/admin/registrations/${registrationId}`);
      alert(res.data.message || "Registration deleted successfully");

      // best way: full refresh so totals stay correct
      await fetchDashboardData();
    } catch (error) {
      console.error("Delete registration error:", error);
      alert(error.response?.data?.message || "Failed to delete registration");
    }
  };

  const cards = [
    { title: "Total Users", value: stats.totalUsers || 0 },
    { title: "Total Students", value: stats.totalStudents || 0 },
    { title: "Total Admins", value: stats.totalAdmins || 0 },
    { title: "Total Events", value: stats.totalEvents || 0 },
    { title: "Total Registrations", value: stats.totalRegistrations || 0 },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[1.75rem] shadow-xl p-6 animate-pulse"
            >
              <div className="h-4 w-28 bg-slate-200 rounded mb-4"></div>
              <div className="h-10 w-20 bg-slate-300 rounded"></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[1.75rem] shadow-xl p-6">
          <div className="h-6 w-52 bg-slate-200 rounded mb-6 animate-pulse"></div>
          <p className="text-slate-500">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Manage registrations and view portal statistics
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Refresh Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-[1.75rem] shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition"
          >
            <p className="text-slate-500 text-sm font-medium">{card.title}</p>
            <h2 className="text-5xl font-bold text-slate-900 mt-3">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[1.75rem] shadow-xl p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Registration List
          </h2>
          <p className="text-slate-500">
            Total Registrations:{" "}
            <span className="font-semibold text-slate-900">
              {stats.totalRegistrations || 0}
            </span>
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 text-lg">No registrations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-4 text-slate-700 font-semibold">Student</th>
                  <th className="p-4 text-slate-700 font-semibold">
                    Student Details
                  </th>
                  <th className="p-4 text-slate-700 font-semibold">Event</th>
                  <th className="p-4 text-slate-700 font-semibold">Category</th>
                  <th className="p-4 text-slate-700 font-semibold">Date</th>
                  <th className="p-4 text-slate-700 font-semibold">Location</th>
                  <th className="p-4 text-slate-700 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.student?.image
                              ? `${BACKEND_URL}${item.student.image}`
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  item.student?.name || "Student"
                                )}&background=e2e8f0&color=334155`
                          }
                          alt={item.student?.name || "student"}
                          className="w-14 h-14 rounded-full object-cover border border-slate-200"
                        />

                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.student?.name || "N/A"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {item.student?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-sm text-slate-700">
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {item.student?.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Course:</span>{" "}
                        {item.student?.course || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Year:</span>{" "}
                        {item.student?.year || "N/A"}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-slate-900">
                        {item.event?.title || "N/A"}
                      </p>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {item.event?.description || "No description"}
                      </p>
                    </td>

                    <td className="p-4 text-slate-700">
                      {item.event?.category || "N/A"}
                    </td>

                    <td className="p-4 text-slate-700">
                      {item.event?.date
                        ? new Date(item.event.date).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4 text-slate-700">
                      {item.event?.location || "N/A"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteRegistration(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;