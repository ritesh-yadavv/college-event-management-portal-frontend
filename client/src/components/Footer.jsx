import { Link } from "react-router-dom";
import CollegeLogo from "../assets/logo.png";
import DeveloperPhoto from '../assets/myphoto.png';

function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <footer className="mt-20 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute top-0 left-0 w-80 h-80 bg-fuchsia-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center">
                <img
                  src={CollegeLogo}
                  alt="College Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div>
                <h2 className="text-xl font-extrabold">D.M.P.G. College</h2>
                <p className="text-sm text-slate-400">
                  College Event Management Portal
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-7">
              Near Pani Tanki, Gandhi Nagar, Sundarpur, Newada, Varanasi, Uttar Pradesh 221005.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              {!user && (
                <>
                  <Link to="/login" className="hover:text-white transition">
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-white transition">
                    Register
                  </Link>
                </>
              )}

              {user?.role === "student" && (
                <Link
                  to="/my-registrations"
                  className="hover:text-white transition"
                >
                  My Registrations
                </Link>
              )}

              {user?.role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/events"
                    className="hover:text-white transition"
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/admin/events/new"
                    className="hover:text-white transition"
                  >
                    Add Event
                  </Link>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Portal Features</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Smart Event Discovery</p>
              <p>Search & Category Filter</p>
              <p>Easy Student Registration</p>
              <p>Participants Preview</p>
              <p>Admin Dashboard</p>
              <p>Premium Responsive Design</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Developer</h3>
            <div className="flex items-center gap-4">
              <img
                src={DeveloperPhoto}
                alt="Vaishali Patel"
                className="w-16 h-16 rounded-2xl object-cover border border-white/10"
              />
              <div>
                <p className="text-white font-bold text-base">Vaishali Patel</p>
                <p className="text-sm text-slate-400">MERN Stack Developer</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-7 mt-4">
              Designed and developed with a premium frontend vision for a clean,
              attractive, and practical college portal experience.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} D.M.P.G. College. All rights reserved.
          </p>

          <p className="text-sm text-slate-500 text-center md:text-right">
            Made with ❤️ by{" "}
            <span className="text-white font-semibold">Vaishali Patel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;