import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, FileSpreadsheet, FileType, FileJson } from 'lucide-react';
import Papa from 'papaparse';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import Axios pour les appels API

const ChatbotInteractionsTable = ({ toast }) => {
  const [chatbotQuestions, setChatbotQuestions] = useState([]); // État pour stocker les données
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données depuis le backend
  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await axios.get('https://vulgarisationdesdroits-b02f.onrender.com/api/chats/liste/'); // Remplacez par l'URL de votre API
        setChatbotQuestions(response.data); // Stocker les données dans l'état
      } catch (err) {
        setError('Erreur lors du chargement des interactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatSessions();
  }, []);

  // Gestion des exports (inchangée)
  const exportToCSV = () => {
    if (chatbotQuestions.length === 0) {
      toast({ title: "Exportation CSV", description: "Aucune donnée à exporter.", variant: "destructive" });
      return;
    }
    const csv = Papa.unparse(chatbotQuestions.map(q => ({
      id: q.session_id,
      question: q.messages[0]?.contenue || 'N/A',
      reponse: q.messages[1]?.contenue || 'N/A',
      timestamp: q.created_at,
      utilisateur: 'Utilisateur inconnu', // Ajoutez un champ utilisateur si nécessaire
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "chatbot_interactions.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Exportation CSV", description: "Rapport CSV téléchargé." });
    } else {
      toast({ title: "Exportation CSV", description: "Le téléchargement direct n'est pas supporté par votre navigateur.", variant: "destructive" });
    }
  };

  // const exportToPDF = () => {
  //   if (chatbotQuestions.length === 0) {
  //     toast({ title: "Exportation PDF", description: "Aucune donnée à exporter.", variant: "destructive" });
  //     return;
  //   }

  //   try {
  //     const doc = new jsPDF();
  //     doc.setFontSize(14);
  //     doc.text("Rapport des Interactions du Chatbot", 14, 16);

  //     // Ajout du tableau avec les données
  //     const truncate = (str, maxLength) => {
  //       if (!str) return 'N/A'; // Retourne 'N/A' si la chaîne est vide ou invalide
  //       return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  //     };

  //     try {
  //       doc.autoTable({
  //         startY: 25,
  //         head: [['Session', 'Question', 'Réponse', 'Timestamp', 'Utilisateur']],
  //         body: chatbotQuestions.map(q => [
  //           q.session_id,
  //           truncate(q.messages[0]?.contenue || 'N/A', 50),
  //           truncate(q.messages[1]?.contenue || 'N/A', 50),
  //           new Date(q.created_at).toLocaleString(),
  //           'Utilisateur inconnu',
  //         ]),
  //         theme: 'striped',
  //         headStyles: { fillColor: [22, 160, 133] },
  //         styles: { fontSize: 10 },
  //         columnStyles: {
  //           0: { cellWidth: 30 },
  //           1: { cellWidth: 50 },
  //           2: { cellWidth: 50 },
  //           3: { cellWidth: 40 },
  //           4: { cellWidth: 40 },
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Erreur lors de la génération du tableau PDF :", error);
  //       toast({ title: "Exportation PDF", description: "Une erreur est survenue lors de la génération du tableau.", variant: "destructive" });
  //       return;
  //     }

  //     // Téléchargement du fichier PDF
  //     doc.save('chatbot_interactions.pdf');
  //     toast({ title: "Exportation PDF", description: "Rapport PDF téléchargé avec succès." });
  //   } catch (error) {
  //     console.error("Erreur lors de l'exportation en PDF :", error);
  //     toast({ title: "Exportation PDF", description: "Une erreur est survenue lors de l'exportation.", variant: "destructive" });
  //   }
  // };

  const exportToExcel = () => {
    if (chatbotQuestions.length === 0) {
      toast({ title: "Exportation Excel", description: "Aucune donnée à exporter.", variant: "destructive" });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(chatbotQuestions.map(q => ({
      ID: q.session_id,
      Question: q.messages[0]?.contenue || 'N/A',
      Réponse: q.messages[1]?.contenue || 'N/A',
      Timestamp: new Date(q.created_at).toLocaleString(),
      Utilisateur: 'Utilisateur inconnu', // Ajoutez un champ utilisateur si nécessaire
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interactions Chatbot");
    XLSX.writeFile(workbook, "chatbot_interactions.xlsx");
    toast({ title: "Exportation Excel", description: "Rapport Excel téléchargé." });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return 'N/A'; // Si le texte est vide ou null
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-xl text-gray-700 flex items-center">
                <MessageCircle className="mr-2 h-6 w-6 text-cyan-500" /> Journal des Interactions du Chatbot
              </CardTitle>
              <CardDescription>Interactions récentes des utilisateurs avec le chatbot.</CardDescription>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" onClick={exportToCSV} className="text-xs">
                <FileSpreadsheet className="mr-1 h-4 w-4" /> CSV
              </Button>
              {/* <Button variant="outline" size="sm" onClick={exportToPDF} className="text-xs">
                <FileType className="mr-1 h-4 w-4" /> PDF
              </Button> */}
              <Button variant="outline" size="sm" onClick={exportToExcel} className="text-xs">
                <FileJson className="mr-1 h-4 w-4" /> Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {chatbotQuestions.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Session</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Réponse</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[150px]">Utilisateur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatbotQuestions.map((log) => (
                    <TableRow key={log.session_id}>
                      <TableCell className="font-medium">{log.session_id}</TableCell>
                      <TableCell title={log.messages[0]?.contenue}>{truncateText(log.messages[0]?.contenue, 50)}</TableCell>
                      <TableCell title={log.messages[1]?.contenue}>{truncateText(log.messages[1]?.contenue, 50)}</TableCell>
                      <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                      <TableCell>Utilisateur inconnu</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">Aucune interaction enregistrée pour le moment.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChatbotInteractionsTable;
