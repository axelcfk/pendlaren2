

import express from 'express';
import cors from 'cors';
const app = express();

// Enable CORS for all routes
app.use(cors());

// Using the server-side proxy approach with Express, as shown in the examples, should solve the CORS issues without needing to modify any CORS settings directly in the browser or frontend.

const api_key = "1865697a58b84a44b469a378afb64499";

app.get('/searchStation', async (req, res) => {
  try {
    const apiResponse = await fetch(`https://journeyplanner.integration.sl.se/v1/typeahead.json?searchstring=Oden&stationsonly=true&maxresults=5&key=${api_key}`);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));