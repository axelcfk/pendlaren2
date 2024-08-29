import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";


const app = express();

// Enable CORS for all routes
app.use(cors());
// Enable req.body in endpoints..?
app.use(bodyParser.json());


// Using the server-side proxy approach with Express, as shown in the examples, should solve the CORS issues without needing to modify any CORS settings directly in the browser or frontend.

const api_key = "1865697a58b84a44b469a378afb64499";

app.post('/searchStation', async (req, res) => {

  const { searchString } = req.body;
  //const searchString = "Oden"; 

  try {
    const apiResponse = await fetch(`https://journeyplanner.integration.sl.se/v1/typeahead.json?searchstring=${searchString}&stationsonly=true&maxresults=5&key=${api_key}`);
    const data = await apiResponse.json();
    console.log(data);
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred in /searchStation' });
  }
});

// https://www.trafiklab.se/api/trafiklab-apis/sl/transport/
// site vs station?
app.post('/siteInformation', async (req, res) => {
 // const siteId = 9192; // slussen

  const { siteId } = req.body;

  console.log("finding site information for siteId", siteId);
  

  try {
    const apiResponse = await fetch (`https://transport.integration.sl.se/v1/sites/${siteId}/departures
    `)
    const data = await apiResponse.json();

    console.log(data);
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred in /stationDepartures' });
    
  }
})

app.listen(3001, () => console.log('Server running on http://localhost:3001'));