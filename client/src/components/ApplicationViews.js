import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { StarDetail } from "./StarDetail";
import  StarForm  from "./StarForm";
import { StarList } from "./StarList";
import { PlanetDetail } from "./PlanetDetail";
import  PlanetForm  from "./PlanetForm";
import { MoonDetail } from "./MoonDetail";
import  MoonForm  from "./MoonForm";
import PlanetDetailForm from "./PlanetDetailForm";


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

            <Route path="/star/edit/:id" exact>
            {isLoggedIn ? <StarForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/star/:id" exact>
            {isLoggedIn ? <StarDetail /> : <Redirect to="/login" />}
            </Route>

            <Route path="/planet/create" exact>
            {isLoggedIn ? <PlanetForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/planet/edit/:id" exact>
            {isLoggedIn ? <PlanetForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/planet/notes/:id" exact>
            {isLoggedIn ? <PlanetDetailForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/planet/:id" exact>
            {isLoggedIn ? <PlanetDetail /> : <Redirect to="/login" />}
            </Route>

            <Route path="/moon/create" exact>
            {isLoggedIn ? <MoonForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/moon/edit/:id" exact>
            {isLoggedIn ? <MoonForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/moon/:id" exact>
            {isLoggedIn ? <MoonDetail /> : <Redirect to="/login" />}
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