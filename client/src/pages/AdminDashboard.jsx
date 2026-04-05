import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
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

      setStats(statsRes.data || {});
      setRegistrations(registrationsRes.data || []);
    } catch (error) {
      console.error(error);
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

      setRegistrations((prev) =>
        prev.filter((item) => item._id !== registrationId)
      );

      setStats((prev) => ({
        ...prev,
        totalRegistrations: Math.max((prev.totalRegistrations || 1) - 1, 0),
      }));
    } catch (error) {
      console.error(error);
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
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-[1.75rem] shadow-xl p-6">
            <p className="text-slate-500">{card.title}</p>
            <h2 className="text-5xl font-bold text-slate-900 mt-3">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[1.75rem] shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Registration List
          </h2>
          <p className="text-slate-500">Total: {registrations.length}</p>
        </div>

        {registrations.length === 0 ? (
          <p className="text-slate-500">No registrations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-4">Student</th>
                  <th className="p-4">Student Details</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-200 hover:bg-slate-50"
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
                          className="w-14 h-14 rounded-full object-cover border"
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

                    <td className="p-4">
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

                    <td className="p-4">{item.event?.category || "N/A"}</td>

                    <td className="p-4">
                      {item.event?.date
                        ? new Date(item.event.date).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">{item.event?.location || "N/A"}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteRegistration(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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