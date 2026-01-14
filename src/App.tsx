import React, { JSX, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home } from "./routes/Home/screens/Home";
import { AboutUs } from "./routes/AboutUs/screens/AboutUs";
import { Galleries } from "./routes/Galleries/screens/Galleries";
import { Projects } from "./routes/Projects/screens/Projects";
import { Services } from "./routes/Services/screens/Services";
import { ContactUs } from "./routes/ContactUs/screens/ContactUs";
import { ServiceDetail } from "./routes/ServiceDetail/screens/ServiceDetail";

const ScrollManager = (): null => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let targetId = "";

    if (location.hash) {
      targetId = decodeURIComponent(location.hash.replace("#", ""));
    } else if (location.pathname === "/services" && params.get("sector")) {
      targetId = "services-filter";
    } else if (location.pathname === "/galleries" && params.get("year")) {
      targetId = "galleries-filter";
    }

    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export const App = (): JSX.Element => {
  return (
    <Router>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-detial" element={<ServiceDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};
