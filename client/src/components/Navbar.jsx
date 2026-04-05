import { Link, useNavigate, useLocation } from "react-router-dom";
import CollegeLogo from "../assets/logo.png";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative px-4 py-2 rounded-xl text-sm md:text-[15px] font-semibold transition-all duration-300 ${
      isActive(path)
        ? "bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-white shadow-lg"
        : "text-slate-700 hover:bg-white hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 md:px-6 pt-4">
      <nav className="max-w-7xl mx-auto rounded-[28px] border border-white/50 bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={CollegeLogo}
                alt="College Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                Dhirendra Mahila P.G. College
              </h1>
              <p className="text-xs md:text-sm text-slate-500 truncate">
                Premium College Event Management Portal
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>

            {!user && (
              <>
                <Link to="/login" className={navLinkClass("/login")}>
                  Login
                </Link>
                <Link to="/register" className={navLinkClass("/register")}>
                  Register
                </Link>
              </>
            )}

            {user?.role === "student" && (
              <Link
                to="/my-registrations"
                className={navLinkClass("/my-registrations")}
              >
                My Registrations
              </Link>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={navLinkClass("/admin/dashboard")}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/events"
                  className={navLinkClass("/admin/events")}
                >
                  Manage Events
                </Link>

                <Link
                  to="/admin/events/new"
                  className="px-4 py-2 rounded-xl text-sm md:text-[15px] font-semibold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white shadow-lg hover:scale-[1.03] transition"
                >
                  Add Event
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={logoutHandler}
                className="px-4 py-2 rounded-xl text-sm md:text-[15px] font-semibold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg hover:scale-[1.03] transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;