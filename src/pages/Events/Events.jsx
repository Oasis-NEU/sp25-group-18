import { useState, useEffect } from "react";
import "./Events.css";
import supabase from "../../supabaseClient";
import Sidebar from "../../components/Sidebar/Sidebar";
import EventsFeed from "../../components/EventsFeed/EventsFeed";
import LoggedInNavbar from "../../components/LoggedInNavBar/Navbar/LoggedInnavbar";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    format: "",
    groupSize: [],
    course: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      let { data, error } = await supabase.from("studysessions").select("*");
      if (error) {
        console.error("Ошибка при загрузке событий:", error);
      } else {
        console.log("Загруженные события:", data);
        setEvents(data);
        setFilteredEvents(data);
      }
    };

    fetchEvents();
  }, []);
  
  useEffect(() => {
    let filtered = events || [];
  
    if (filters.course) {
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(filters.course.toLowerCase())
      );
    }
  
    if (filters.date && filters.date !== "weekend") {
      filtered = filtered.filter((event) =>
        event.time?.startsWith(filters.date)
      );
    } else if (filters.date === "weekend") {
      filtered = filtered.filter((event) => {
        if (!event.time) return false;
        const eventDate = new Date(event.time);
        return eventDate.getDay() === 6 || eventDate.getDay() === 0;
      });
    }
  
    if (filters.format) {
      filtered = filtered.filter((event) => event.format === filters.format);
    }
  
    if (Array.isArray(filters.groupSize) && filters.groupSize.length > 0) {
      filtered = filtered.filter((event) => {
        const size = event.max_participants || 0;
        return (
          (filters.groupSize.includes("small") && size >= 2 && size <= 5) ||
          (filters.groupSize.includes("medium") && size >= 6 && size <= 10) ||
          (filters.groupSize.includes("large") && size > 10)
        );
      });
    }
  
    setFilteredEvents(filtered);
  }, [filters, events]);
  
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
      
      // Refresh state to reflect the new participant count
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === sessionId
            ? { ...event, participant_count: newCount }
            : event
        )
      );
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
  
  return (
    <>
      <LoggedInNavbar />
      <div className="main-container">
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="content-container">
          <h2 className="discover-events">Discover events</h2>
          <EventsFeed events={filteredEvents} onJoin={handleJoin} />
        </div>
      </div>
    </>
  );
};

export default Events;
