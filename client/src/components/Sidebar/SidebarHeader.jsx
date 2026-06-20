import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-white mb-4">
        DevCollab
      </h2>

      <Link
        to="/profile"
        className="block mb-4 p-2 rounded bg-zinc-800 text-center hover:bg-zinc-700 transition"
      >
        Edit Profile
      </Link>
    </>
  );
};

export default SidebarHeader;