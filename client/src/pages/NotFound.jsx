import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

      <div className="text-center max-w-md">

        {/* Logo */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl font-bold shadow-xl">
          DC
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Oops! Page Not Found
        </h2>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
        >
          <FiArrowLeft size={18} />
          Back to Dashboard
        </button>

      </div>

    </div>
  );
};

export default NotFound;