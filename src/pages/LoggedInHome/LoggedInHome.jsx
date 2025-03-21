import { useState, useEffect } from "react";
import "./LoggedInHome.css";
import LoggedInNavbar from "../../components/LoggedInNavBar/Navbar/LoggedInnavbar";
import PropTypes from "prop-types";
import supabase from "../../supabaseClient";
import EventsFeed from "../../components/EventsFeed/EventsFeed";

function LoggedInHome() {
  const [userName, setUserName] = useState("");
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch user name
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("name")
          .eq("id", user.id)
          .maybeSingle();

        if (userError) {
          console.error("Error fetching user name:", userError);
        } else if (userData) {
          setUserName(userData.name);
        }

        // Fetch events where the user is a participant
        const { data: sessionEntries, error: sessionError } = await supabase
          .from("user_sessions")
          .select("session_id")
          .eq("user_id", user.id);

        if (sessionError) {
          console.error("Error fetching user sessions:", sessionError);
        } else if (sessionEntries.length > 0) {
          const sessionIds = sessionEntries.map((entry) => entry.session_id);

          const { data: eventData, error: eventError } = await supabase
            .from("studysessions")
            .select("*")
            .in("id", sessionIds);

          if (eventError) {
            console.error("Error fetching user events:", eventError);
          } else {
            setMyEvents(eventData);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <LoggedInNavbar />
      <div className="dashboard-container">
        <div className="welcome">
          <h1>Hi, {userName || "User"}</h1>
          <h2>Ready to Find a Study Buddy?</h2>
        </div>
        <div className="events-section">
          <h2>My Events</h2>
          <EventsFeed events={myEvents} />
        </div>
      </div>
    </>
  );
}

export default LoggedInHome;
