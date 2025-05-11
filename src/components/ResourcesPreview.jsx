
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Video, Headphones, BookOpen, ExternalLink } from "lucide-react";

const previewResources = [
  {
    id: "guides",
    title: "Guides pratiques",
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    description: "PDF téléchargeables sur les démarches courantes.",
    delay: 0.1,
    path: "/ressources/guides"
  },
  {
    id: "videos",
    title: "Vidéos explicatives",
    icon: <Video className="h-10 w-10 text-red-600" />,
    description: "Courtes vidéos pédagogiques sur le droit.",
    delay: 0.2,
    externalUrl: "https://www.youtube.com"
  },
  {
    id: "podcasts",
    title: "Podcasts juridiques",
    icon: <Headphones className="h-10 w-10 text-purple-600" />,
    description: "Émissions audio pour comprendre le droit.",
    delay: 0.3,
    path: "/ressources/podcasts"
  },
   {
    id: "fiches",
    title: "Fiches thématiques",
    icon: <BookOpen className="h-10 w-10 text-green-600" />,
    description: "Documents synthétiques sur des sujets juridiques.",
    delay: 0.4,
    path: "/ressources/fiches"
  }
];

const ResourcesPreview = () => {
  return (
    <section className="py-16 bg-slate-100" id="ressources-preview">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aperçu de nos <span className="gradient-text">Ressources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-uns de nos contenus conçus pour vous éclairer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {previewResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: resource.delay }}
            >
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 flex justify-center">{resource.icon}</div>
                  <CardTitle className="text-center">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-center h-16 overflow-hidden">{resource.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  {resource.path ? (
                    <Link to={resource.path} className="w-full">
                      <Button variant="outline" className="w-full">
                        Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : resource.externalUrl ? (
                     <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full">
                            Voir les vidéos <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                     </a>
                  ) : null}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/ressources">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
              Voir toutes les ressources <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
