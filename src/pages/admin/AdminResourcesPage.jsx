import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have this or will create it
import { PlusCircle, Edit, Trash2, FileText, Video, Headphones, BookOpen, ExternalLink } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null); // For file uploads
  const [type, setType] = useState(resourceTypes[0].value);
  const [isExternal, setIsExternal] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type based on the selected resource type
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

  const renderUploadField = () => (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition"
      onClick={() => document.getElementById('fileUploadInput').click()}
    >
      <input
        id="fileUploadInput"
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept={
          type === 'guide' || type === 'fiche'
            ? '.pdf,.docx,.pptx,.jpeg,.jpg,.png'
            : type === 'podcast'
            ? '.mp3,.wav,.ogg'
            : ''
        }
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
            <p className="text-xs text-gray-400">
              {type === 'guide' || type === 'fiche'
                ? 'PDF, DOCX, PPTX, JPEG, PNG (MAX. 10 Mo)'
                : type === 'podcast'
                ? 'MP3, WAV, OGG (MAX. 10 Mo)'
                : ''}
            </p>
          </>
        )}
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || (!link.trim() && !file)) {
      toast({
        title: "Champs requis",
        description: "Le titre, la description et le lien ou fichier de la ressource sont obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      id: Date.now(),
      title,
      description,
      link: file ? URL.createObjectURL(file) : link, // Use file URL if uploaded
      type,
      isExternal,
    };

    if (currentItem) {
      setResources(resources.map(r => r.id === currentItem.id ? newItem : r));
      toast({ title: "Ressource modifiée", description: `La ressource "${title}" a été mise à jour.` });
    } else {
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
    setTitle('');
    setDescription('');
    setLink('');
    setType(resourceTypes[0].value);
    setIsExternal(false);
  };

  const getResourceIcon = (type) => {
    const resource = resourceTypes.find((rt) => rt.value === type);
    return resource ? React.createElement(resource.icon, { className: `h-5 w-5 text-${resource.color}-500 mr-2` }) : null;
  };

  const getResourceLabel = (type) => {
    const resource = resourceTypes.find((rt) => rt.value === type);
    return resource ? resource.label : 'Type inconnu';
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
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                  renderUploadField()
                ) : type === 'podcast' ? (
                  <>
                    <Input
                      id="resourceLink"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Lien (optionnel)"
                    />
                    <div className="mt-2">{renderUploadField()}</div>
                  </>
                ) : (
                  <Input
                    id="resourceLinkOrFile"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required={!file}
                    placeholder="ex: https://youtube.com/watch?v=examplevideo"
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
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">{currentItem ? 'Sauvegarder' : 'Ajouter'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                <div className="flex items-center mb-1">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">{getResourceLabel(resource.type)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2 h-16 overflow-hidden text-ellipsis">{resource.description}</p>
                <a 
                  href={resource.link} 
                  target={resource.isExternal ? "_blank" : "_self"} 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-800 break-all flex items-center"
                >
                  {resource.link} {resource.isExternal && <ExternalLink className="ml-1 h-3 w-3"/>}
                </a>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 pt-4">
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
    </div>
  );
};

export default AdminResourcesPage;
