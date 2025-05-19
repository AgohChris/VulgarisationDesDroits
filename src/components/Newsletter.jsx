import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { addSubscriber } from "@/api/newsletter";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubscriber(email);
      toast({
        title: "Inscription réussie !",
        description: `Merci de vous être abonné à notre newsletter avec l'adresse : ${email}`,
        variant: "default",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.response?.data?.email || "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg"
    >
      <div className="max-w-xl mx-auto text-center">
        <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          Restez informé !
        </h3>
        <p className="text-gray-600 mb-6">
          Abonnez-vous à notre newsletter pour recevoir les dernières actualités juridiques et nos conseils.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow search-input"
            aria-label="Adresse e-mail pour la newsletter"
          />
          <Button type="submit" className="bg-ivory-green text-white px-4 py-2 rounded-r-md hover:bg-ivory-orange">
            S'abonner
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
