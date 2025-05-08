
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import GlossaryPage from "@/pages/GlossaryPage";
import ThematicPage from "@/pages/ThematicPage";
import ResourcesPage from "@/pages/ResourcesPage";
import Chatbot from "@/components/Chatbot";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/glossaire" element={<GlossaryPage />} />
          <Route path="/thematiques" element={<ThematicPage />} />
          <Route path="/ressources" element={<ResourcesPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <Toaster />
    </div>
  );
};

export default App;
