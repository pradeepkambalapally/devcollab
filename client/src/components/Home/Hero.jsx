import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Hero = () => {

  const {token} = useAuth();
  return (
    <section className="relative overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
              🚀 Build Together. Learn Together.
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              AI-Powered
              <span className="block text-violet-500">
                Developer
              </span>
              Collaboration
            </h1>

            <p className="mt-8 text-lg text-zinc-400 max-w-xl">
              Connect with developers, collaborate in real-time,
              share ideas, showcase your profile, and build
              amazing projects together.
            </p>

           {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            {token ? (
              <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-medium"
              >
                Go To Dashboard
              </Link>
              ) : (
              <>
              <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-medium"
              >
                Get Started
              </Link>
              <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
              >
                Login
              </Link>
              </>
            )}
          </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-12">

              <div>
                <p className="text-2xl font-bold">
                  Real-Time
                </p>
                <p className="text-zinc-400 text-sm">
                  Messaging
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  Secure
                </p>
                <p className="text-zinc-400 text-sm">
                  Authentication
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  Developer
                </p>
                <p className="text-zinc-400 text-sm">
                  Profiles
                </p>
              </div>

            </div>

          </div>

          {/* Right Preview */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute -inset-8 bg-violet-600/20 blur-3xl rounded-full" />

            {/* Dashboard Preview */}
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">

              <img
                src="/image.png"
                alt="DevCollab Dashboard"
                className="w-full rounded-2xl"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;