import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./Components/Login/Login"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));

export default (
    <Suspense fallback={<></>}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </Suspense>
);
