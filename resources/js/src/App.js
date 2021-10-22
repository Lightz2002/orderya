import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Recover from "./components/login/Recover";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import { API_URL } from "../config";

import axios from "axios";

axios.defaults.baseURL = { API_URL };
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
    return (
        <Router className="App__container">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/recover">
                    <Recover />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
