import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCategoriesWithSubjects } from "@/api/categorieDroit";

const ThematicSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoriesWithSubjects();
        setCategories(data); // Stocker les catégories avec leurs sujets
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50" id="thematiques">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explorez par <span className="gradient-text">thématiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les informations juridiques organisées par domaines pour faciliter votre recherche.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {categories.map((category) => (
            <Card key={category.id} className="mb-8">
              <CardHeader>
                <CardTitle>{category.nom}</CardTitle>
                <CardDescription>{category.description || "Aucune description disponible."}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.sujets.map((subject) => (
                    <li key={subject.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                      <h4 className="text-lg font-medium">{subject.intitule}</h4>
                      <p className="text-gray-700">{subject.descriptif || "Aucune description disponible."}</p>
                      {subject.complement && ( // Affiche le complément uniquement s'il existe
                        <p className="text-sm text-gray-500 italic">Complément: {subject.complement}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThematicSection;
