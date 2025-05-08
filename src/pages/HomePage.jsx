
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GlossaryPreview from "@/components/GlossaryPreview"; 
import ThematicSectionPreview from "@/components/ThematicSectionPreview";
import ResourcesPreview from "@/components/ResourcesPreview";

const HomePage = () => {
  const navigate = useNavigate();

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero />
      <Features />
      <GlossaryPreview />
      <ThematicSectionPreview />
      <ResourcesPreview />
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'aide pour comprendre vos droits ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre plateforme est conçue pour vous aider à naviguer dans le monde juridique avec confiance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/glossaire")}
              className="bg-white text-blue-600 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Commencer maintenant
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToFeatures}
              className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all"
            >
              En savoir plus
            </motion.button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;
