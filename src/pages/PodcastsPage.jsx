
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Download, Headphones } from "lucide-react";

const podcastsData = [
  { id: 1, title: "Le droit du travail décrypté", episode: "Épisode 1: Le contrat de travail", duration: "15:30", fileName: "podcast_droit_travail_ep1.mp3" },
  { id: 2, title: "Justice au quotidien", episode: "Focus sur les litiges de voisinage", duration: "22:10",  fileName: "podcast_justice_voisinage.mp3" },
  { id: 3, title: "Les arcanes du droit de la famille", episode: "Le divorce par consentement mutuel", duration: "18:45",  fileName: "podcast_droit_famille_divorce.mp3" },
  { id: 4, title: "Consommation : connaissez vos droits", episode: "Achats en ligne : les pièges à éviter", duration: "20:00", fileName: "podcast_consommation_achats_ligne.mp3" },
  { id: 5, title: "L'actualité juridique en bref", episode: "Les dernières réformes importantes", duration: "12:05", fileName: "podcast_actualite_juridique.mp3" },
];

const PodcastsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handlePlay = (fileName) => {
  //   alert(`Simulation de la lecture de : ${fileName}`);
  // };

  // const handleDownload = (fileName) => {
  //   alert(`Simulation du téléchargement de : ${fileName}`);
  // };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center mb-4">
          <Headphones className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Podcasts <span className="gradient-text">Juridiques</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Écoutez nos experts décrypter le droit pour vous, où que vous soyez.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {podcastsData.map((podcast, index) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{podcast.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{podcast.episode}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-xs text-gray-500">Durée: {podcast.duration}</p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => handlePlay(podcast.fileName)} className="w-full">
                  <PlayCircle className="mr-2 h-4 w-4" /> Écouter
                </Button>
                <Button onClick={() => handleDownload(podcast.fileName)} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
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

export default PodcastsPage;
