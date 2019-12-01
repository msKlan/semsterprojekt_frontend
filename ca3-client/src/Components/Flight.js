import React from "react";
import ActionButtons from "./ActionButtons";

const Flight = props => {
  const { flight, toogleFlight, deleteFlight } = props;

  return (
    <li className="list-group-item">
      {/* <p>{JSON.stringify(flight)}</p> */}
      <div className="row">
        <div className="col-2">{flight.QuoteId}</div>
        <div className="col">{flight.OutboundLeg.DestinationId}</div>
        <div className="col-2 text-right">
          {flight.Direct ? "Direct" : "Indirect"}
        </div>
        {/* <div className="col-2 text-right">
           {flight.done ? new Date(flight.updatedAt).toLocaleString() : ""}
         </div> */}
        {/* <div className="col-2 text-right">
          <ActionButtons
            flight={flight}
            toogleFlight={toogleFlight}
            deleteFlight={deleteFlight}
          />
        </div> */}
      </div>
    </li>
  );
};
export default Flight;
