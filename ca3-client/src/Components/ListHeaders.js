import React from "react";

const ListHeaders = props => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2">QuoteId</div>
        <div className="col">MinPrice</div>
        <div className="col-2 text-right">Direct/Indirect</div>
      </div>
    </li>
  );
};
export default ListHeaders;
