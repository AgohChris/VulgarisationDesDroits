import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Youtube, Search, ArrowLeft } from "lucide-react";
import { getRessourcesByType } from "@/api/ressources"; // Import de l'API

const VideoPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Récupération des vidéos depuis le backend
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await getRessourcesByType("video");
                setVideos(videoData);
                setFilteredVideos(videoData);
            } catch (error) {
                console.error("Erreur lors de la récupération des vidéos :", error);
            }
        };
        fetchVideos();
    }, []);

    // Filtrage des vidéos en fonction de la recherche
    useEffect(() => {
        const results = videos.filter((video) =>
            video.intitule.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVideos(results);
    }, [searchTerm, videos]);

    const handleWatch = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Bouton Retour */}
            <div className="mb-4">
                <Button
                    variant="outline"cd
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-5 w-5" /> Retour
                </Button>
            </div>

            {/* En-tête */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <div className="flex justify-center items-center mb-4">
                    <Youtube className="h-16 w-16 text-red-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Vidéos{" "}
                    <span className="gradient-text">Explicatives Juridiques</span>
                </h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    Découvrez nos vidéos explicatives pour comprendre le droit de manière
                    simple et accessible.
                </p>
            </motion.div>

            {/* Barre de recherche */}
            <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Rechercher une vidéo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Liste des vidéos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{video.intitule}</CardTitle>
                                <CardDescription className="text-sm text-gray-600">
                                    {video.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-xs text-gray-500">
                                    Date d'ajout: {new Date(video.date_ajout).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2">
                                <Button
                                    onClick={() => handleWatch(video.lien)}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <Video className="mr-2 h-4 w-4" /> Regarder
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VideoPage;