
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BookOpen, ListTree, BarChart3 } from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Termes du Glossaire', value: '75', icon: BookOpen, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { title: 'Thématiques', value: '6', icon: ListTree, color: 'text-green-500', bgColor: 'bg-green-100' },
    { title: 'Guides Pratiques', value: '12', icon: FileText, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { title: 'Visiteurs (30j)', value: '1,250', icon: Users, color: 'text-red-500', bgColor: 'bg-red-100' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        Tableau de Bord Administrateur
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.custom
            key={stat.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            component={Card}
            className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${stat.bgColor}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">Donnée indicative</p>
            </CardContent>
          </motion.custom>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <BarChart3 className="h-6 w-6 mr-2 text-indigo-500" />
              Activité Récente (Simulation)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Cette section affichera prochainement un graphique de l'activité du site ou des actions récentes.
            </p>
            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Données graphiques à venir</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>- Nouveau terme "Contrat synallagmatique" ajouté au glossaire.</li>
                <li>- Fiche thématique "Le Droit de Rétractation" mise à jour.</li>
                <li>- 5 nouveaux inscrits à la newsletter.</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
