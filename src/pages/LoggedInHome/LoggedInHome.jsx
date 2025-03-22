import { useState, useEffect } from "react";
import "./LoggedInHome.css";
import LoggedInNavbar from "../../components/LoggedInNavBar/Navbar/LoggedInnavbar";
import PropTypes from "prop-types";
import supabase from "../../supabaseClient";
import EventsFeed from "../../components/EventsFeed/EventsFeed";

function LoggedInHome() {
  const [userName, setUserName] = useState("");
  const [myEvents, setMyEvents] = useState([]);

  const handleJoin = async (sessionId) => {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
      alert("You must be logged in to join an event.");
      return;
    }
  
    // Check if user is already in the session
    const { data: existingEntry } = await supabase
      .from("user_sessions")
      .select("*")
      .eq("user_id", user.id)
      .eq("session_id", sessionId)
      .maybeSingle();
    

    {/*if (existingEntry) {
      alert("You're already in this session.");
      return;
    }*/}

    if (existingEntry) {
      const{error: deleteError} = await supabase
        .from("user_sessions")
        .delete()
        .eq("user_id", user.id)
        .eq("session_id", sessionId)
        .maybeSingle(); 
      
      if(deleteError){
        console.error("Error joining session:", deleteError);
        alert("Failed to leave event. Try again.");
        return;
      }
      //Get current participant number
      const{data: sessionData, error: fetchError} = await supabase  
        .from("studysessions")
        .select("participant_count")
        .eq("id", sessionId)
        .maybeSingle();  

      if(fetchError || !sessionData){
        console.error("Error fetching participant count:", fetchError);
        alert("Failed to fetch participant count.");
        return;
      }
      const newCount = Math.max((sessionData.participant_count || 1) - 1, 0);
  
      // Update the participant count in studysessions
      const { error: updateError } = await supabase
        .from("studysessions")
        .update({ participant_count: newCount })
        .eq("id", sessionId);
      
      if (updateError) {
        console.error("Error updating participant count:", updateError);
        alert("Failed to update participant count.");
        return;
      }
      
      alert("You have left the event.");
      location.reload();
      
      // Refresh state to reflect the new participant count
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === sessionId
            ? { ...event, participant_count: newCount }
            : event
        )
      );
      location.reload()
      return;
    }
  
    // Insert user into user_sessions
    const { error: insertError } = await supabase
      .from("user_sessions")
      .insert([{ user_id: user.id, session_id: sessionId }]);
  
    if (insertError) {
      console.error("Error joining session:", insertError);
      alert("Failed to join event. Try again.");
      return;
    }
  
    // Fetch the current participant count
      const { data: sessionData, error: fetchError } = await supabase
        .from("studysessions")
        .select("participant_count")
        .eq("id", sessionId)
        .maybeSingle();
  
    if (fetchError || !sessionData) {
      console.error("Error fetching participant count:", fetchError);
      alert("Failed to fetch participant count.");
      return;
    }
  
    const newCount = (sessionData.participant_count || 0) + 1;
  
    // Update the participant count in studysessions
    const { error: updateError } = await supabase
      .from("studysessions")
      .update({ participant_count: newCount })
      .eq("id", sessionId);
  
    if (updateError) {
      console.error("Error updating participant count:", updateError);
      alert("Failed to update participant count.");
      return;
    }
  
    alert("Successfully joined the event!");
  
    // Refresh state to reflect the new participant count
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === sessionId
          ? { ...event, participant_count: newCount }
          : event
      )
    );
  };

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
          <h2>Ready to Find a ProcrastiMate?</h2>
        </div>
        <div className="events-section">
          <h2>My Events</h2>
          <EventsFeed events={myEvents} onJoin={handleJoin} />
        </div>
      </div>
    </>
  );
}

export default LoggedInHome;
