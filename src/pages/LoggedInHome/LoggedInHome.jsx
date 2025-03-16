import { useState, useEffect } from "react";
import "./LoggedInHome.css";
import supabase from "../../supabaseClient";
import Sidebar from "../../components/Sidebar/Sidebar";
import EventsFeed from "../../components/EventsFeed/EventsFeed";
import LoggedInNavbar from "../../components/LoggedInNavBar/Navbar/LoggedInnavbar";

function LoggedInHome() {
  return (
    <>
      <LoggedInNavbar />
      <div className="welcome">
        <h1>Hi, Michael</h1>
        <h2>Ready to Find a Study Buddy?</h2>
      </div>
    </>
    // Put in Event Page for My Events Here, Make it to the right of the text
  );
}

export default LoggedInHome;
