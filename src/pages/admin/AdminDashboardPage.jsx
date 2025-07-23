import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, BookOpen, ListTree, Mail, MessageCircle, Download, FileSpreadsheet, FileType, FileJson, Scale, Library, ListChecks } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios'; // Importer Axios pour les appels API
import { fetchJudicialSystemCount } from '@/api/structureJudicial';
import { fetchCategoryCount } from '@/api/categorieDroit';
import { fetchSubjectCount } from '@/api/sujetDroit';
import { fetchGlossaryCount } from '@/api/glossary';
// import { fetchCountRessources } from '@/api/ressources';


import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import DailyVisitorsChart from '@/components/admin/dashboard/DailyVisitorsChart';
import ContentEngagementChart from '@/components/admin/dashboard/ContentEngagementChart';
import ChatbotInteractionsTable from '@/components/admin/dashboard/ChatbotInteractionsTable';

const initialChatbotQuestions = [
  { id: 1, question: "Quels sont mes droits en tant que locataire ?", timestamp: "2025-05-10 10:30:00", user: "Utilisateur A" },
  { id: 2, question: "Comment fonctionne le préavis de départ ?", timestamp: "2025-05-10 11:15:00", user: "Utilisateur B" },
  { id: 3, question: "Information sur le droit du travail", timestamp: "2025-05-11 09:00:00", user: "Utilisateur C" },
  { id: 4, question: "Procédure de divorce", timestamp: "2025-05-11 14:20:00", user: "Utilisateur D" },
  { id: 5, question: "Aide pour contrat de bail", timestamp: "2025-05-12 08:05:00", user: "Utilisateur E" },
];

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const [chatbotQuestions, setChatbotQuestions] = useState([]);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('chatbotInteractions');
    if (storedQuestions) {
      setChatbotQuestions(JSON.parse(storedQuestions));
    } else {
      setChatbotQuestions(initialChatbotQuestions); 
      localStorage.setItem('chatbotInteractions', JSON.stringify(initialChatbotQuestions));
    }

    const fetchStats = async () => {
      try {
        // Récupérer le nombre d'interactions depuis le backend
        const interactionResponse = await axios.get('@https://vulgarisationdesdroits-b02f.onrender.com/api/chatbot/interactions/count/');
        const interactionCount = interactionResponse.data.interaction_count;

        // Récupérer le nombre d'abonnés à la newsletter depuis le backend
        const newsletterResponse = await axios.get('@https://vulgarisationdesdroits-b02f.onrender.com/api/newsletter/abonnee/count/');
        const newsletterSubscribersCount = newsletterResponse.data.subscriber_count;
        
        const judicialSystemCount = await fetchJudicialSystemCount();
        console.log("Nombre de structures judiciaires :", judicialSystemCount); // Debug
        

        // Récupérer d'autres statistiques depuis localStorage
        const glossaryCount = await fetchGlossaryCount();
        // const resourcesCount = await fetchCountRessources();

        // Récupérer le nombre de catégories de droit
        const categoryCount = await fetchCategoryCount();

        // Récupérer le nombre de sujets de droit
        const subjectCount = await fetchSubjectCount();


        // Mettre à jour les données des statistiques
        setStatsData([
          { title: 'Termes du Glossaire', value: glossaryCount, icon: BookOpen, color: 'text-blue-500', bgColor: 'bg-blue-100/50' },
          // { title: 'Thématiques', value: thematicsCount, icon: ListTree, color: 'text-green-500', bgColor: 'bg-green-100/50' },
          { title: 'Catégories de Droit', value: categoryCount, icon: Library, color: 'text-purple-500', bgColor: 'bg-purple-100/50' },
          { title: 'Sujets de Droit', value: subjectCount, icon: ListChecks, color: 'text-teal-500', bgColor: 'bg-teal-100/50' },
          // { title: 'Ressources Actives', value: resourcesCount, icon: FileText, color: 'text-indigo-500', bgColor: 'bg-indigo-100/50' },
          { title: 'Système Judiciaire', value: judicialSystemCount, icon: Scale, color: 'text-pink-500', bgColor: 'bg-pink-100/50' },
          { title: 'Abonnés Newsletter', value: newsletterSubscribersCount, icon: Mail, color: 'text-orange-500', bgColor: 'bg-orange-100/50' },
          { title: 'Interactions Chatbot', value: interactionCount, icon: MessageCircle, color: 'text-cyan-500', bgColor: 'bg-cyan-100/50' },
        ]);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        toast({ title: 'Erreur', description: 'Impossible de récupérer les statistiques.', variant: 'destructive' });
      }
    };

    fetchStats();
  }, []);


  return (
    <div className="container mx-auto py-8 space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800"
      >
        Tableau de Bord Administrateur
      </motion.h1>

      <DashboardStats stats={Array.isArray(statsData) ? statsData : []} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyVisitorsChart />
        <ContentEngagementChart />
      </div>

      <ChatbotInteractionsTable chatbotQuestions={chatbotQuestions} toast={toast} />

    </div>
  );
};

export default AdminDashboardPage;
