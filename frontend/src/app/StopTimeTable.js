"use client";
import { useState, useEffect } from "react";

export default function StopTimetable({ selectedStopId }) {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedStopId) {
      fetchTimetable(selectedStopId);
    }
  }, [selectedStopId]);

  async function fetchTimetable(stopId) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/getTimetable?stopId=${stopId}`);
      const data = await response.json();

      if (data.Departure) {
        setDepartures(data.Departure);
      } else {
        setDepartures([]);
      }
    } catch (error) {
      setError("Failed to fetch timetable.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading timetable...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (departures.length === 0) {
    return <p>No departures available for this stop.</p>;
  }

  return (
    <div>
      <h2>Departures for selected stop:</h2>
      <ul>
        {departures.map((departure) => (
          <li key={departure.journeyNumber}>
            {departure.name} to {departure.direction} - Departs at {departure.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
