import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routesList from "./routesList";

export function Routers() {
  return (
    <Router>
      <Routes>
        {routesList.map((route, index) => {
          const Component = route.component;
          return (
            <Route key={index} path={route.path} element={<Component />} />
          );
        })}
      </Routes>
    </Router>
  );
}
