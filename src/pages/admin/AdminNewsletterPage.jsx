import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Mail, Send, Users, Search, Trash2, Edit, FileText, Save, Eye, Copy } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"; 
import {
  fetchNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter,
  fetchSubscribers,
} from '@/api/newsletter';

const AdminNewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberSearchTerm, setSubscriberSearchTerm] = useState('');
  const [newsletters, setNewsletters] = useState([]);
  const [currentNewsletter, setCurrentNewsletter] = useState(null); 
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [isConfirmSendModalOpen, setIsConfirmSendModalOpen] = useState(false);
  const [newsletterToSend, setNewsletterToSend] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newsletterToView, setNewsletterToView] = useState(null);

  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const data = await fetchNewsletters();
        setNewsletters(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les newsletters.",
          variant: "destructive",
        });
      }
    };

    const loadSubscribers = async () => {
      try {
        const data = await fetchSubscribers();
        setSubscribers(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les abonnés.",
          variant: "destructive",
        });
      }
    };

    loadNewsletters();
    loadSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(subscriberSearchTerm.toLowerCase())
  );

  const resetForm = () => {
    setSubject('');
    setBody('');
    setCurrentNewsletter(null);
    setIsEditing(false);
  };

  const handleSaveNewsletter = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      toast({
        title: "Champs Requis",
        description: "Le sujet et le corps de la newsletter ne peuvent pas être vides.",
        variant: "destructive",
      });
      return;
    }

    const payload = { objet: subject, contenue: body, statut: 'brouillon' };

    try {
      if (isEditing && currentNewsletter) {
        const updatedNewsletter = await updateNewsletter(currentNewsletter.id, payload);
        setNewsletters(newsletters.map(nl => (nl.id === currentNewsletter.id ? updatedNewsletter : nl)));
        toast({ title: "Newsletter mise à jour", description: "Le brouillon a été modifié." });
      } else {
        const newNewsletter = await createNewsletter(payload);
        setNewsletters([newNewsletter, ...newsletters]);
        toast({ title: "Newsletter créée", description: "Le brouillon a été créé." });
      }
      resetForm();
    } catch (error) {
      toast({ title: "Erreur", description: "La sauvegarde a échoué.", variant: "destructive" });
    }
  };

  const handleSendNewsletter = async (id) => {
    try {
      await sendNewsletter(id);
      setNewsletters(newsletters.map(nl => (nl.id === id ? { ...nl, statut: 'envoyée', date_envoie: new Date().toISOString() } : nl)));
      toast({ title: "Newsletter envoyée", description: "La newsletter a été envoyée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      toast({ title: "Erreur", description: "L'envoi a échoué. Veuillez réessayer.", variant: "destructive" });
    }
  };

  const handleDeleteNewsletter = async (id) => {
    try {
      await deleteNewsletter(id);
      setNewsletters(newsletters.filter(nl => nl.id !== id));
      toast({ title: "Newsletter supprimée", description: "La newsletter a été supprimée avec succès." });
    } catch (error) {
      toast({ title: "Erreur", description: "La suppression a échoué.", variant: "destructive" });
    }
  };

  const handleDeleteSubscriber = (id, email) => {
    if (window.confirm(`Êtes-vous sûr de vouloir désinscrire "${email}" ?`)) {
      setSubscribers(subscribers.filter(sub => sub.id !== id));
      toast({
        title: "Abonné supprimé",
        description: `L'abonné "${email}" a été supprimé de la liste.`,
        variant: "destructive",
      });
    }
  };

  const openViewModal = (newsletter) => {
    setNewsletterToView(newsletter);
    setIsViewModalOpen(true);
  };

  const handleEditNewsletter = (newsletter) => {
    setCurrentNewsletter(newsletter);
    setSubject(newsletter.objet);
    setBody(newsletter.contenue);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Section de Composition/Modification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700">{isEditing ? "Modifier le Brouillon" : "Composer une Newsletter"}</CardTitle>
            <CardDescription>{isEditing ? `Modification du brouillon: "${currentNewsletter?.objet}"` : "Créez un nouveau brouillon pour votre newsletter."}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveNewsletter} className="space-y-6">
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Sujet de votre newsletter"
                  required
                />
              </div>
              <div>
                <Label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Corps du message</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Contenu de votre newsletter..."
                  rows={10}
                  required
                />
              </div>
              <div className="text-right">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="mr-2 h-5 w-5" /> {isEditing ? "Mettre à jour le Brouillon" : "Sauvegarder le Brouillon"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Liste des Newsletters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-indigo-500" /> Brouillons et Newsletters Envoyées
            </CardTitle>
            <CardDescription>Gérez vos newsletters sauvegardées et envoyées.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            {newsletters.length > 0 ? (
              <div className="space-y-4">
                {newsletters.map(nl => (
                  <Card key={nl.id} className={`border-l-4 ${nl.statut === 'brouillon' ? 'border-yellow-400' : 'border-green-500'} bg-gray-50/50`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{nl.objet}</CardTitle>
                        <Badge variant={nl.statut === 'brouillon' ? 'secondary' : 'default'} className={nl.statut === 'brouillon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                          {nl.statut === 'brouillon' ? 'Brouillon' : 'Envoyée'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {nl.statut === 'envoyée' && nl.date_envoie ? `Envoyée le: ${new Date(nl.date_envoie).toLocaleString()}` : `Dernière modif.: ${new Date(nl.updated_at).toLocaleString()}`}
                      </p>
                    </CardHeader>
                    <CardFooter className="flex justify-end space-x-2 pt-2 pb-3">
                      <Button variant="outline" size="sm" onClick={() => openViewModal(nl)} title="Voir">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {nl.statut === 'brouillon' && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleEditNewsletter(nl)} className="text-blue-600 border-blue-600 hover:bg-blue-50" title="Modifier">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="default" size="sm" onClick={() => handleSendNewsletter(nl.id)} className="bg-blue-600 hover:bg-blue-700" title="Envoyer">
                            <Send className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteNewsletter(nl.id)} title="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">Aucune newsletter sauvegardée pour le moment.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Liste des Abonnés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 flex items-center">
              <Users className="mr-2 h-6 w-6 text-green-500" /> Liste des Abonnés ({filteredSubscribers.length})
            </CardTitle>
            <div className="mt-4 relative">
              <Input 
                type="text"
                placeholder="Rechercher un abonné..."
                value={subscriberSearchTerm}
                onChange={(e) => setSubscriberSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {filteredSubscribers.length > 0 ? (
              <ul className="space-y-3">
                {filteredSubscribers.map(sub => (
                  <li key={sub.id} className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{sub.email}</p>
                      <p className="text-xs text-gray-500">Inscrit le: {new Date(sub.date_inscription).toLocaleDateString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSubscriber(sub.id, sub.email)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-4">Aucun abonné trouvé ou correspondant à la recherche.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal d'Aperçu de la Newsletter */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Aperçu: {newsletterToView?.objet}</DialogTitle>
            <DialogDescription>
              Statut: <Badge variant={newsletterToView?.statut === 'brouillon' ? 'secondary' : 'default'} className={`ml-1 ${newsletterToView?.statut === 'brouillon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {newsletterToView?.statut === 'brouillon' ? 'Brouillon' : 'Envoyée'}
              </Badge>
              {newsletterToView?.statut === 'envoyée' && newsletterToView?.date_envoie && (
                <span className="text-xs ml-2">Envoyée le: {new Date(newsletterToView.date_envoie).toLocaleString()}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto prose prose-sm dark:prose-invert">
            <h3 className="text-lg font-semibold mb-2">Sujet: {newsletterToView?.objet}</h3>
            <div dangerouslySetInnerHTML={{ __html: newsletterToView?.contenue.replace(/\n/g, '<br />') || '' }} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Fermer</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsletterPage;
