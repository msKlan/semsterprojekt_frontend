import URL from "./settings";
// const backendURL = "http://localhost:8080/securitystarter"; // Kun til udvikling

function apiFacade() {
  const makeOptions = (method, addToken, body) => {
    // method: GET, POST, PUT, DELETE
    // addToken: true: add JWT, false: no JWT
    // body: body to add if any
    // Return: options for fetch-method
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        // "Origin": "http://localhost:3000",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  // Generic errorhandler for fetch-metod
  function handleHttpErrors(res) {
    console.log(res);
    // res.json().then(data => {
    //   console.log("handleHttpErrors: ", data);
    // });

    if (!res.ok) {
      removeToken(); // Remove JWT if an error occurred
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  // Store JWT in localStorage
  const setToken = token => {
    console.log("setToken: ", token);
    localStorage.setItem("jwtToken", token);
  };

  // Get JWT from localStorage - if any
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  // Remove JWT from localStorage - if any
  const removeToken = () => {
    localStorage.removeItem("jwtToken");
  };

  // Return loggedIn true if there is a JWT
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  // Login and store JWT ig successful
  const login = (username, password) => {
    console.log("apiFacade-login: ", username, password);
    const options = makeOptions("POST", true, {
      username: username,
      password: password
    });
    // console.log("login:", options);
    console.log(URL + "/api/login");
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        console.log("apiFacade-login: ", res.token);
        // TBD - Store other data from login if any - roles?
      })
      .catch(err => {
        console.log("Ups apiFacade-login:" + err);
        // history.push("/");
      });
  };

  // Logout and remove store JWT
  const logout = () => {
    removeToken();
  };

  const getCity = city => {
    console.log("getCity: ", ">" + URL + "/api/info/place/" + city + "<");
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/info/place/" + city.toString(), options).then(
      handleHttpErrors
    );
  };

  const getDepAirports = depFilterCity => {
    console.log("apiFacade-getDepAirports: ", depFilterCity);
    const options = makeOptions("GET", true);

    return fetch(URL + "/api/info/place/" + depFilterCity, options).then(
      handleHttpErrors
    );
    // .then(data => {
    //   console.log(data.Places);
    //   return data.Places;
    // });
  };

  const getArrAirports = arrFilterCity => {
    console.log("apiFacade-getArrAirports: ", arrFilterCity);
    const options = makeOptions("GET", true);

    return fetch(URL + "/api/info/place/" + arrFilterCity, options).then(
      handleHttpErrors
    );
    // .then(data => {
    //   console.log(data.Places);
    //   return data.Places;
    // });
  };

  const getFlights = (dep, arr, depDate) => {
    alert("apiFacade-getFlights");
    console.log(
      "apiFacade-getFlights: ",
      URL + "/api/info/flights/" + dep + "/" + arr + "/" + Date.toString()
    );
    const options = makeOptions("GET", true);
    return fetch(
      URL + "/api/info/flights/" + dep + "/" + arr + "/" + Date.toString(),
      options
    ).then(handleHttpErrors);
  };

  return {
    // Remember all statements below are a shortcut for this version: getitems: getitems
    login,
    logout,
    loggedIn,
    getFlights,
    getCity,
    getDepAirports,
    getArrAirports
  };
}

// let returnVal = apiFacade();
// export default returnVal;
export default apiFacade();
