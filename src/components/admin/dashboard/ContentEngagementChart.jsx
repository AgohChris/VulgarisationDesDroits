
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

const contentEngagementData = [
  { name: 'Glossaire', views: 4000, interactions: 2400 },
  { name: 'Thématiques', views: 3000, interactions: 1398 },
  { name: 'Guides', views: 2000, interactions: 9800 },
  { name: 'Podcasts', views: 2780, interactions: 3908 },
  { name: 'Fiches', views: 1890, interactions: 4800 },
];

const ContentEngagementChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }} // Adjusted delay
    >
      <Card className="shadow-lg rounded-xl">
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
                 contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
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
  );
};

export default ContentEngagementChart;
