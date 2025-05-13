
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, FileSpreadsheet, FileType, FileJson } from 'lucide-react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ChatbotInteractionsTable = ({ chatbotQuestions, toast }) => {

  const exportToCSV = () => {
    if (chatbotQuestions.length === 0) {
      toast({ title: "Exportation CSV", description: "Aucune donnée à exporter.", variant: "destructive" });
      return;
    }
    const csv = Papa.unparse(chatbotQuestions.map(q => ({id: q.id, question: q.question, reponse: q.answer, timestamp: q.timestamp, utilisateur: q.user })));
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

  const exportToPDF = () => {
    if (chatbotQuestions.length === 0) {
      toast({ title: "Exportation PDF", description: "Aucune donnée à exporter.", variant: "destructive" });
      return;
    }
    const doc = new jsPDF();
    doc.text("Rapport des Interactions du Chatbot", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['ID', 'Question', 'Réponse', 'Timestamp', 'Utilisateur']],
      body: chatbotQuestions.map(q => [q.id, q.question, q.answer, new Date(q.timestamp).toLocaleString(), q.user]),
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }, 
      styles: { fontSize: 8 },
      columnStyles: {
        1: { cellWidth: 50 }, 
        2: { cellWidth: 50 }, 
      }
    });
    doc.save('chatbot_interactions.pdf');
    toast({ title: "Exportation PDF", description: "Rapport PDF téléchargé." });
  };

  const exportToExcel = () => {
    if (chatbotQuestions.length === 0) {
      toast({ title: "Exportation Excel", description: "Aucune donnée à exporter.", variant: "destructive" });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(chatbotQuestions.map(q => ({ID: q.id, Question: q.question, Réponse: q.answer, Timestamp: new Date(q.timestamp).toLocaleString(), Utilisateur: q.user })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interactions Chatbot");
    XLSX.writeFile(workbook, "chatbot_interactions.xlsx");
    toast({ title: "Exportation Excel", description: "Rapport Excel téléchargé." });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }} // Adjusted delay
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
              <Button variant="outline" size="sm" onClick={exportToPDF} className="text-xs">
                <FileType className="mr-1 h-4 w-4" /> PDF
              </Button>
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
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Réponse</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[150px]">Utilisateur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatbotQuestions.slice().reverse().slice(0, 10).map((log) => ( 
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.question}</TableCell>
                      <TableCell>{log.answer}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">Aucune interaction enregistrée pour le moment.</p>
          )}
          {chatbotQuestions.length > 10 && (
              <p className="text-xs text-gray-500 mt-2 text-center">Affichage des 10 interactions les plus récentes. Exportez pour voir toutes les données.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChatbotInteractionsTable;
