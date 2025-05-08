
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, Headphones, BookOpen } from "lucide-react";

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
    delay: 0.1
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
    delay: 0.2
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
    delay: 0.3
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
    delay: 0.4
  }
];

const Resources = () => {
  return (
    <section className="py-16 bg-white" id="ressources">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ressources <span className="gradient-text">pédagogiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des contenus variés pour apprendre et comprendre le droit selon vos préférences.
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
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{resource.icon}</div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription className="text-base">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 flex-grow">
                    {resource.resources.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between border-b pb-2">
                        <span>{item.title}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{item.type}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link to={`/ressources#${resource.id}`}>
                      <Button variant="outline" className="w-full">
                        Voir ces ressources <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
