import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Homepage as MainHomepage } from "./screens/Homepage";
import { Homepage as AboutUsHomepage } from "./routes/Homepage/screens/Homepage";
import { Gallery } from "./routes/Gallery/screens/Gallery";
import { Projects } from "./routes/Projects/screens/Projects";
import { Services } from "./routes/Services/screens/Services";
import { Contact } from "./routes/Contact/screens/Contact";
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
    } else if (location.pathname === "/gallery" && params.get("year")) {
      targetId = "gallery-filter";
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
        <Route path="/" element={<MainHomepage />} />
        <Route path="/about" element={<AboutUsHomepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-detial" element={<ServiceDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};
