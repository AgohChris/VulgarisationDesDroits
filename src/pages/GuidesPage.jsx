
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";

const guidesData = [
  { id: 1, title: "Guide complet du locataire", description: "Tout savoir sur vos droits et devoirs en tant que locataire.", type: "PDF", fileName: "guide_locataire_complet.pdf" },
  { id: 2, title: "Vos droits en cas de licenciement abusif", description: "Comprendre les recours possibles face à un licenciement injustifié.", type: "PDF", fileName: "droits_licenciement_abusif.pdf" },
  { id: 3, title: "Comment contester une amende routière", description: "Les étapes clés pour une contestation efficace.", type: "PDF", fileName: "contester_amende_routiere.pdf" },
  { id: 4, title: "Guide de la création d'entreprise", description: "Les démarches essentielles pour lancer votre activité.", type: "PDF", fileName: "guide_creation_entreprise.pdf" },
  { id: 5, title: "Comprendre le contrat de travail", description: "Les clauses importantes et ce qu'elles impliquent.", type: "PDF", fileName: "comprendre_contrat_travail.pdf" },
];

const GuidesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleDownload = (fileName) => {
  //   alert(`Simulation du téléchargement de : ${fileName}`);
  // };

  // const handlePreview = (fileName) => {
  //   alert(`Simulation de la prévisualisation de : ${fileName}`);
  // };

  return (
    <div className="container mx-auto px-4 py-12">
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
          Téléchargez nos guides détaillés pour vous accompagner dans vos démarches juridiques.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guidesData.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 h-16 overflow-hidden">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-xs text-gray-500">Type: {guide.type} </p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => handlePreview(guide.fileName)} className="w-full">
                  <Eye className="mr-2 h-4 w-4" /> Consulter
                </Button>
                <Button onClick={() => handleDownload(guide.fileName)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="mr-2 h-4 w-4" /> Télécharger
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
