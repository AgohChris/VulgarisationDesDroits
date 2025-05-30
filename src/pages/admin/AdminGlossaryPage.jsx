import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';
import { fetchGlossaries, addGlossary, updateGlossary, deleteGlossary } from '@/api/glossary';

const AdminGlossaryPage = () => {
  const [glossaryItems, setGlossaryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadGlossaries = async () => {
      try {
        const data = await fetchGlossaries();
        setGlossaryItems(data);
      } catch (error) {
        console.error("Erreur lors du chargement des glossaires :", error);
      }
    };

    loadGlossaries();
  }, []);

  const filteredItems = glossaryItems.filter(item => 
    item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (item = null) => {
    setCurrentItem(item);
    setTerm(item ? item.titre : ''); // Remplacez item.term par item.titre
    setDefinition(item ? item.description : ''); // Remplacez item.definition par item.description
    setExample(item ? item.exemple : ''); // Remplacez item.example par item.exemple
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setTerm('');
    setDefinition('');
    setExample('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) {
      toast({
        title: "Champs requis",
        description: "Le terme et la définition ne peuvent pas être vides.",
        variant: "destructive",
      });
      return;
    }
    const newItem = { titre: term, description: definition, exemple: example };
    try {
      if (currentItem) {
        await updateGlossary(currentItem.id, newItem);
        toast({ title: "Terme modifié", description: `Le terme "${term}" a été modifié.`, variant: "success" });
      } else {
        await addGlossary(newItem);
        toast({ title: "Terme ajouté", description: `Le terme "${term}" a été ajouté.`, variant: "success" });
      }
      const data = await fetchGlossaries();
      setGlossaryItems(data);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification :", error);
    }
  };

  const handleDelete = async (id, termName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le terme "${termName}" ?`)) {
      try {
        await deleteGlossary(id);
        setGlossaryItems(glossaryItems.filter(item => item.id !== id));
        toast({ title: "Terme supprimé", description: `Le terme "${termName}" a été supprimé.`, variant: "destructive" });
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestion du Glossaire</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="mr-2 h-5 w-5" /> Ajouter un terme
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{currentItem ? 'Modifier' : 'Ajouter'} un terme</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-1">Terme</Label>
                        <Input id="term" value={term} onChange={(e) => setTerm(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="definition" className="block text-sm font-medium text-gray-700 mb-1">Définition</Label>
                        <Textarea id="definition" value={definition} onChange={(e) => setDefinition(e.target.value)} required rows="3" />
                    </div>
                    <div>
                        <Label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1">Exemple (optionnel)</Label>
                        <Textarea id="example" value={example} onChange={(e) => setExample(e.target.value)} rows="2" />
                    </div>
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </motion.div>

      <div className="mb-6 relative">
        <Input 
          type="text"
          placeholder="Rechercher un terme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.titre}</CardTitle> {/* Remplacez item.term par item.titre */}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">{item.description}</p> {/* Remplacez item.definition par item.description */}
                {item.exemple && <p className="text-xs text-gray-500 italic">Exemple: {item.exemple}</p>} {/* Remplacez item.example par item.exemple */}
              </CardContent>
              <CardDescription className="p-6 pt-0 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => openModal(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.titre)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
      {filteredItems.length === 0 && <p className="text-center text-gray-500 mt-8">Aucun terme trouvé.</p>}
    </div>
  );
};

export default AdminGlossaryPage;
