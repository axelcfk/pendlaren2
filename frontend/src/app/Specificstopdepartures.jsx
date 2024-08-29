import { useEffect, useState } from "react";
import { api_key } from "./page";

export default function SpecificStopDepartures({ stopId }) {
  const [inputSearchStation, setInputSearchStation] = useState("");
  const [stationsResult, setStationsResult] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null); // SiteId
  const [siteInformation, setSiteInformation] = useState(null); // object

  /*   useEffect(() => {
    searchStop();
  }, []) */

  async function searchStation(searchString) {
    try {
      //const response = await fetch(`https://journeyplanner.integration.sl.se/v1/typeahead.json?searchstring=Oden&stationsonly=true&maxresults=5&key=${api_key}`)
      // const response = await fetch(`http://localhost:3001/searchStation`) // GET
      const response = await fetch(`http://localhost:3001/searchStation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchString: searchString,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.ResponseData) {
        /* note: first letter is always capitalized in this API */
        setStationsResult(data.ResponseData);
      } else {
        console.log(
          "searchStation fetch data does not contain responseData array?"
        );
      }
    } catch (error) {
      console.error("Error in searchStation():", error);
    }
  }

  // currently this only finds data.departures && data.stop_deviations that are empty?
  // not correct id? Slussen works with siteId 9192? But odenplan 300101079 does not? 
  async function fetchStationInformation(siteId) {
    try {
      const response = await fetch(`http://localhost:3001/siteInformation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: siteId,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.departures && data.stop_deviations) {
        setSiteInformation(data);
      } else {
        console.log("missing data in siteInformation?");
      }
    } catch (error) {
      console.error("Error in fetchStationInformation():", error);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchStation(inputSearchStation);
        }}
      >
        <label htmlFor="searchStationName"></label>
        <input
          required
          onChange={(e) => {
            setInputSearchStation(e.target.value);
          }}
          type="text"
          name=""
          id="searchStationName"
        />
        <button type="submit">Search Station</button>
      </form>
      <ul>
        {stationsResult.length > 0 &&
          stationsResult.map((station, index) => {
            /* automatically generated id from map function */
            return (
              <li key={index}>
                {station.Name}
                <button
                  onClick={() => {
                    setSelectedStation(station.SiteId);
                  }}
                >
                  Select
                </button>
              </li>
            );
          })}
      </ul>
      <div>
        {selectedStation && (
          <div>
            <h2>Departures from {selectedStation}</h2>{" "}
            {/* id right now, change to name */}
            <button
              onClick={() => {
                fetchStationInformation(selectedStation);
              }}
            >
              Display
            </button>
            <div>
              {siteInformation && siteInformation.departures.length > 0 && (
                <>
                  <p>Destination:{siteInformation.departures[0].destination}</p>
                  <span>
                    scheduled:{" "}
                    {siteInformation.departures[0].destination.scheduled}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
