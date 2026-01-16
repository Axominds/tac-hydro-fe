import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./routes/Home/Home";
import { AboutUs } from "./routes/AboutUs/AboutUs";
import { OrganizationChart } from "./routes/AboutUs/screens/OrganizationChart";
import { ProfessionalFramework } from "./routes/AboutUs/screens/ProfessionalFramework";
import { OurTeam } from "./routes/AboutUs/screens/OurTeam";
import { Galleries } from "./routes/Galleries/Galleries";
import { Projects } from "./routes/Projects/Projects";
import { Services } from "./routes/Services/Services";
import { ContactUs } from "./routes/ContactUs/ContactUs";
import { ServiceDetail } from "./routes/ServiceDetail/ServiceDetail";

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

export const App = () => {
  return (
    <Router>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-us/our-organization-chart" element={<OrganizationChart />} />
        <Route path="/about-us/our-professional-framework" element={<ProfessionalFramework />} />
        <Route path="/about-us/our-team" element={<OurTeam />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-detial" element={<ServiceDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};
