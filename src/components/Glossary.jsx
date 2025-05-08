
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const glossaryTerms = [
  {
    term: "Abus de droit",
    definition: "Utilisation d'un droit dans le but de nuire à autrui ou d'une manière excessive et déraisonnable.",
    example: "Un propriétaire qui construit un mur très haut uniquement pour bloquer la vue de son voisin."
  },
  {
    term: "Acquiescement",
    definition: "Acceptation expresse ou tacite d'une décision de justice, qui entraîne renonciation aux voies de recours.",
    example: "Payer volontairement une amende sans contester l'infraction."
  },
  {
    term: "Assignation",
    definition: "Acte de procédure par lequel une personne est convoquée devant un tribunal.",
    example: "Recevoir un document officiel vous demandant de vous présenter au tribunal à une date précise."
  },
  {
    term: "Ayant droit",
    definition: "Personne qui tient son droit d'une autre personne, notamment par succession.",
    example: "Les enfants qui héritent des biens de leurs parents décédés."
  },
  {
    term: "Bail",
    definition: "Contrat par lequel une personne (le bailleur) met un bien à disposition d'une autre (le locataire) pour une durée déterminée et moyennant un loyer.",
    example: "Le contrat signé pour louer un appartement."
  },
  {
    term: "Casier judiciaire",
    definition: "Registre où sont inscrites les condamnations pénales prononcées contre une personne.",
    example: "Un employeur peut demander un extrait de casier judiciaire pour certains emplois sensibles."
  },
  {
    term: "Comparution",
    definition: "Fait de se présenter devant un juge ou un tribunal.",
    example: "Se rendre au tribunal le jour indiqué sur la convocation."
  },
  {
    term: "Délibéré",
    definition: "Phase durant laquelle les juges réfléchissent et discutent entre eux avant de rendre leur décision.",
    example: "Après avoir entendu toutes les parties, le tribunal s'est retiré pour délibérer."
  }
];

const Glossary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const filteredTerms = glossaryTerms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.example.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      setSearchParams({ q: newSearchTerm });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section className="py-16 bg-white" id="glossaire">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Glossaire <span className="gradient-text">juridique</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprendre les termes juridiques en langage simple et accessible.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher un terme juridique..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full" defaultValue={filteredTerms.length > 0 && searchTerm ? "item-0" : undefined}>
            {filteredTerms.map((item, index) => (
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

          {filteredTerms.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun terme ne correspond à votre recherche "{searchTerm}".</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Glossary;
