
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Scale, PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminJudicialSystemPage = () => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('judicialSystemEntries');
    return savedEntries ? JSON.parse(savedEntries) : [
      { id: 1, name: "Cour de Cassation", role: "Juge les décisions des cours d'appel et des tribunaux de première instance." },
      { id: 2, name: "Conseil d'État", role: "Conseille le gouvernement et juge les litiges administratifs." },
      { id: 3, name: "Tribunal Judiciaire", role: "Compétent pour la plupart des litiges civils et pénaux." },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [entryName, setEntryName] = useState('');
  const [entryRole, setEntryRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('judicialSystemEntries', JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (entry = null) => {
    setCurrentEntry(entry);
    setEntryName(entry ? entry.name : '');
    setEntryRole(entry ? entry.role : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEntry(null);
    setEntryName('');
    setEntryRole('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entryName.trim() || !entryRole.trim()) {
      toast({
        title: "Champs Requis",
        description: "Le nom et le rôle ne peuvent pas être vides.",
        variant: "destructive",
      });
      return;
    }

    if (currentEntry) {
      setEntries(entries.map(item =>
        item.id === currentEntry.id ? { ...item, name: entryName, role: entryRole } : item
      ));
      toast({ title: "Entrée Modifiée", description: `L'entrée "${entryName}" a été mise à jour.` });
    } else {
      const newEntry = {
        id: Date.now(),
        name: entryName,
        role: entryRole,
      };
      setEntries([newEntry, ...entries]);
      toast({ title: "Entrée Ajoutée", description: `L'entrée "${entryName}" a été ajoutée.` });
    }
    closeModal();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'entrée "${name}" ?`)) {
      setEntries(entries.filter(item => item.id !== id));
      toast({
        title: "Entrée Supprimée",
        description: `L'entrée "${name}" a été supprimée.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
          <Scale className="mr-3 h-8 w-8 text-indigo-600" /> Gestion du Système Judiciaire
        </h1>
        <Button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une Entrée
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Liste des Entités Judiciaires</CardTitle>
            <CardDescription>Visualisez et gérez les différentes entités et rôles du système judiciaire.</CardDescription>
            <div className="mt-4 relative">
              <Input
                type="text"
                placeholder="Rechercher une entité ou un rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-1/2 lg:w-1/3"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            {filteredEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nom de l'Entité/Rôle</TableHead>
                      <TableHead>Description du Rôle</TableHead>
                      <TableHead className="w-[150px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.name}</TableCell>
                        <TableCell>{entry.role}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="icon" onClick={() => openModal(entry)} className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(entry.id, entry.name)} className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune entrée trouvée ou correspondant à la recherche.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{currentEntry ? "Modifier l'Entrée" : "Ajouter une Nouvelle Entrée"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="entryName" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'Entité/Rôle</Label>
              <Input
                id="entryName"
                type="text"
                value={entryName}
                onChange={(e) => setEntryName(e.target.value)}
                placeholder="Ex: Tribunal de Grande Instance"
                required
              />
            </div>
            <div>
              <Label htmlFor="entryRole" className="block text-sm font-medium text-gray-700 mb-1">Description du Rôle</Label>
              <Textarea
                id="entryRole"
                value={entryRole}
                onChange={(e) => setEntryRole(e.target.value)}
                placeholder="Décrivez brièvement le rôle ou la fonction."
                rows={4}
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Annuler</Button>
              </DialogClose>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {currentEntry ? "Sauvegarder les Modifications" : "Ajouter l'Entrée"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJudicialSystemPage;
