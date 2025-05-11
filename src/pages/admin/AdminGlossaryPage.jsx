
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const initialGlossaryData = [
  { id: 1, term: 'Abrogation', definition: "Suppression d'une loi ou d'un règlement.", example: "L'abrogation de cette ancienne loi a simplifié la procédure." },
  { id: 2, term: 'Contrat de travail', definition: "Accord par lequel une personne s'engage à travailler pour un employeur moyennant rémunération.", example: "Le contrat de travail doit préciser la durée, le poste et le salaire." },
  { id: 3, term: 'Jurisprudence', definition: "Ensemble des décisions des tribunaux sur une question juridique donnée.", example: "La jurisprudence constante de la Cour de cassation sur ce point est claire." },
];

const AdminGlossaryPage = () => {
  const [glossaryItems, setGlossaryItems] = useState(initialGlossaryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const { toast } = useToast();

  const filteredItems = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (item = null) => {
    setCurrentItem(item);
    setTerm(item ? item.term : '');
    setDefinition(item ? item.definition : '');
    setExample(item ? item.example : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setTerm('');
    setDefinition('');
    setExample('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      setGlossaryItems(glossaryItems.map(item => item.id === currentItem.id ? { ...item, term, definition, example } : item));
      toast({ title: "Terme modifié", description: `Le terme "${term}" a été mis à jour.` });
    } else {
      const newItem = { id: Date.now(), term, definition, example };
      setGlossaryItems([...glossaryItems, newItem]);
      toast({ title: "Terme ajouté", description: `Le terme "${term}" a été ajouté au glossaire.` });
    }
    closeModal();
  };

  const handleDelete = (id, termName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le terme "${termName}" ?`)) {
      setGlossaryItems(glossaryItems.filter(item => item.id !== id));
      toast({ title: "Terme supprimé", description: `Le terme "${termName}" a été supprimé.`, variant: "destructive" });
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
        <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter un terme
        </Button>
      </motion.div>

      <div className="mb-6 relative">
        <Input 
          type="text"
          placeholder="Rechercher un terme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
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
                <CardTitle>{item.term}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">{item.definition}</p>
                <p className="text-xs text-gray-500 italic">Exemple: {item.example}</p>
              </CardContent>
              <CardDescription className="p-6 pt-0 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => openModal(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.term)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
      {filteredItems.length === 0 && <p className="text-center text-gray-500 mt-8">Aucun terme trouvé.</p>}

      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{currentItem ? 'Modifier' : 'Ajouter'} un terme</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-gray-700">Terme</label>
                <Input id="term" value={term} onChange={(e) => setTerm(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="definition" className="block text-sm font-medium text-gray-700">Définition</label>
                <textarea id="definition" value={definition} onChange={(e) => setDefinition(e.target.value)} required rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div>
                <label htmlFor="example" className="block text-sm font-medium text-gray-700">Exemple</label>
                <textarea id="example" value={example} onChange={(e) => setExample(e.target.value)} rows="2" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={closeModal}>Annuler</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminGlossaryPage;
