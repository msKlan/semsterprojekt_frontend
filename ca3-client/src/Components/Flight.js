import React from "react";
import ActionButtons from "./ActionButtons";

const Flight = props => {
  const { flight, toogleFlight, deleteFlight } = props;

  return (
    <li className="list-group-item">
      <div className="row">
            {flight.id}

         <div className="col-2">{new Date(flight.createdAt).toLocaleString()}</div>
         <div className="col">{flight.description}</div>
         <div className="col-2 text-right">
           {flight.done ? new Date(flight.updatedAt).toLocaleString() : ""}
         </div>
         <div className="col-2 text-right">
           <ActionButtons
             flight={flight}
             toogleFlight={toogleFlight}
             deleteFlight={deleteFlight}
           />
         </div>
      </div>
    </li>
  );
};
export default Flight;
