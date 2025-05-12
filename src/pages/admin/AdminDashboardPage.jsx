
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BookOpen, ListTree, BarChart3, TrendingUp, Mail } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const dailyVisitorsData = [
  { day: 'Lun', visitors: 65 },
  { day: 'Mar', visitors: 59 },
  { day: 'Mer', visitors: 80 },
  { day: 'Jeu', visitors: 81 },
  { day: 'Ven', visitors: 56 },
  { day: 'Sam', visitors: 95 },
  { day: 'Dim', visitors: 110 },
];

const contentEngagementData = [
  { name: 'Glossaire', views: 4000, interactions: 2400 },
  { name: 'Thématiques', views: 3000, interactions: 1398 },
  { name: 'Guides', views: 2000, interactions: 9800 },
  { name: 'Podcasts', views: 2780, interactions: 3908 },
  { name: 'Fiches', views: 1890, interactions: 4800 },
];


const AdminDashboardPage = () => {
  const stats = [
    { title: 'Termes du Glossaire', value: '75', icon: BookOpen, color: 'text-blue-500', bgColor: 'bg-blue-100/50' },
    { title: 'Thématiques', value: '6', icon: ListTree, color: 'text-green-500', bgColor: 'bg-green-100/50' },
    { title: 'Ressources Actives', value: '28', icon: FileText, color: 'text-purple-500', bgColor: 'bg-purple-100/50' },
    { title: 'Abonnés Newsletter', value: '350', icon: Mail, color: 'text-orange-500', bgColor: 'bg-orange-100/50' },
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
            className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${stat.bgColor} border-none backdrop-blur-sm`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">Donnée indicative</p>
            </CardContent>
          </motion.custom>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700">
                <TrendingUp className="h-6 w-6 mr-2 text-indigo-500" />
                Visiteurs Journaliers (Semaine en cours)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyVisitorsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#666' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                    itemStyle={{ color: '#333' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} name="Visiteurs" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700">
                <BarChart3 className="h-6 w-6 mr-2 text-teal-500" />
                Engagement par Type de Contenu
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentEngagementData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                     itemStyle={{ color: '#333' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Bar dataKey="views" fill="#82ca9d" name="Vues" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interactions" fill="#8884d8" name="Interactions" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
