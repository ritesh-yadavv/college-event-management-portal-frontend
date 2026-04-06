import { Link } from "react-router-dom";
import { Home, LogIn, UserPlus, LayoutDashboard, CalendarPlus, ClipboardList, Sparkles, Search, ShieldCheck, MonitorSmartphone, Users } from "lucide-react";
import CollegeLogo from "../assets/logo.png";

function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  const quickLinks = [
    { name: "Home", to: "/", icon: <Home size={16} /> },
    ...(!user
      ? [
          { name: "Login", to: "/login", icon: <LogIn size={16} /> },
          { name: "Register", to: "/register", icon: <UserPlus size={16} /> },
        ]
      : []),
    ...(user?.role === "student"
      ? [
          {
            name: "My Registrations",
            to: "/my-registrations",
            icon: <ClipboardList size={16} />,
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [
          {
            name: "Dashboard",
            to: "/admin/dashboard",
            icon: <LayoutDashboard size={16} />,
          },
          {
            name: "Manage Events",
            to: "/admin/events",
            icon: <ClipboardList size={16} />,
          },
          {
            name: "Add Event",
            to: "/admin/events/new",
            icon: <CalendarPlus size={16} />,
          },
        ]
      : []),
  ];

  const features = [
    { text: "Smart Event Discovery", icon: <Sparkles size={16} /> },
    { text: "Search & Category Filter", icon: <Search size={16} /> },
    { text: "Easy Student Registration", icon: <Users size={16} /> },
    { text: "Participants Preview", icon: <ClipboardList size={16} /> },
    { text: "Admin Dashboard", icon: <ShieldCheck size={16} /> },
    { text: "Premium Responsive Design", icon: <MonitorSmartphone size={16} /> },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-slate-950 text-white">
      <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-white/10 overflow-hidden">
                <img
                  src={CollegeLogo}
                  alt="College Logo"
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-wide">
                  D.M.P.G. College
                </h2>
                <p className="text-sm text-slate-400">
                  College Event Management Portal
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-400 max-w-md">
              Near Pani Tanki, Gandhi Nagar, Sundarpur, Newada, Varanasi,
              Uttar Pradesh 221005.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-sm">
              Empowering students through smarter event management
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>
            <div className="grid gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-white/10 hover:text-white"
                >
                  <span className="text-fuchsia-400 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Portal Features</h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <span className="text-cyan-400">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} D.M.P.G. College. All rights reserved.
            </p>

            <p className="text-sm text-slate-400 text-center md:text-right">
              Made with{" "}
              <span className="animate-pulse text-rose-400">❤️</span> by{" "}
              <span className="font-semibold text-white">Vaishali</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;