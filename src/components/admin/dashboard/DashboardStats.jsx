
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Reduced delay for faster appearance
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.custom
          key={stat.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          component={Card}
          className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${stat.bgColor} border-none backdrop-blur-sm rounded-xl`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </CardContent>
        </motion.custom>
      ))}
    </div>
  );
};

export default DashboardStats;
