import {
  FiCpu,
  FiCode,
  FiUsers,
  FiBell,
  FiFolder,
  FiVideo,
} from "react-icons/fi";

const futureFeatures = [
  {
    icon: <FiCpu size={28} />,
    title: "AI Assistant",
    description:
      "Get coding help, explanations, debugging assistance and interview preparation.",
  },
  {
    icon: <FiCode size={28} />,
    title: "Code Rooms",
    description:
      "Collaborative coding sessions with multiple developers in real time.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Developer Communities",
    description:
      "Create and join communities focused on technologies and interests.",
  },
  {
    icon: <FiBell size={28} />,
    title: "Notifications",
    description:
      "Receive mentions, collaboration requests and important updates.",
  },
  {
    icon: <FiFolder size={28} />,
    title: "File Sharing",
    description:
      "Share documents, code files, resources and project assets.",
  },
  {
    icon: <FiVideo size={28} />,
    title: "Voice & Video Calls",
    description:
      "Communicate beyond chat with integrated calls and screen sharing.",
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 px-6 bg-zinc-900/30">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">
            🚀 Coming Soon
          </span>

          <h2 className="text-4xl font-bold mt-6">
            The Future of DevCollab
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            We're building more than a chat platform.
            DevCollab aims to become a complete developer collaboration ecosystem.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {futureFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-violet-500/40 transition"
            >

              <div className="text-violet-500 mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-zinc-400">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

        {/* Timeline */}

        <div className="mt-24 max-w-3xl mx-auto">

          <h3 className="text-2xl font-bold mb-8 text-center">
            Development Roadmap
          </h3>

          <div className="space-y-6">

            <div className="bg-zinc-900 border border-green-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-green-400 mb-2">
                ✅ Completed
              </h4>

              <p className="text-zinc-300">
                Authentication, Real-Time Messaging,
                Profiles, Image Sharing, Online Status,
                Typing Indicators, Seen Status.
              </p>
            </div>

            <div className="bg-zinc-900 border border-yellow-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-yellow-400 mb-2">
                🟡 In Progress
              </h4>

              <p className="text-zinc-300">
                AI Assistant,
                Enhanced Developer Profiles.
              </p>
            </div>

            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-violet-400 mb-2">
                🔮 Planned
              </h4>

              <p className="text-zinc-300">
                Code Rooms, Communities,
                Voice Calls, Video Calls,
                Screen Sharing, File Collaboration.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Roadmap;