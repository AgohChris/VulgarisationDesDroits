
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutDashboard, BookOpen, ListTree, FileText, Mail, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté.",
    });
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Glossaire', icon: BookOpen, path: '/admin/glossaire' },
    { name: 'Thématiques', icon: ListTree, path: '/admin/thematiques' },
    { name: 'Ressources', icon: FileText, path: '/admin/ressources' },
    { name: 'Newsletter', icon: Mail, path: '/admin/newsletter' },
  ];

  const sidebarVariants = {
    open: { width: '280px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const mobileMenuVariants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: "-100%", transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const NavLink = ({ item, isSidebarOpenCurrent }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={() => {if(isMobileMenuOpen) setIsMobileMenuOpen(false);}}
        className={`flex items-center p-3 text-gray-200 hover:bg-slate-700 rounded-lg transition-colors duration-200 ${isActive ? 'bg-slate-700/50 ring-2 ring-sky-400' : ''}`}
      >
        <item.icon className={`h-6 w-6 ${isSidebarOpenCurrent ? 'mr-4' : 'mx-auto'} ${isActive ? 'text-sky-300' : ''}`} />
        <AnimatePresence>
          {isSidebarOpenCurrent && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className={`whitespace-nowrap ${isActive ? 'font-semibold text-sky-100' : ''}`}
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    );
  };


  return (
    <div className="flex h-screen bg-slate-100">
      <motion.div
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="hidden md:flex flex-col bg-slate-800 text-white shadow-lg"
      >
        <div className={`p-4 flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center border-b border-slate-700 h-16`}>
          <AnimatePresence>
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold gradient-text whitespace-nowrap"
            >
              Admin JuriAccès
            </motion.h1>
          )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-slate-700">
            {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => <NavLink key={item.name} item={item} isSidebarOpenCurrent={isSidebarOpen} />)}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full p-3 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors duration-200 ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className={`h-6 w-6 ${isSidebarOpen ? 'mr-4' : ''}`} />
            <AnimatePresence>
            {isSidebarOpen && (
               <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="whitespace-nowrap"
              >
                Déconnexion
              </motion.span>
            )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <div className="md:hidden flex flex-col w-full">
        <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md h-16">
          <h1 className="text-xl font-bold gradient-text">Admin JuriAccès</h1>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-white hover:bg-slate-700">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </header>
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-16 left-0 right-0 bg-slate-800 text-white p-4 z-40 shadow-lg"
          >
            <nav className="space-y-2">
              {navItems.map((item) => <NavLink key={item.name} item={item} isSidebarOpenCurrent={true} />)}
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors duration-200 mt-4"
              >
                <LogOut className="h-6 w-6 mr-4" />
                <span>Déconnexion</span>
              </button>
            </nav>
          </motion.div>
        )}
        </AnimatePresence>
         <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
      
      <main className="hidden md:flex flex-1 flex-col">
         <div className="bg-white shadow-sm p-4 h-16 flex items-center justify-end border-b">
            <span className="text-gray-600 mr-4">Admin JuriAccès</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
         </div>
        <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
