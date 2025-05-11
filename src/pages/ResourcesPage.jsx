
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
       <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 pt-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nos <span className="gradient-text">Ressources Pédagogiques</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Découvrez une mine d'informations juridiques accessibles, conçues pour vous aider à comprendre vos droits et obligations.
        </p>
      </motion.div>
      <Resources />
    </div>
  );
};

export default ResourcesPage;
