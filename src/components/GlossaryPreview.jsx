
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const previewTerms = [
  {
    term: "Abus de droit",
    definition: "Utilisation d'un droit dans le but de nuire à autrui ou d'une manière excessive et déraisonnable.",
    example: "Un propriétaire qui construit un mur très haut uniquement pour bloquer la vue de son voisin."
  },
  {
    term: "Bail",
    definition: "Contrat par lequel une personne (le bailleur) met un bien à disposition d'une autre (le locataire) pour une durée déterminée et moyennant un loyer.",
    example: "Le contrat signé pour louer un appartement."
  },
];

const GlossaryPreview = () => {
  return (
    <section className="py-16 bg-white" id="glossaire-preview">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aperçu du <span className="gradient-text">Glossaire</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quelques termes juridiques expliqués simplement.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {previewTerms.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glossary-item">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  {item.term}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2">
                    <p className="text-gray-700 mb-3">{item.definition}</p>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-blue-800">Exemple :</p>
                      <p className="text-sm text-blue-700">{item.example}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        <div className="text-center mt-12">
          <Link to="/glossaire">
            <Button size="lg">
              Voir tout le glossaire <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GlossaryPreview;
