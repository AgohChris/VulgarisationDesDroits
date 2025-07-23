import React, { useState, useEffect } from 'react';
import { fetchStructures } from '@/api/structureJudicial';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Scale, Search } from 'lucide-react';

const JudicialSystemPage = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStructures = async () => {
      try {
        const data = await fetchStructures();
        setEntries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des structures judiciaires :", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStructures();
  }, []);

  const filteredEntries = (Array.isArray(entries) ? entries : []).filter(entry =>
    entry.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-100 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-800 mb-4"
          >
            Le Système Judiciaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez les différentes structures judiciaires et leurs rôles.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xl mx-auto"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher une structure..."
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
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <CardTitle className="text-2xl font-semibold text-gray-800">{entry.nom}</CardTitle>
                  <CardDescription className="text-gray-700 text-base leading-relaxed">
                    {entry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm">exemple : {entry.exemple}</p> {/* Ajoutez l'exemple */}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">Aucune structure trouvée.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JudicialSystemPage;
