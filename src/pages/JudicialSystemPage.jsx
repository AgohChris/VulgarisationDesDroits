
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Scale, Search, Landmark, Info, FileText, ChevronDown } from 'lucide-react';

const JudicialSystemPage = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem('judicialSystemEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      setEntries([
        { 
          id: 1, 
          name: "Cour de Cassation", 
          role: "Juge les décisions des cours d'appel et des tribunaux de première instance, s'assurant de la correcte application de la loi.",
          whenToConsult: "Après une décision d'une cour d'appel, si vous estimez qu'une erreur de droit a été commise. Ne rejuge pas les faits.",
          examples: "Contestation sur l'interprétation d'une loi dans un jugement d'appel ; Vice de procédure majeur."
        },
        { 
          id: 2, 
          name: "Conseil d'État", 
          role: "Conseille le gouvernement et juge les litiges administratifs (conflits avec l'administration).",
          whenToConsult: "Pour contester une décision d'une administration (État, collectivité territoriale, établissement public), ou pour des questions relatives aux fonctionnaires.",
          examples: "Refus d'un permis de construire ; Sanction disciplinaire d'un fonctionnaire ; Contestation d'un impôt."
        },
      ]);
    }
    setIsLoading(false);
  }, []);

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.whenToConsult && entry.whenToConsult.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (entry.examples && entry.examples.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-100 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-4"
          >
            <Scale className="h-12 w-12 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          >
            Le Système Judiciaire Expliqué
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez les différentes entités du système judiciaire, leurs rôles, et quand vous adresser à elles pour résoudre vos problématiques.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-10 max-w-xl mx-auto"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher une entité, un rôle, un problème..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">Chargement des informations...</p>
          </div>
        ) : filteredEntries.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredEntries.map((entry) => (
              <motion.div key={entry.id} variants={itemVariants}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border-transparent bg-white/90 backdrop-blur-md">
                  <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="flex items-center text-blue-600 mb-2">
                       <Landmark className="h-8 w-8 mr-3 shrink-0" />
                       <CardTitle className="text-2xl font-semibold text-gray-800">{entry.name}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-700 text-base leading-relaxed">
                      {entry.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible value={activeAccordionItem} onValueChange={setActiveAccordionItem}>
                      <AccordionItem value={`when-${entry.id}`} className="border-b-0">
                        <AccordionTrigger className="text-lg font-medium text-indigo-700 hover:text-indigo-800 py-3 px-0 [&[data-state=open]>svg]:text-indigo-700">
                          <div className="flex items-center">
                            <Info className="h-5 w-5 mr-2 shrink-0" /> Quand consulter cette entité ?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-gray-600 text-sm leading-relaxed">
                          {entry.whenToConsult || "Informations non disponibles."}
                        </AccordionContent>
                      </AccordionItem>
                      {entry.examples && (
                        <AccordionItem value={`examples-${entry.id}`} className="border-b-0">
                          <AccordionTrigger className="text-lg font-medium text-green-700 hover:text-green-800 py-3 px-0 [&[data-state=open]>svg]:text-green-700">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 shrink-0" /> Exemples concrets
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            {entry.examples}
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <img alt="Aucun résultat trouvé" className="mx-auto mb-6 w-40 h-40 opacity-70" src="https://images.unsplash.com/photo-1682624400764-d2c9eaeae972" />
            <p className="text-2xl font-semibold text-gray-700 mb-2">Aucune entité trouvée</p>
            <p className="text-gray-500">Essayez d'affiner vos termes de recherche ou explorez d'autres sections.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default JudicialSystemPage;
