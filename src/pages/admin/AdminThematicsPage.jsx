
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, ListTree } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';

const initialThematicsData = [
  { id: 1, name: 'Droit du Logement', description: 'Tout sur la location, la propriété, les litiges...', subSections: ['Bail d\'habitation', 'Achat immobilier', 'Troubles de voisinage'] },
  { id: 2, name: 'Droit du Travail', description: 'Contrats, licenciement, conditions de travail...', subSections: ['Contrat de travail', 'Licenciement', 'Harcèlement'] },
  { id: 3, name: 'Droit de la Famille', description: 'Mariage, divorce, succession...', subSections: ['Mariage et PACS', 'Divorce', 'Héritage'] },
];

const AdminThematicsPage = () => {
  const [thematics, setThematics] = useState(initialThematicsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subSections, setSubSections] = useState(['']);
  const { toast } = useToast();

  const openModal = (item = null) => {
    setCurrentItem(item);
    setName(item ? item.name : '');
    setDescription(item ? item.description : '');
    setSubSections(item && item.subSections && item.subSections.length > 0 ? item.subSections : ['']);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setName('');
    setDescription('');
    setSubSections(['']);
  };
  
  const handleSubSectionChange = (index, value) => {
    const newSubSections = [...subSections];
    newSubSections[index] = value;
    setSubSections(newSubSections);
  };

  const addSubSectionField = () => {
    setSubSections([...subSections, '']);
  };

  const removeSubSectionField = (index) => {
    if (subSections.length <= 1) return; // Keep at least one field
    const newSubSections = subSections.filter((_, i) => i !== index);
    setSubSections(newSubSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!name.trim() || !description.trim()) {
        toast({
            title: "Champs requis",
            description: "Le nom et la description de la thématique ne peuvent pas être vides.",
            variant: "destructive",
        });
        return;
    }
    const finalSubSections = subSections.map(s => s.trim()).filter(s => s !== '');
    if (currentItem) {
      setThematics(thematics.map(t => t.id === currentItem.id ? { ...t, name, description, subSections: finalSubSections } : t));
      toast({ title: "Thématique modifiée", description: `La thématique "${name}" a été mise à jour.` });
    } else {
      const newItem = { id: Date.now(), name, description, subSections: finalSubSections };
      setThematics([...thematics, newItem]);
      toast({ title: "Thématique ajoutée", description: `La thématique "${name}" a été ajoutée.` });
    }
    closeModal();
  };

  const handleDelete = (id, themName) => {
     if (window.confirm(`Êtes-vous sûr de vouloir supprimer la thématique "${themName}" ?`)) {
      setThematics(thematics.filter(t => t.id !== id));
      toast({ title: "Thématique supprimée", description: `La thématique "${themName}" a été supprimée.`, variant: "destructive" });
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Thématiques</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => openModal()} className="bg-green-600 hover:bg-green-700 text-white">
                    <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une thématique
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{currentItem ? 'Modifier' : 'Ajouter'} une thématique</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="thematicName" className="block text-sm font-medium text-gray-700 mb-1">Nom de la thématique</Label>
                        <Input id="thematicName" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="thematicDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                        <Textarea id="thematicDescription" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Sous-sections</Label>
                        {subSections.map((sub, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Input 
                                type="text"
                                placeholder={`Sous-section ${index + 1}`}
                                value={sub}
                                onChange={(e) => handleSubSectionChange(index, e.target.value)}
                                className="flex-grow"
                            />
                            {subSections.length > 1 ? (
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeSubSectionField(index)} className="text-red-500 hover:text-red-700 p-1">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            ) : (<div className="w-8 h-8 p-1"></div>) }
                        </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addSubSectionField} className="mt-1 text-green-600 border-green-600 hover:bg-green-50">
                        <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une sous-section
                        </Button>
                    </div>
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={closeModal}>Annuler</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>              
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </motion.div>

      <div className="space-y-6">
        {thematics.map((thematic, index) => (
          <motion.div
            key={thematic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center"><ListTree className="mr-2 h-5 w-5 text-green-500" /> {thematic.name}</CardTitle>
                    <CardDescription className="mt-1">{thematic.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openModal(thematic)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(thematic.id, thematic.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Sous-sections :</h4>
                {thematic.subSections && thematic.subSections.length > 0 ? (
                  <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-gray-600">
                    {thematic.subSections.map((sub, idx) => <li key={idx}>{sub}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucune sous-section définie.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
       {thematics.length === 0 && <p className="text-center text-gray-500 mt-8">Aucune thématique trouvée.</p>}
    </div>
  );
};

export default AdminThematicsPage;
