
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, Headphones } from "lucide-react";

const previewResources = [
  {
    title: "Guides pratiques",
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    description: "PDF téléchargeables sur les démarches courantes.",
    delay: 0.1
  },
  {
    title: "Vidéos explicatives",
    icon: <Video className="h-10 w-10 text-red-600" />,
    description: "Courtes vidéos pédagogiques sur le droit.",
    delay: 0.2
  },
  {
    title: "Podcasts juridiques",
    icon: <Headphones className="h-10 w-10 text-purple-600" />,
    description: "Émissions audio pour comprendre le droit.",
    delay: 0.3
  }
];

const ResourcesPreview = () => {
  return (
    <section className="py-16 bg-white" id="ressources-preview">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos <span className="gradient-text">Ressources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contenus variés pour apprendre le droit selon vos préférences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: resource.delay }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">{resource.icon}</div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{resource.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/ressources">
            <Button size="lg">
              Voir toutes les ressources <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
