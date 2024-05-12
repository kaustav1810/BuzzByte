import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import './App.css'
import Feed from "@/components/Feed/Feed";
import Widgets from "@/components/Widgets/Widgets";

export default function Home() {
  return (
    <div className="container">
    <Sidebar/>

    {/* Feed */}
    <Feed/>


    {/* Widgets */}
    <Widgets/>
    
    </div>
  );
}
