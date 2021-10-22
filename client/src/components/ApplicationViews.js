import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { StarDetail } from "./StarDetail";
import { StarForm } from "./StarForm";
import { StarList } from "./StarList";


const ApplicationViews = ({isLoggedIn}) => {
  return (
    <main>
        <Switch>

            <Route path="/" exact>
            {isLoggedIn ? <StarList /> : <Redirect to="/login" />}
            </Route>
            
            
            <Route path="/star/create" exact>
            {isLoggedIn ? <StarForm /> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/star/:id" exact>
            {isLoggedIn ? <StarDetail /> : <Redirect to="/login" />}
            </Route>

            <Route path="/star/edit/:id" exact>
            {isLoggedIn ? <StarForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/login">
            <Login />
            </Route>

            <Route path="/register">
            <Register />
            </Route>

        </Switch>
    </main>
  );
};

export default ApplicationViews;