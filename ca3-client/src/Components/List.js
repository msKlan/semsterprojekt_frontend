import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ListHeaders from "./ListHeaders";
import FilterCity from "./FilterCity";
import SelectAirport from "./SelectAirport";
import Flight from "./Flight";
import Filter from "./Filter";
import URL from "../settings";

const List = props => {
  const { apiFacade } = props;

  const [depFilterCity, setDepFilterCity] = useState("");
  const [depAirports, setDepAirports] = useState([]);
  const [depAirport, setDepAirport] = useState("");

  const [arrFilterCity, setArrFilterCity] = useState("");
  const [arrAirports, setArrAirports] = useState([]);
  const [arrAirport, setArrAirport] = useState("");

  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState();

  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    console.log("useState");
    setLoading(false);
  }, []);

  const getDepAirports = () => {
    console.log("getDepAirports: ", depFilterCity);
    setLoading(true);
    // console.log("xxxx: ", apiFacade.getDepAirports(depFilterCity));
    apiFacade.getDepAirports(depFilterCity).then(data => {
      setDepAirports(data.Places);
      console.log(data.Places);
      console.log("getDepAirports: ", data.Places[0].PlaceId);
      setDepAirport(data.Places[0].PlaceId); // Set first which is default selected
    });

    setLoading(false);
  };

  const getArrAirports = () => {
    console.log("getArrAirports: ", arrFilterCity);
    setLoading(true);
    // console.log("xxxx: ", apiFacade.getArrAirports(arrFilterCity));
    apiFacade.getArrAirports(arrFilterCity).then(data => {
      console.log(data);
      setArrAirports(data.Places);
      setArrAirport(data.Places[0].PlaceId); // Set first which is default selected
    });

    setLoading(false);
  };

  const getFlights = () => {
    console.log("List-getFlights: ", depAirport, arrAirport, date);
    apiFacade.getFlights(depAirport, arrAirport, date).then(data => {
      setFlights(data.Quotes);
      console.log("List-getFlights: ", data.Quotes);
    });
  };

  const toogleFlight = flight => {
    const { id, done } = flight;

    setLoading(true);
    console.log("toogleFlight");
    setLoading(false);
  };

  const deleteFlight = flight => {
    const { id } = flight;
    setLoading(true);
    console.log("deleteFlight");
    setLoading(false);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  return (
    <div className="row">
      {loading ? <div className="loading" /> : ""}
      <div className="col-4">
        <FilterCity
          placeHolder="Enter departure city"
          getAirports={getDepAirports}
          FilterCity={depFilterCity}
          setFilterCity={setDepFilterCity}
        />
      </div>
      <div className="col-8">
        <SelectAirport airports={depAirports} setAirport={setDepAirport} />
      </div>
      <div className="col-4">
        <FilterCity
          placeHolder="Enter arrival city"
          getAirports={getArrAirports}
          FilterCity={arrFilterCity}
          setFilterCity={setArrFilterCity}
        />
      </div>
      <div className="col-8">
        <SelectAirport airports={arrAirports} setAirport={setArrAirport} />
      </div>

      <div className="col-12">
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd-MMM-yyyy"
        />
      </div>

      <div className="col-12">
        <hr />
      </div>

      <div className="col-12">
        <ul className="list-group">
          <ListHeaders />
          {/* <p>{JSON.stringify(flights[0])}</p> */}
          {flights.map(flight => (
            <Flight
              key={flight.QuoteId}
              flight={flight}
              toogleFlight={toogleFlight}
              deleteFlight={deleteFlight}
            />
          ))}
        </ul>
      </div>
      <p>{JSON.stringify(depFilterCity)}</p>
      <button onClick={() => getFlights()}>Get</button>
    </div>
  );
};
export default List;
