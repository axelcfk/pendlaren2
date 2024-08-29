import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';  // Make sure node-fetch is installed

const app = express();
const api_key = "1865697a58b84a44b469a378afb64499";

// Enable CORS for all routes
app.use(cors());

// Route to search for stations
app.get('/searchStation', async (req, res) => {
  try {
    const apiResponse = await fetch(`https://journeyplanner.integration.sl.se/v1/typeahead.json?searchstring=Oden&stationsonly=true&maxresults=5&key=${api_key}`);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for stations' });
  }
});

// New route to fetch timetable for a stop
app.get('/getTimetable', async (req, res) => {
  const stopId = req.query.stopId;
  try {
    const apiResponse = await fetch(`https://api.resrobot.se/v2.1/departureBoard?format=json&id=${stopId}&accessId=${api_key}`);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching timetable' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
