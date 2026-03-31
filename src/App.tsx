import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./routes/Home/Home";
import { AboutUs } from "./routes/AboutUs/AboutUs";
import { OurTeam } from "./routes/AboutUs/OurTeam";
import { OrganizationChart } from "./routes/AboutUs/OrganizationChart";
import { CorePrinciples } from "./routes/AboutUs/CorePrinciples";
import { Galleries } from "./routes/Galleries/Galleries";
import { Projects } from "./routes/Projects/Projects";
import { Services } from "./routes/Services/Services";
import { ContactUs } from "./routes/ContactUs/ContactUs";
import { Collaboration } from "./routes/ContactUs/Collaboration";
import { NewsDetail } from "./routes/News/NewsDetail";

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
        <Route path="/about-us/our-team" element={<OurTeam />} />
        <Route path="/about-us/our-organization-chart" element={<OrganizationChart />} />
        <Route path="/about-us/our-core-principles" element={<CorePrinciples />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/contact-us/collaboration" element={<Collaboration />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
};
