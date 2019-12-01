import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Home";
import List from "./Components/List";
import "./styles.css";

function App({ apiFacade, match }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  let history = useHistory();

  const login = (username, password) => {
    console.log(username, password);

    const d = {
      Quotes: [
        {
          QuoteId: 1,
          MinPrice: 336.0,
          Direct: true,
          OutboundLeg: {
            CarrierIds: [1864],
            OriginId: 81727,
            DestinationId: 60987,
            DepartureDate: "2018-04-01T00:00:00"
          },
          InboundLeg: {
            CarrierIds: [851],
            OriginId: 60987,
            DestinationId: 81727,
            DepartureDate: "2018-05-01T00:00:00"
          },
          QuoteDateTime: "2018-03-08T04:54:00"
        }
      ],
      Places: [
        {
          PlaceId: 60987,
          IataCode: "JFK",
          Name: "New York John F. Kennedy",
          Type: "Station",
          SkyscannerCode: "JFK",
          CityName: "New York",
          CityId: "NYCA",
          CountryName: "United States"
        },
        {
          PlaceId: 81727,
          IataCode: "SFO",
          Name: "San Francisco International",
          Type: "Station",
          SkyscannerCode: "SFO",
          CityName: "San Francisco",
          CityId: "SFOA",
          CountryName: "United States"
        }
      ],
      Carriers: [
        { CarrierId: 851, Name: "Alaska Airlines" },
        { CarrierId: 870, Name: "jetBlue" },
        { CarrierId: 1721, Name: "Sun Country Airlines" },
        { CarrierId: 1864, Name: "Virgin America" }
      ],
      Currencies: [
        {
          Code: "USD",
          Symbol: "$",
          ThousandsSeparator: ",",
          DecimalSeparator: ".",
          SymbolOnLeft: true,
          SpaceBetweenAmountAndSymbol: false,
          RoundingCoefficient: 0,
          DecimalDigits: 2
        }
      ]
    };
    const q = d.Quotes[0];
    const p = d.Places[0];
    const c = d.Carriers[0];
    // console.log("d:", d);
    console.log("q:", q);
    console.log("p:", p);
    console.log("c:", c);

    apiFacade
      .login(username, password)
      .then(data => {
        setIsLoggedIn(apiFacade.loggedIn());
        // console.log("Am I logged in? ", isLoggedIn);
        setUsername(username);
        // getItems();
        // console.log("Kommer jeg her1?", isLoggedIn, history.location);
        history.push("/flights");
        // console.log("Kommer jeg her2?", history.location);
      })
      .catch(err => {
        console.log("Ups login:" + err);
        // history.push("/");
      });
    // console.log("Kommer jeg også her?");
    history.push("/flights");
  };

  const logout = () => {
    apiFacade.logout();
    setIsLoggedIn(apiFacade.loggedIn);
    setUsername("");
    history.push("/");
  };

  function NoMatch() {
    return (
      <div>
        <h4>This URL does not exist or you are not logged in!</h4>
      </div>
    );
  }

  return (
    <div>
      <Nav
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        username={username}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {isLoggedIn ? (
          <Route path="/flights" exact>
            <List apiFacade={apiFacade} />
          </Route>
        ) : (
          ""
        )}
        <Route path="/login-out">
          <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
