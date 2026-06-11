import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import RightPanel from "../components/RightPanel";
import { useState } from "react";
const Dashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  console.log("Selected:", selectedConversation);
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar setSelectedConversation = {setSelectedConversation} />
      <ChatWindow selectedConversation={selectedConversation} />
      <RightPanel />
    </div>
  );
};

export default Dashboard;