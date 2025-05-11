
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, FileText, Video, Headphones, BookOpen, ExternalLink } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Will create this component

const resourceTypes = [
  { value: 'guide', label: 'Guide Pratique', icon: FileText, color: 'blue' },
  { value: 'video', label: 'Vidéo Explicative', icon: Video, color: 'red' },
  { value: 'podcast', label: 'Podcast Juridique', icon: Headphones, color: 'purple' },
  { value: 'fiche', label: 'Fiche Thématique', icon: BookOpen, color: 'green' },
];

const initialResourcesData = [
  { id: 1, type: 'guide', title: 'Guide du locataire (Admin)', description: 'PDF sur les droits des locataires.', link: '/ressources/guides/guide-locataire.pdf', isExternal: false },
  { id: 2, type: 'video', title: 'Comprendre le Droit du Travail (Admin)', description: 'Vidéo YouTube expliquant les bases.', link: 'https://youtube.com/watch?v=examplevideo', isExternal: true },
  { id: 3, type: 'podcast', title: 'Podcast: Litiges de Voisinage (Admin)', description: 'Audio sur la résolution des conflits.', link: '/ressources/podcasts/litiges-voisinage.mp3', isExternal: false },
];

const AdminResourcesPage = () => {
  const [resources, setResources] = useState(initialResourcesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState(resourceTypes[0].value);
  const [isExternal, setIsExternal] = useState(false);

  const { toast } = useToast();

  const getResourceIcon = (resourceType) => {
    const rt = resourceTypes.find(r => r.value === resourceType);
    return rt ? <rt.icon className={`h-5 w-5 mr-2 text-${rt.color}-500`} /> : <FileText className="h-5 w-5 mr-2 text-gray-500" />;
  };

  const openModal = (item = null) => {
    setCurrentItem(item);
    setTitle(item ? item.title : '');
    setDescription(item ? item.description : '');
    setLink(item ? item.link : '');
    setType(item ? item.type : resourceTypes[0].value);
    setIsExternal(item ? item.isExternal : false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    // Reset form fields if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      setResources(resources.map(r => r.id === currentItem.id ? { ...r, title, description, link, type, isExternal } : r));
      toast({ title: "Ressource modifiée", description: `La ressource "${title}" a été mise à jour.` });
    } else {
      const newItem = { id: Date.now(), title, description, link, type, isExternal };
      setResources([...resources, newItem]);
      toast({ title: "Ressource ajoutée", description: `La ressource "${title}" a été ajoutée.` });
    }
    closeModal();
  };

  const handleDelete = (id, resTitle) => {
     if (window.confirm(`Êtes-vous sûr de vouloir supprimer la ressource "${resTitle}" ?`)) {
      setResources(resources.filter(r => r.id !== id));
      toast({ title: "Ressource supprimée", description: `La ressource "${resTitle}" a été supprimée.`, variant: "destructive" });
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Ressources</h1>
        <Button onClick={() => openModal()} className="bg-purple-600 hover:bg-purple-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une ressource
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-2">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
                <CardDescription className="text-sm text-gray-600 h-16 overflow-hidden">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <a 
                  href={resource.link} 
                  target={resource.isExternal ? "_blank" : "_self"} 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-800 break-all flex items-center"
                >
                  {resource.link} {resource.isExternal && <ExternalLink className="ml-1 h-3 w-3"/>}
                </a>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                 <Button variant="outline" size="sm" onClick={() => openModal(resource)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id, resource.title)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {resources.length === 0 && <p className="text-center text-gray-500 mt-8">Aucune ressource trouvée.</p>}


      {/* Modal for Add/Edit Resource */}
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentItem ? 'Modifier' : 'Ajouter'} une ressource</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="resourceTitle" className="block text-sm font-medium text-gray-700">Titre</label>
                <Input id="resourceTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="resourceDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="resourceDescription" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
               <div>
                <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700">Type de ressource</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map(rt => (
                      <SelectItem key={rt.value} value={rt.value}>
                        <div className="flex items-center">
                          {React.createElement(rt.icon, { className: `h-4 w-4 mr-2 text-${rt.color}-500`})}
                          {rt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700">Lien / Chemin du fichier</label>
                <Input id="resourceLink" value={link} onChange={(e) => setLink(e.target.value)} required placeholder="ex: /guides/mon-guide.pdf ou https://example.com" />
              </div>
              <div className="flex items-center space-x-2">
                 <input
                    type="checkbox"
                    id="isExternal"
                    checked={isExternal}
                    onChange={(e) => setIsExternal(e.target.checked)}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                <label htmlFor="isExternal" className="text-sm font-medium text-gray-700">C'est un lien externe (ouvre dans un nouvel onglet)</label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                 <Button type="button" variant="outline" onClick={closeModal}>Annuler</Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>   
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminResourcesPage;
