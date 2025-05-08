
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ThematicSection from "@/components/ThematicSection";

const ThematicPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Attendre que les onglets soient potentiellement rendus
        setTimeout(() => {
          const tabTrigger = document.querySelector(`button[data-state][value="${id}"]`);
          if (tabTrigger && tabTrigger.getAttribute('data-state') !== 'active') {
             tabTrigger.click();
          }
          // Scroll après avoir potentiellement changé d'onglet
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100); 
        }, 0);
      }
    } else {
       window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ThematicSection />
    </div>
  );
};

export default ThematicPage;
