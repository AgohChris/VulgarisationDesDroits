
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scale, Landmark, Info } from 'lucide-react';

const JudicialSystemPreview = () => {
  const [previewEntries, setPreviewEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedEntries = localStorage.getItem('judicialSystemEntries');
    if (savedEntries) {
      const allEntries = JSON.parse(savedEntries);
      setPreviewEntries(allEntries.slice(0, 3)); 
    } else {
      setPreviewEntries([
        { id: 1, name: "Cour de Cassation", role: "Juge les décisions des cours d'appel...", whenToConsult: "Après une décision d'une cour d'appel..." },
        { id: 2, name: "Conseil d'État", role: "Conseille le gouvernement et juge les litiges...", whenToConsult: "Pour contester une décision d'une administration..." },
        { id: 3, name: "Tribunal Judiciaire", role: "Compétent pour la plupart des litiges civils...", whenToConsult: "Pour la majorité des conflits entre particuliers..." }
      ]);
    }
    setIsLoading(false);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">Chargement du système judiciaire...</p>
        </div>
      </section>
    );
  }

  if (previewEntries.length === 0) {
    return null; 
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Scale className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprendre le <span className="gradient-text">Système Judiciaire</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un aperçu des principales institutions, leurs fonctions et quand les consulter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewEntries.map((entry, index) => (
            <motion.custom
              key={entry.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              component={Card}
              className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border-transparent bg-white/70 backdrop-blur-sm flex flex-col"
            >
              <CardHeader className="p-6">
                <div className="flex items-center text-indigo-600 mb-2">
                  <Landmark className="h-7 w-7 mr-3 shrink-0" />
                  <CardTitle className="text-xl font-semibold text-gray-800">{entry.name}</CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-sm line-clamp-2">
                  {entry.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <div className="mt-2">
                  <h4 className="text-xs font-semibold text-indigo-500 mb-1 flex items-center">
                    <Info size={14} className="mr-1 shrink-0" /> QUAND CONSULTER ?
                  </h4>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {entry.whenToConsult}
                  </p>
                </div>
              </CardContent>
            </motion.custom>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: previewEntries.length * 0.15 + 0.2 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r bg-ivory-green text-white px-4 py-2 rounded-r-md hover:bg-ivory-orange hover:opacity-90 transition-opacity">
            <Link to="/systeme-judiciaire">Explorer le Système Judiciaire Complet</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default JudicialSystemPreview;
