import React, { useState, useEffect } from 'react';
import { fetchStructures, addStructure, updateStructure, deleteStructure } from '@/api/structureJudicial';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
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

const AdminJudicialSystemPage = () => {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [entryName, setEntryName] = useState('');
  const [entryRole, setEntryRole] = useState('');
  const [entryExample, setEntryExample] = useState(''); // Ajoutez l'état pour 'exemple'
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Charger les données depuis l'API
  useEffect(() => {
    const loadStructures = async () => {
      try {
        const data = await fetchStructures();
        console.log("Données récupérées :", data); // Ajoutez ce log
        setEntries(data);
      } catch (error) {
        console.error("Erreur lors du chargement des structures judiciaires :", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les structures judiciaires.",
          variant: "destructive",
        });
      }
    };

    loadStructures();
  }, []);

  const filteredEntries = entries.filter(entry =>
    entry.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (entry = null) => {
    setCurrentEntry(entry);
    setEntryName(entry ? entry.nom : '');
    setEntryRole(entry ? entry.description : '');
    setEntryExample(entry ? entry.exemple : ''); // Ajoutez 'exemple'
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEntry(null);
    setEntryName('');
    setEntryRole('');
    setEntryExample(''); // Réinitialisez 'exemple'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entryName.trim() || !entryRole.trim()) {
      toast({
        title: "Champs requis",
        description: "Le nom et la description ne peuvent pas être vides.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = { nom: entryName, description: entryRole, exemple: entryExample }; // Incluez 'exemple'

    try {
      if (currentEntry) {
        // Mise à jour
        await updateStructure(currentEntry.id, newEntry);
        toast({
          title: "Structure mise à jour",
          description: `La structure "${entryName}" a été mise à jour.`,
          variant: "success",
        });
      } else {
        // Ajout
        await addStructure(newEntry);
        toast({
          title: "Structure ajoutée",
          description: `La structure "${entryName}" a été ajoutée.`,
          variant: "success",
        });
      }

      // Recharger les données
      const data = await fetchStructures();
      setEntries(data);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la structure "${name}" ?`)) {
      try {
        await deleteStructure(id);
        setEntries(entries.filter(entry => entry.id !== id));
        toast({
          title: "Structure supprimée",
          description: `La structure "${name}" a été supprimée.`,
          variant: "destructive",
        });
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la structure.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Structures Judiciaires</h1>
        <Button onClick={() => openModal()} variant="primary">
          <PlusCircle className="mr-2 h-5 w-5" />
          Ajouter une structure
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Rechercher une structure..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{entry.nom}</CardTitle>
              <CardDescription>{entry.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => openModal(entry)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(entry.id, entry.nom)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentEntry ? "Modifier une structure" : "Ajouter une structure"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="entryName">Nom</Label>
                <Input
                  id="entryName"
                  value={entryName}
                  onChange={(e) => setEntryName(e.target.value)}
                  placeholder="Nom de la structure"
                />
              </div>
              <div>
                <Label htmlFor="entryRole">Description</Label>
                <Textarea
                  id="entryRole"
                  value={entryRole}
                  onChange={(e) => setEntryRole(e.target.value)}
                  placeholder="Description de la structure"
                />
              </div>
              <div>
                <Label htmlFor="entryExample">Exemple</Label>
                <Textarea
                  id="entryExample"
                  value={entryExample}
                  onChange={(e) => setEntryExample(e.target.value)}
                  placeholder="Exemple de la structure judiciaire"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{currentEntry ? "Mettre à jour" : "Ajouter"}</Button>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJudicialSystemPage;
