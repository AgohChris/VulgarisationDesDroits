
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const dailyVisitorsData = [
  { day: 'Lun', visitors: 65 },
  { day: 'Mar', visitors: 59 },
  { day: 'Mer', visitors: 80 },
  { day: 'Jeu', visitors: 81 },
  { day: 'Ven', visitors: 56 },
  { day: 'Sam', visitors: 95 },
  { day: 'Dim', visitors: 110 },
];

const DailyVisitorsChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }} // Adjusted delay
    >
      <Card className="shadow-lg rounded-xl">
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
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                itemStyle={{ color: '#333' }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} name="Visiteurs" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyVisitorsChart;
