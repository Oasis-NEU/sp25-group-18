import { useState, useEffect } from 'react';
import './Events.css';
import supabase from '../../supabaseClient';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import EventsFeed from '../../components/EventsFeed/EventsFeed';

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
      filtered = filtered.filter(event =>
        event.course_code?.toLowerCase() === filters.course.toLowerCase()
      );
    }

    if (filters.date && filters.date !== "weekend") {
      filtered = filtered.filter(event => event.time?.startsWith(filters.date));
    } else if (filters.date === "weekend") {
      filtered = filtered.filter(event => {
        if (!event.time) return false; 
        const eventDate = new Date(event.time);
        return eventDate.getDay() === 6 || eventDate.getDay() === 0;
      });
    }

    if (filters.format) {
      filtered = filtered.filter(event => event.format === filters.format);
    }

    if (Array.isArray(filters.groupSize) && filters.groupSize.length > 0) {
      filtered = filtered.filter(event => {
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

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="content-container">
          <h2 className="discover-events">Discover events</h2>
          <EventsFeed events={filteredEvents} />
        </div>
      </div>
    </>
  );
};

export default Events;