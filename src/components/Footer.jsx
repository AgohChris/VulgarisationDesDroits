
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, Linkedin } from "lucide-react";
import Newsletter from "@/components/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Newsletter />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">JuriAccès</h3>
            <p className="text-gray-400 mb-4">
              Notre mission est de rendre le droit accessible à tous les citoyens, quels que soient leur niveau d'éducation ou leurs capacités.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/glossaire" className="text-gray-400 hover:text-white transition-colors">Glossaire</Link></li>
              <li><Link to="/thematiques" className="text-gray-400 hover:text-white transition-colors">Thématiques</Link></li>
              <li><Link to="/ressources" className="text-gray-400 hover:text-white transition-colors">Ressources</Link></li>
              <li><Link to="/systeme-judiciaire" className="text-gray-400 hover:text-white transition-colors">Structure Judiciaire</Link></li>
              
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><Link to="/ressources#guides" className="text-gray-400 hover:text-white transition-colors">Guides pratiques</Link></li>
              <li><Link to="/ressources#videos" className="text-gray-400 hover:text-white transition-colors">Vidéos explicatives</Link></li>
              <li><Link to="/ressources#podcasts" className="text-gray-400 hover:text-white transition-colors">Podcasts juridiques</Link></li>
              <li><Link to="/ressources#fiches" className="text-gray-400 hover:text-white transition-colors">Fiches thématiques</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>contact@juriacces.ci</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+225 07 78 74 86 02</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} JuriAccès. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
