
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, Headphones, BookOpen, ArrowRight } from "lucide-react";

const resourcesData = [
  {
    id: "guides",
    title: "Guides pratiques",
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    description: "Documents PDF téléchargeables expliquant les démarches juridiques courantes.",
    resources: [
      { title: "Guide du locataire", type: "PDF" },
      { title: "Vos droits en cas de licenciement", type: "PDF" },
      { title: "Comment contester une amende", type: "PDF" }
    ],
    delay: 0.1,
    internalPath: "/ressources/guides" 
  },
  {
    id: "videos",
    title: "Vidéos explicatives",
    icon: <Video className="h-10 w-10 text-red-600" />,
    description: "Courtes vidéos pédagogiques sur différents aspects du droit.",
    resources: [
      { title: "Les bases du droit du travail", type: "Vidéo" },
      { title: "Comprendre le divorce", type: "Vidéo" },
      { title: "Vos droits face à la police", type: "Vidéo" }
    ],
    delay: 0.2,
    externalUrl: "https://www.youtube.com/channel/VOTRE_CHAINE" 
  },
  {
    id: "podcasts",
    title: "Podcasts juridiques",
    icon: <Headphones className="h-10 w-10 text-purple-600" />,
    description: "Émissions audio pour comprendre le droit en écoutant.",
    resources: [
      { title: "Le droit au quotidien", type: "Audio" },
      { title: "Histoires de justice", type: "Audio" },
      { title: "Décryptage juridique", type: "Audio" }
    ],
    delay: 0.3,
    internalPath: "/ressources/podcasts" 
  },
  {
    id: "fiches",
    title: "Fiches thématiques",
    icon: <BookOpen className="h-10 w-10 text-green-600" />,
    description: "Documents synthétiques sur des sujets juridiques spécifiques.",
    resources: [
      { title: "Les droits des consommateurs", type: "Fiche" },
      { title: "Succession et héritage", type: "Fiche" },
      { title: "Créer une entreprise", type: "Fiche" }
    ],
    delay: 0.4,
    internalPath: "/ressources/fiches" 
  }
];

const Resources = () => {
  return (
    <section className="py-16 bg-slate-50" id="ressources-component">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explorez nos <span className="gradient-text">Ressources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plongez dans nos contenus juridiques conçus pour vous éclairer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resourcesData.map((resource, index) => (
            <motion.div
              key={index}
              id={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: resource.delay }}
            >
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 flex justify-center">{resource.icon}</div>
                  <CardTitle className="text-center">{resource.title}</CardTitle>
                  <CardDescription className="text-base text-center h-20 overflow-hidden">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <div className="mt-6">
                    {resource.internalPath ? (
                      <Link to={resource.internalPath} className="w-full">
                        <Button variant="outline" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                          Explorer <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <a 
                        href={resource.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600">
                          Voir les vidéos <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
