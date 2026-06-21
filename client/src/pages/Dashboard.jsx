import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatWindow from "../components/Chat/ChatWindow";
import RightPanel from "../components/RightPanel/RightPanel";
import NavigationSidebar from "../components/NavigationSideBar";

const Dashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [refreshSidebar, setRefreshSidebar] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-white flex">

      {/* Navigation Sidebar */}
      <aside className="hidden lg:flex flex-shrink-0">
        <NavigationSidebar />
      </aside>

      {/* Conversation Sidebar */}
      <aside
        className={`
          ${
            selectedConversation
              ? "hidden md:flex"
              : "flex"
          }
          w-full md:w-80 lg:w-96
          flex-shrink-0
          border-r border-zinc-800
        `}
      >
        <Sidebar
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          refreshSidebar={refreshSidebar}
        />
      </aside>

      {/* Chat Window */}
      <main
        className={`
          ${
            selectedConversation
              ? "flex"
              : "hidden md:flex"
          }
          flex-1
          min-w-0
          flex-col
        `}
      >
        <ChatWindow
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          setRefreshSidebar={setRefreshSidebar}
        />
      </main>

      {/* Right Panel */}
      <aside className="hidden xl:flex w-80 2xl:w-96 flex-shrink-0 border-l border-zinc-800">
        <RightPanel
          selectedConversation={selectedConversation}
        />
      </aside>

    </div>
  );
};

export default Dashboard;