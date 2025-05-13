
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { ListChecks, PlusCircle, Edit, Trash2, Search, Library } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const AdminLawSubjectsPage = () => {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem('lawSubjects');
    return savedSubjects ? JSON.parse(savedSubjects) : [
      { id: 1, name: "Contrat de travail", categoryId: 3, description: "Formalisation de la relation de travail." },
      { id: 2, name: "Divorce par consentement mutuel", categoryId: 1, description: "Procédure de séparation à l'amiable." },
      { id: 3, name: "Vol qualifié", categoryId: 2, description: "Infraction pénale avec circonstances aggravantes." },
    ];
  });

  const [lawCategories, setLawCategories] = useState([]);
  useEffect(() => {
    const savedCategories = localStorage.getItem('lawCategories');
    if (savedCategories) {
      setLawCategories(JSON.parse(savedCategories));
    } else {
      setLawCategories([ 
        { id: 1, name: "Droit Civil" },
        { id: 2, name: "Droit Pénal" },
        { id: 3, name: "Droit du Travail" },
      ]);
    }
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('lawSubjects', JSON.stringify(subjects));
  }, [subjects]);

  const getCategoryNameById = (categoryId) => {
    const category = lawCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Non spécifiée';
  };

  const filteredSubjects = subjects.map(subject => ({
    ...subject,
    categoryName: getCategoryNameById(subject.categoryId)
  })).filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (subject = null) => {
    setCurrentSubject(subject);
    setSubjectName(subject ? subject.name : '');
    setSubjectDescription(subject ? subject.description : '');
    setSelectedCategoryId(subject ? String(subject.categoryId) : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSubject(null);
    setSubjectName('');
    setSubjectDescription('');
    setSelectedCategoryId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim() || !selectedCategoryId) {
      toast({
        title: "Champs Requis",
        description: "Le nom du sujet et la catégorie sont requis.",
        variant: "destructive",
      });
      return;
    }

    const subjectData = { 
        name: subjectName, 
        description: subjectDescription, 
        categoryId: parseInt(selectedCategoryId) 
    };

    if (currentSubject) {
      setSubjects(subjects.map(item =>
        item.id === currentSubject.id ? { ...item, ...subjectData } : item
      ));
      toast({ title: "Sujet Modifié", description: `Le sujet "${subjectName}" a été mis à jour.` });
    } else {
      const newSubject = {
        id: Date.now(),
        ...subjectData
      };
      setSubjects([newSubject, ...subjects]);
      toast({ title: "Sujet Ajouté", description: `Le sujet "${subjectName}" a été ajouté.` });
    }
    closeModal();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le sujet "${name}" ?`)) {
      setSubjects(subjects.filter(item => item.id !== id));
      toast({
        title: "Sujet Supprimé",
        description: `Le sujet "${name}" a été supprimé.`,
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
          <ListChecks className="mr-3 h-8 w-8 text-teal-600" /> Gestion des Sujets de Droit
        </h1>
        <Button onClick={() => openModal()} className="bg-teal-600 hover:bg-teal-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter un Sujet
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Liste des Sujets</CardTitle>
            <CardDescription>Visualisez et gérez les différents sujets de droit et leurs catégories.</CardDescription>
            <div className="mt-4 relative">
              <Input
                type="text"
                placeholder="Rechercher un sujet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 w-full sm:w-1/2 lg:w-1/3"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            {filteredSubjects.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nom du Sujet</TableHead>
                      <TableHead className="w-[200px]">Catégorie</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Library className="mr-1.5 h-3 w-3" />
                            {subject.categoryName}
                          </span>
                        </TableCell>
                        <TableCell>{subject.description || '-'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="icon" onClick={() => openModal(subject)} className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(subject.id, subject.name)} className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucun sujet trouvé ou correspondant à la recherche.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{currentSubject ? "Modifier le Sujet" : "Ajouter un Nouveau Sujet"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-1">Nom du Sujet</Label>
              <Input
                id="subjectName"
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Ex: Contrat de location"
                required
              />
            </div>
            <div>
              <Label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Catégorie de Droit</Label>
              <Select onValueChange={setSelectedCategoryId} value={selectedCategoryId}>
                <SelectTrigger id="categoryId" className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {lawCategories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subjectDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optionnel)</Label>
              <Textarea
                id="subjectDescription"
                value={subjectDescription}
                onChange={(e) => setSubjectDescription(e.target.value)}
                placeholder="Décrivez brièvement le sujet de droit."
                rows={3}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Annuler</Button>
              </DialogClose>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                {currentSubject ? "Sauvegarder les Modifications" : "Ajouter le Sujet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLawSubjectsPage;
