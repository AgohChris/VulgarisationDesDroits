import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchGlossaries } from "@/api/glossary";

const Glossary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [glossaryTerms, setGlossaryTerms] = useState([]);

  useEffect(() => {
    const loadGlossaries = async () => {
      const data = await fetchGlossaries();
      setGlossaryTerms(data);
    };
    loadGlossaries();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const filteredTerms = glossaryTerms.filter(item => 
    item.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.exemple.toLowerCase().includes(searchTerm.toLowerCase())
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
            {Array.isArray(filteredTerms) && filteredTerms.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glossary-item">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  {item.titre}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2">
                    <p className="text-gray-700 mb-3">{item.description}</p>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-blue-800">Exemple :</p>
                      <p className="text-sm text-blue-700">{item.exemple}</p>
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
