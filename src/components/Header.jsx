
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/glossaire?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      if(isMenuOpen) setIsMenuOpen(false);
    }
  };

  const navLinkClasses = "text-gray-700 hover:text-blue-600 transition-colors";
  const mobileNavLinkClasses = `${navLinkClasses} py-2 block`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold gradient-text">JuriAccès</Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>

                <NavigationMenuLink asChild>
                  <Link to="/" className={navLinkClasses}>Accueil</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link to="/glossaire" className={`${navLinkClasses} ml-6`}>Glossaire</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link to="/thematiques" className={`${navLinkClasses} ml-6`}>Thématiques</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link to="/ressources" className={`${navLinkClasses} ml-6`}>Ressources</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link to="/ressources" className={`${navLinkClasses} ml-6`}>Mes Systeme Juridique</Link>
                </NavigationMenuLink>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Rechercher un terme..."
                className="search-input pr-10"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <nav className="flex flex-col space-y-2">
              <Link to="/" className={mobileNavLinkClasses} onClick={toggleMenu}>Accueil</Link>
              <Link to="/glossaire" className={mobileNavLinkClasses} onClick={toggleMenu}>Glossaire</Link>
              <Link to="/thematiques" className={mobileNavLinkClasses} onClick={toggleMenu}>Thématiques</Link>
              <Link to="/ressources" className={mobileNavLinkClasses} onClick={toggleMenu}>Ressources</Link>
            </nav>
            <form onSubmit={handleSearch} className="mt-4 relative">
              <Input
                type="text"
                placeholder="Rechercher un terme..."
                className="search-input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
