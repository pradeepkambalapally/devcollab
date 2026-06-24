import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer id="about" className="border-t border-zinc-800 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h3 className="text-2xl font-bold">
              DevCollab
            </h3>

            <p className="text-zinc-400 mt-2">
              Real-Time Developer Collaboration Platform
            </p>

          </div>

          <div className="text-center">

            <p className="text-zinc-400">
              Built with
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-3">

              <span className="px-3 py-1 rounded-full bg-zinc-900">
                React
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-900">
                Node.js
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-900">
                Express
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-900">
                MongoDB
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-900">
                Socket.IO
              </span>

            </div>

          </div>

          <a
            href="https://github.com/pradeepkambalapally/devcollab"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition"
          >
            <FiGithub size={22} />
            GitHub Repository
          </a>

        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 text-center text-zinc-500">

          © {new Date().getFullYear()} DevCollab.
          Built by Pradeep Kambalapally.

        </div>

      </div>

    </footer>
  );
};

export default Footer;