
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateToGlossary = () => {
    navigate("/glossaire");
  };

  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Le droit <span className="gradient-text">accessible</span> à tous
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Nous simplifions les textes juridiques pour les rendre compréhensibles par tous les citoyens, quels que soient leur niveau d'éducation ou leurs capacités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="px-6 py-3 text-base" 
                size="lg"
                onClick={handleScrollToFeatures}
              >
                Découvrir <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 text-base" 
                size="lg"
                onClick={handleNavigateToGlossary}
              >
                Consulter le glossaire
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <div className="relative">
              <img  alt="Personne consultant des documents juridiques avec des icônes de vulgarisation et d'inclusion" className="rounded-lg shadow-xl" src="https://i.postimg.cc/gjLFmvcM/Chat-GPT-Image-12-mai-2025-a-21-59-22.png" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-48"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Vulgarisation</p>
                    <p className="text-sm text-gray-600">Termes simplifiés</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-48"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Inclusion</p>
                    <p className="text-sm text-gray-600">Pour tous</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
