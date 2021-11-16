import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import DashboardProtectedRoute from "./components/DashboardProtectedRoute";
import { API_URL } from "../config";
import axios from "axios";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

function App() {
    return (
        <Router className="App__container">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    {localStorage.getItem("auth_token") ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Login />
                    )}
                </Route>
                <Route path="/register">
                    {localStorage.getItem("auth_token") ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Register />
                    )}
                </Route>

                <DashboardProtectedRoute
                    basname="/dashboard"
                    path="/dashboard"
                />
            </Switch>
        </Router>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
