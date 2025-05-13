
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Library, PlusCircle, Edit, Trash2, Search } from 'lucide-react';
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

const AdminLawCategoriesPage = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('lawCategories');
    return savedCategories ? JSON.parse(savedCategories) : [
      { id: 1, name: "Droit Civil", description: "Règles relatives aux rapports entre les personnes (physiques ou morales)." },
      { id: 2, name: "Droit Pénal", description: "Ensemble des règles de conduite imposées par la société aux citoyens sous peine de sanctions." },
      { id: 3, name: "Droit du Travail", description: "Régit les relations entre employeurs et salariés." },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('lawCategories', JSON.stringify(categories));
  }, [categories]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (category = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : '');
    setCategoryDescription(category ? category.description : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast({
        title: "Champ Requis",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }

    if (currentCategory) {
      setCategories(categories.map(item =>
        item.id === currentCategory.id ? { ...item, name: categoryName, description: categoryDescription } : item
      ));
      toast({ title: "Catégorie Modifiée", description: `La catégorie "${categoryName}" a été mise à jour.` });
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        description: categoryDescription,
      };
      setCategories([newCategory, ...categories]);
      toast({ title: "Catégorie Ajoutée", description: `La catégorie "${categoryName}" a été ajoutée.` });
    }
    closeModal();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${name}" ?`)) {
      setCategories(categories.filter(item => item.id !== id));
      toast({
        title: "Catégorie Supprimée",
        description: `La catégorie "${name}" a été supprimée.`,
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
          <Library className="mr-3 h-8 w-8 text-purple-600" /> Gestion des Catégories de Droit
        </h1>
        <Button onClick={() => openModal()} className="bg-purple-600 hover:bg-purple-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une Catégorie
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Liste des Catégories</CardTitle>
            <CardDescription>Visualisez et gérez les différentes catégories de droit.</CardDescription>
            <div className="mt-4 relative">
              <Input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 w-full sm:w-1/2 lg:w-1/3"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            {filteredCategories.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nom de la Catégorie</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description || '-'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="icon" onClick={() => openModal(category)} className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(category.id, category.name)} className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune catégorie trouvée ou correspondant à la recherche.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{currentCategory ? "Modifier la Catégorie" : "Ajouter une Nouvelle Catégorie"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">Nom de la Catégorie</Label>
              <Input
                id="categoryName"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Ex: Droit des Affaires"
                required
              />
            </div>
            <div>
              <Label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optionnel)</Label>
              <Textarea
                id="categoryDescription"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Décrivez brièvement la catégorie de droit."
                rows={3}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Annuler</Button>
              </DialogClose>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                {currentCategory ? "Sauvegarder les Modifications" : "Ajouter la Catégorie"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLawCategoriesPage;
