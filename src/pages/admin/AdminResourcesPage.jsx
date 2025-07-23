import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Edit, Trash2, FileText, Video, Headphones, BookOpen, ExternalLink, Search, Filter, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllRessources, createRessource, updateRessource, deleteRessource } from '@/api/ressources';

const resourceTypes = [
  { value: 'guide', label: 'Guide Pratique', icon: FileText, color: 'blue' },
  { value: 'video', label: 'Vidéo Explicative', icon: Video, color: 'red' },
  { value: 'podcast', label: 'Podcast Juridique', icon: Headphones, color: 'purple' },
  { value: 'fiche', label: 'Fiche Thématique', icon: BookOpen, color: 'green' },
];

const AdminResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState(resourceTypes[0].value);
  const [isExternal, setIsExternal] = useState(false);
  
  // États pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getAllRessources();
        setResources(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des ressources :', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les ressources.",
          variant: "destructive",
        });
      }
    };

    fetchResources();
  }, []);

  // Filtrage et recherche des ressources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.intitule?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedTypeFilter === 'all' || resource.type === selectedTypeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [resources, searchQuery, selectedTypeFilter]);

  // Statistiques pour affichage
  const resourceStats = useMemo(() => {
    const stats = resourceTypes.reduce((acc, type) => {
      acc[type.value] = resources.filter(r => r.type === type.value).length;
      return acc;
    }, {});
    stats.total = resources.length;
    return stats;
  }, [resources]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = {
      guide: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'image/jpeg', 'image/png'],
      fiche: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'image/jpeg', 'image/png'],
      podcast: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    };

    if (!allowedTypes[type]?.includes(selectedFile.type)) {
      toast({
        title: "Type de fichier invalide",
        description: `Le type de fichier sélectionné n'est pas autorisé pour ce type de ressource.`,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !type || (!link && !file)) {
      toast({
        title: "Erreur",
        description: "Tous les champs obligatoires doivent être remplis.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('intitule', title);
    formData.append('description', description);
    formData.append('type', type);
    if (file) {
      formData.append('upload', file);
    }
    if (link) {
      formData.append('lien', link);
    }

    console.log('Données envoyées :', formData);

    try {
      if (currentItem) {
        // Mode modification
        const updatedResource = await updateRessource(currentItem.id, {
          title,
          description,
          type,
          upload: file,
          link
        });
        
        setResources((prevResources) => 
          prevResources.map(resource => 
            resource.id === currentItem.id ? { ...resource, ...updatedResource } : resource
          )
        );
        
        toast({ 
          title: 'Ressource modifiée', 
          description: `La ressource "${title}" a été modifiée.` 
        });
      } else {
        // Mode création
        const newResource = await createRessource(formData);
        setResources((prevResources) => [...prevResources, newResource]);
        toast({ 
          title: 'Ressource ajoutée', 
          description: `La ressource "${title}" a été ajoutée.` 
        });
      }
      
      closeModal();
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Erreur inconnue';
      console.error('Erreur lors de l\'opération :', serverMessage);
      toast({ 
        title: 'Erreur', 
        description: serverMessage, 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (id, resTitle) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la ressource "${resTitle}" ?`)) {
      try {
        await deleteRessource(id);
        setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));
        toast({ title: 'Ressource supprimée', description: `La ressource "${resTitle}" a été supprimée.`, variant: 'destructive' });
      } catch (error) {
        console.error('Erreur lors de la suppression de la ressource :', error);
        toast({ title: 'Erreur', description: 'Impossible de supprimer la ressource.', variant: 'destructive' });
      }
    }
  };

  const openModal = (item = null) => {
    setCurrentItem(item);
    // Correction: utiliser intitule au lieu de title pour le champ titre
    setTitle(item ? (item.intitule || item.title || '') : '');
    setDescription(item ? item.description : '');
    setLink(item ? (item.lien || item.link || '') : '');
    setType(item ? item.type : resourceTypes[0].value);
    setIsExternal(item ? item.isExternal : false);
    // Réinitialiser le file à null pour éviter la persistance
    setFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setTitle('');
    setDescription('');
    setLink('');
    setType(resourceTypes[0].value);
    setIsExternal(false);
    // Important: réinitialiser le fichier
    setFile(null);
    
    // Réinitialiser également l'input file dans le DOM
    const fileInput = document.getElementById('fileUploadInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const getResourceIcon = (type) => {
    const resource = resourceTypes.find((rt) => rt.value === type);
    return resource ? React.createElement(resource.icon, { className: `h-5 w-5 text-${resource.color}-500 mr-2` }) : null;
  };

  const getResourceLabel = (type) => {
    const resource = resourceTypes.find((rt) => rt.value === type);
    return resource ? resource.label : 'Type inconnu';
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypeFilter('all');
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Ressources</h1>
          <p className="text-gray-600 mt-1">
            {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} 
            {filteredResources.length !== resources.length && ` sur ${resources.length}`} affichée{filteredResources.length > 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openModal()} className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="mr-2 h-5 w-5" /> Ajouter une ressource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{currentItem ? 'Modifier' : 'Ajouter'} une ressource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="resourceTitle" className="block text-sm font-medium text-gray-700 mb-1">Titre</Label>
                <Input id="resourceTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="resourceDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                <Textarea id="resourceDescription" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" />
              </div>
              <div>
                <Label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-1">Type de ressource</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map(rt => (
                      <SelectItem key={rt.value} value={rt.value}>
                        <div className="flex items-center">
                          {React.createElement(rt.icon, { className: `h-4 w-4 mr-2 text-${rt.color}-500` })}
                          {rt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resourceLinkOrFile" className="block text-sm font-medium text-gray-700 mb-1">
                  {type === 'guide' || type === 'fiche' ? 'Fichier à uploader' : type === 'video' ? 'Lien YouTube' : 'Lien ou fichier'}
                </Label>
                {type === 'guide' || type === 'fiche' ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition"
                    onClick={() => document.getElementById('fileUploadInput').click()}
                  >
                    <input
                      id="fileUploadInput"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.docx,.pptx,.jpeg,.jpg,.png"
                    />
                    <div className="flex flex-col items-center">
                      {file ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <p className="text-gray-600 mt-2">{file.name}</p>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                          <p className="text-gray-600 mt-2">
                            Cliquez pour uploader ou glissez-déposez
                          </p>
                          <p className="text-xs text-gray-400">PDF, DOCX, PPTX, JPEG, PNG (MAX. 10 Mo)</p>
                        </>
                      )}
                    </div>
                  </div>
                ) : type === 'podcast' ? (
                  <>
                    <Input
                      id="resourceLink"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Lien (ex: https://example.com/audio.mp3)"
                      className="mb-2"
                    />
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition"
                      onClick={() => document.getElementById('fileUploadInput').click()}
                    >
                      <input
                        id="fileUploadInput"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".mp3,.wav,.ogg"
                      />
                      <div className="flex flex-col items-center">
                        {file ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <p className="text-gray-600 mt-2">{file.name}</p>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                            <p className="text-gray-600 mt-2">
                              Cliquez pour uploader ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-400">MP3, WAV, OGG (MAX. 10 Mo)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Input
                    id="resourceLink"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    placeholder="Lien (ex: https://youtube.com/watch?v=examplevideo)"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="isExternal"
                  checked={isExternal}
                  onCheckedChange={setIsExternal}
                />
                <Label htmlFor="isExternal" className="text-sm font-medium text-gray-700">
                  C'est un lien externe (ouvre dans un nouvel onglet)
                </Label>
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={closeModal}>Annuler</Button>
                </DialogClose>
                <Button type="button" onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Barre de recherche et filtres */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-6 space-y-4"
      >
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par titre, intitulé ou description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtres
            {(searchQuery || selectedTypeFilter !== 'all') && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full ml-1">
                {(searchQuery ? 1 : 0) + (selectedTypeFilter !== 'all' ? 1 : 0)}
              </span>
            )}
          </Button>

          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Select value={selectedTypeFilter} onValueChange={setSelectedTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center">
                      <span className="mr-2">Tous les types</span>
                      <span className="text-xs text-gray-500">({resourceStats.total})</span>
                    </div>
                  </SelectItem>
                  {resourceTypes.map(rt => (
                    <SelectItem key={rt.value} value={rt.value}>
                      <div className="flex items-center">
                        {React.createElement(rt.icon, { className: `h-4 w-4 mr-2 text-${rt.color}-500` })}
                        {rt.label}
                        <span className="text-xs text-gray-500 ml-2">({resourceStats[rt.value] || 0})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || selectedTypeFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* Filtres actifs */}
        {(searchQuery || selectedTypeFilter !== 'all') && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {searchQuery && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Search className="h-3 w-3" />
                Recherche : "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedTypeFilter !== 'all' && (
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {getResourceIcon(selectedTypeFilter)}
                Type : {getResourceLabel(selectedTypeFilter)}
                <button 
                  onClick={() => setSelectedTypeFilter('all')}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Grille des ressources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredResources) && filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-1">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg leading-tight">{resource.intitule || resource.title}</CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">{getResourceLabel(resource.type)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2 h-16 overflow-hidden text-ellipsis">{resource.description}</p>
                <p className="text-xs text-gray-500">Type : {resource.type}</p>
                {resource.upload && (
                  <a href={resource.upload} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800">
                    Télécharger le fichier
                  </a>
                )}
                {resource.lien && (
                  <a href={resource.lien} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800">
                    Voir le lien
                  </a>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 pt-4">
                 <Button variant="outline" size="sm" onClick={() => openModal(resource)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id, resource.intitule || resource.title)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Message si aucune ressource */}
      {filteredResources.length === 0 && resources.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8 py-12"
        >
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">Aucune ressource trouvée</p>
          <p className="text-sm">Essayez de modifier vos critères de recherche ou de filtrage</p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="mt-4"
          >
            Effacer tous les filtres
          </Button>
        </motion.div>
      )}

      {resources.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8 py-12"
        >
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">Aucune ressource disponible</p>
          <p className="text-sm">Commencez par ajouter votre première ressource</p>
        </motion.div>
      )}
    </div>
  );
};

export default AdminResourcesPage;