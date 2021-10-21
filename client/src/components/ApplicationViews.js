import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import { StarList } from "./StarList";


const ApplicationViews = ({isLoggedIn}) => {
  return (
    <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <StarList /> : <Redirect to="/login" />}
        </Route>

        {/* <Route path="/" exact>
          {isLoggedIn ? <VideoList /> : <Redirect to="/login" />}
        </Route> */}

        {/* <Route path="/add">
          {isLoggedIn ? <VideoForm /> : <Redirect to="/login" />}
        </Route> */}

        <Route path="/login">
          <Login />
        </Route>
    </Switch>
  );
};

export default ApplicationViews;