import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { token } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold">
            DC
          </div>

          <span className="text-xl font-bold">
            DevCollab
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="text-zinc-300 hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#roadmap"
            className="text-zinc-300 hover:text-white transition"
          >
            Roadmap
          </a>

          <a
            href="#about"
            className="text-zinc-300 hover:text-white transition"
          >
            About
          </a>

        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">

          {token ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
            >
              Go To Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-900 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
};

export default Navbar;