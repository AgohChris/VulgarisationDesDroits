
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, ListTree, Eye } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const initialThematicsData = [
  { id: 1, name: 'Droit du Logement', description: 'Tout sur la location, la propriété, les litiges...', subSections: ['Bail d\'habitation', 'Achat immobilier', 'Troubles de voisinage'] },
  { id: 2, name: 'Droit du Travail', description: 'Contrats, licenciement, conditions de travail...', subSections: ['Contrat de travail', 'Licenciement', 'Harcèlement'] },
  { id: 3, name: 'Droit de la Famille', description: 'Mariage, divorce, succession...', subSections: ['Mariage et PACS', 'Divorce', 'Héritage'] },
];

const AdminThematicsPage = () => {
  const [thematics, setThematics] = useState(initialThematicsData);
  // Add state for modal, current item, form fields etc. similar to AdminGlossaryPage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subSections, setSubSections] = useState(['']); // Array of strings

  const { toast } = useToast();

  const openModal = (item = null) => {
    setCurrentItem(item);
    setName(item ? item.name : '');
    setDescription(item ? item.description : '');
    setSubSections(item ? item.subSections : ['']);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    // Reset form fields
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
    const newSubSections = subSections.filter((_, i) => i !== index);
    setSubSections(newSubSections);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSubSections = subSections.filter(s => s.trim() !== '');
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
        <Button onClick={() => openModal()} className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une thématique
        </Button>
      </motion.div>

      {/* List Thematics */}
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


      {/* Modal for Add/Edit Thematic */}
      {isModalOpen && (
         <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentItem ? 'Modifier' : 'Ajouter'} une thématique</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="thematicName" className="block text-sm font-medium text-gray-700">Nom de la thématique</label>
                <Input id="thematicName" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="thematicDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="thematicDescription" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sous-sections</label>
                {subSections.map((sub, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input 
                      type="text"
                      placeholder={`Sous-section ${index + 1}`}
                      value={sub}
                      onChange={(e) => handleSubSectionChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    {subSections.length > 1 && (
                       <Button type="button" variant="ghost" size="sm" onClick={() => removeSubSectionField(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addSubSectionField} className="mt-1 text-green-600 border-green-600 hover:bg-green-50">
                  <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une sous-section
                </Button>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>Annuler</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>              
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminThematicsPage;
