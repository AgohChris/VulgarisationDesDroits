
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Resources from "@/components/Resources";

const ResourcesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Resources />
    </div>
  );
};

export default ResourcesPage;
