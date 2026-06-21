import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const SidebarHeader = () => {
  return (
    <div className="mb-6">

      {/* App Name */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            DevCollab
          </h1>

          <p className="text-sm text-zinc-400 mt-1">
            Connect. Chat. Collaborate.
          </p>
        </div>

      </div>

      {/* Edit Profile */}
      <Link
        to="/profile"
        className="mt-5 flex items-center justify-center gap-2 w-full rounded-2xl bg-blue-600 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
      >
        <FiEdit size={18} />
        Edit Profile
      </Link>

    </div>
  );
};

export default SidebarHeader;