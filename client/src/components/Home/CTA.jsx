import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-3xl p-10 md:p-16 text-center">

          <span className="text-sm font-medium uppercase tracking-wider">
            Join DevCollab Today
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Ready to Build Together?
          </h2>

          <p className="mt-6 text-lg text-zinc-100 max-w-2xl mx-auto">
            Connect with developers, collaborate on ideas,
            share knowledge, and build amazing projects
            together in real time.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <Link
              to="/register"
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;