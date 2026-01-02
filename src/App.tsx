import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage as MainHomepage } from "./screens/Homepage";
import { Homepage as AboutUsHomepage } from "./routes/Homepage/screens/Homepage";
import { Gallery } from "./routes/Gallery/screens/Gallery";
import { Projects } from "./routes/Projects/screens/Projects";
import { Services } from "./routes/Services/screens/Services";
import { Contact } from "./routes/Contact/screens/Contact";

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomepage />} />
        <Route path="/about" element={<AboutUsHomepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};
