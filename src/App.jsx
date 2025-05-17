
import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import GlossaryPage from "@/pages/GlossaryPage";
import ThematicPage from "@/pages/ThematicPage";
import ResourcesPage from "@/pages/ResourcesPage";
import GuidesPage from "@/pages/GuidesPage";
import PodcastsPage from "@/pages/PodcastsPage";
import FichesPage from "@/pages/FichesPage";
import JudicialSystemPage from "@/pages/JudicialSystemPage";
import Chatbot from "@/components/Chatbot";
import { Toaster } from "@/components/ui/toaster";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminGlossaryPage from "@/pages/admin/AdminGlossaryPage";
import AdminThematicsPage from "@/pages/admin/AdminThematicsPage";
import AdminResourcesPage from "@/pages/admin/AdminResourcesPage";
import AdminNewsletterPage from "@/pages/admin/AdminNewsletterPage";
import AdminJudicialSystemPage from "@/pages/admin/AdminJudicialSystemPage";
import AdminLawCategoriesPage from "@/pages/admin/AdminLawCategoriesPage";
import AdminLawSubjectsPage from "@/pages/admin/AdminLawSubjectsPage";


const useIsAdminRoute = () => {
  const location = useLocation();
  return location.pathname.startsWith('/admin');
};

const MainLayout = () => {
  const isAdminRoute = useIsAdminRoute();

  if (isAdminRoute) {
    return <Outlet />; 
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <Toaster />
    </>
  );
};

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/glossaire" element={<GlossaryPage />} />
          <Route path="/thematiques" element={<ThematicPage />} />
          <Route path="/ressources" element={<ResourcesPage />} />
          <Route path="/ressources/guides" element={<GuidesPage />} />
          <Route path="/ressources/podcasts" element={<PodcastsPage />} />
          <Route path="/ressources/fiches" element={<FichesPage />} />
          <Route path="/systeme-judiciaire" element={<JudicialSystemPage />} />
        </Route>
        
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="glossaire" element={<AdminGlossaryPage />} />
          <Route path="thematiques" element={<AdminThematicsPage />} />
          <Route path="ressources" element={<AdminResourcesPage />} />
          <Route path="newsletter" element={<AdminNewsletterPage />} />
          <Route path="systeme-judiciaire" element={<AdminJudicialSystemPage />} />
          <Route path="categories-droit" element={<AdminLawCategoriesPage />} />
          <Route path="sujets-droit" element={<AdminLawSubjectsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
