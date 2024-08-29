import { useEffect } from "react";
import { api_key } from "./page";

export default function SpecificStopDepartures({stopId}) {

  useEffect(() => {
    searchStop();
  }, [])

  async function searchStop() {

    try {
      //const response = await fetch(`https://journeyplanner.integration.sl.se/v1/typeahead.json?searchstring=Oden&stationsonly=true&maxresults=5&key=${api_key}`)
      const response = await fetch(`http://localhost:3001/searchStation`)

      const data = await response.json();

      console.log(data);
      
    } catch (error) {
      console.error("Error in getStopDepartues():", error);
      
    }

  }

 /*  async function name(params) {
    
  }
 */
  return (
    <>

    </>
  )
}