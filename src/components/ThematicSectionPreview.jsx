
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Home, Briefcase, Users } from "lucide-react";

const previewThematics = [
  {
    title: "Droit du logement",
    icon: <Home className="h-8 w-8 text-blue-600" />,
    description: "Vos droits et obligations en tant que locataire ou propriétaire.",
    link: "/thematiques#logement",
    delay: 0.1
  },
  {
    title: "Droit du travail",
    icon: <Briefcase className="h-8 w-8 text-green-600" />,
    description: "Comprendre votre contrat, vos congés, et les procédures de licenciement.",
    link: "/thematiques#travail",
    delay: 0.2
  },
  {
    title: "Droit de la famille",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    description: "Les aspects juridiques du mariage, divorce, et de l'autorité parentale.",
    link: "/thematiques#famille",
    delay: 0.3
  }
];

const ThematicSectionPreview = () => {
  return (
    <section className="py-16 bg-gray-50" id="thematiques-preview">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Découvrez nos <span className="gradient-text">Thématiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez des domaines clés du droit expliqués clairement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewThematics.map((thematic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: thematic.delay }}
            >
              <Card className="feature-card h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{thematic.icon}</div>
                  <CardTitle>{thematic.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{thematic.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link to={thematic.link}>
                    <Button variant="outline" className="w-full">
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/thematiques">
            <Button size="lg">
              Voir toutes les thématiques <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThematicSectionPreview;
