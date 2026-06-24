import {
  FiMessageSquare,
  FiUsers,
  FiImage,
  FiUser,
  FiCheckCircle,
  FiActivity,
} from "react-icons/fi";

const features = [
  {
    icon: <FiMessageSquare size={28} />,
    title: "Real-Time Messaging",
    description:
      "Instant one-to-one messaging powered by Socket.IO.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Online Presence",
    description:
      "See who is online and collaborate in real time.",
  },
  {
    icon: <FiImage size={28} />,
    title: "Image Sharing",
    description:
      "Share screenshots, designs, and project resources.",
  },
  {
    icon: <FiUser size={28} />,
    title: "Developer Profiles",
    description:
      "Showcase your skills, bio, avatar, and GitHub profile.",
  },
  {
    icon: <FiCheckCircle size={28} />,
    title: "Seen Status",
    description:
      "Know when your messages have been viewed.",
  },
  {
    icon: <FiActivity size={28} />,
    title: "Typing Indicators",
    description:
      "See when someone is actively typing.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="text-violet-400 font-medium">
            Current Features
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Everything You Need To Collaborate
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            DevCollab provides powerful real-time communication
            tools designed specifically for developers.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
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

      </div>

    </section>
  );
};

export default Features;