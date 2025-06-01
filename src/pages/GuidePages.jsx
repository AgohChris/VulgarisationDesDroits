import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Search, ArrowLeft } from "lucide-react";
import { getRessourcesByType } from '@/api/ressources'; // Import de l'API

const GuidesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [guidesData, setGuidesData] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await getRessourcesByType('guide'); // Appel à l'API
        setGuidesData(response);
        setFilteredGuides(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des guides :', error);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const results = guidesData.filter((guide) =>
      guide.intitule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuides(results);
  }, [searchTerm]);

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" /> Retour
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Guides <span className="gradient-text">Pratiques</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Découvrez nos guides pratiques pour approfondir vos connaissances juridiques.
        </p>
      </motion.div>

      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher un guide..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{guide.intitule}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  onClick={() => handleDownload(guide.upload)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Télécharger
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GuidesPage;