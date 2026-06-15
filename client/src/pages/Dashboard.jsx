import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import RightPanel from "../components/RightPanel";
import NavigationSidebar from "../components/NavigationSidebar";
import { useState } from "react";
const Dashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [refreshSidebar, setRefreshSidebar] = useState(false);
  console.log("Selected:", selectedConversation);
  return (
    <div className="flex h-screen bg-zinc-950 text-white">

  <NavigationSidebar />

  <Sidebar
    setSelectedConversation={setSelectedConversation}
    refreshSidebar={refreshSidebar}
    selectedConversation={selectedConversation}
  />

  <ChatWindow
    selectedConversation={selectedConversation}
    setRefreshSidebar={setRefreshSidebar}
  />

  <RightPanel
    selectedConversation={selectedConversation}
  />

</div>
  );
};

export default Dashboard;