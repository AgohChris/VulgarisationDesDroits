import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Download, Headphones, Search, ArrowLeft, Loader2 } from "lucide-react";
import { getRessourcesByType } from "@/api/ressources"; // Ajustez le chemin selon votre structure

const PodcastsPage = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [podcasts, setPodcasts] = useState([]);
	const [filteredPodcasts, setFilteredPodcasts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fonction pour charger les podcasts depuis l'API
	const loadPodcasts = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await getRessourcesByType("podcast");
			
			// Transformation des données de l'API vers le format attendu par le composant
			const formattedPodcasts = response.map(podcast => ({
				id: podcast.id,
				title: podcast.intitule,
				episode: podcast.description,
				duration: "Audio", // Vous pouvez ajouter un champ durée dans votre modèle si nécessaire
				fileName: podcast.upload || `${podcast.intitule.toLowerCase().replace(/\s+/g, '_')}.mp3`,
				link: podcast.lien,
				upload: podcast.upload,
				type: podcast.type
			}));
			
			setPodcasts(formattedPodcasts);
			setFilteredPodcasts(formattedPodcasts);
		} catch (err) {
			setError("Erreur lors du chargement des podcasts");
			console.error("Erreur:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		loadPodcasts();
	}, []);

	useEffect(() => {
		const results = podcasts.filter((podcast) =>
			podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			podcast.episode.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPodcasts(results);
	}, [searchTerm, podcasts]);

	const handlePlay = (podcast) => {
		if (podcast.upload) {
			// Construction correcte de l'URL pour le fichier audio
			let fileUrl = podcast.upload;
			if (!fileUrl.startsWith('/media/')) {
				fileUrl = `/media/ressources/${fileUrl}`;
			}
			const audioUrl = `http://127.0.0.1:8080${fileUrl}`;
			console.log('URL audio:', audioUrl); // Debug
			// Ouvrir le lecteur audio du navigateur
			window.open(audioUrl, '_blank');
		} else if (podcast.link) {
			// Si c'est un lien externe (ex: Spotify, YouTube, etc.)
			window.open(podcast.link, '_blank');
		} else {
			alert(`Aucun fichier audio disponible pour : ${podcast.title}`);
		}
	};

	const handleDownload = (podcast) => {
		if (podcast.upload) {
			// Construction correcte de l'URL pour le téléchargement
			let fileUrl = podcast.upload;
			if (!fileUrl.startsWith('/media/')) {
				fileUrl = `/media/ressources/${fileUrl}`;
			}
			const downloadUrl = `http://127.0.0.1:8080${fileUrl}`;
			console.log('URL de téléchargement:', downloadUrl); // Debug
			
			// Créer un lien de téléchargement
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = podcast.fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else if (podcast.link) {
			// Si c'est un lien externe, on l'ouvre
			window.open(podcast.link, '_blank');
		} else {
			alert(`Aucun fichier disponible pour téléchargement : ${podcast.title}`);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex justify-center items-center min-h-[400px]">
					<div className="flex flex-col items-center gap-4">
						<Loader2 className="h-8 w-8 animate-spin text-purple-600" />
						<p className="text-gray-600">Chargement des podcasts...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="mb-4">
					<Button
						variant="outline"
						onClick={() => navigate(-1)}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-5 w-5" /> Retour
					</Button>
				</div>
				<div className="flex justify-center items-center min-h-[400px]">
					<div className="text-center">
						<p className="text-red-600 mb-4">{error}</p>
						<Button onClick={loadPodcasts} variant="outline">
							Réessayer
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			{/* Back Button */}
			<div className="mb-4">
				<Button
					variant="outline"
					onClick={() => navigate(-1)}
					className="flex items-center gap-2"
				>
					<ArrowLeft className="h-5 w-5" /> Retour
				</Button>
			</div>

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-12"
			>
				<div className="flex justify-center items-center mb-4">
					<Headphones className="h-16 w-16 text-purple-600" />
				</div>
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Podcasts <span className="gradient-text">Juridiques</span>
				</h1>
				<p className="text-xl text-gray-700 max-w-3xl mx-auto">
					Écoutez nos experts décrypter le droit pour vous, où que vous soyez.
				</p>
			</motion.div>

			{/* Search Bar */}
			<div className="mb-8 flex justify-center">
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Rechercher un podcast..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
					/>
					<Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
				</div>
			</div>

			{/* Affichage du nombre de résultats */}
			<div className="mb-6 text-center">
				<p className="text-gray-600">
					{filteredPodcasts.length} podcast{filteredPodcasts.length > 1 ? 's' : ''} 
					{searchTerm && ` trouvé${filteredPodcasts.length > 1 ? 's' : ''} pour "${searchTerm}"`}
				</p>
			</div>

			{/* Grille des podcasts */}
			{filteredPodcasts.length === 0 && !loading ? (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">
						{searchTerm ? "Aucun podcast trouvé pour votre recherche." : "Aucun podcast disponible pour le moment."}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredPodcasts.map((podcast, index) => (
						<motion.div
							key={podcast.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
								<CardHeader>
									<CardTitle className="line-clamp-2">{podcast.title}</CardTitle>
									<CardDescription className="text-sm text-gray-600 line-clamp-3">
										{podcast.episode}
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<div className="space-y-2">
										<p className="text-xs text-gray-500">
											Type: {podcast.type}
										</p>
										{podcast.upload && (
											<p className="text-xs text-green-600">
												🎵 Fichier audio disponible
											</p>
										)}
										{podcast.link && (
											<p className="text-xs text-blue-600">
												🔗 Lien externe
											</p>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between gap-2">
									<Button
										variant="outline"
										onClick={() => handlePlay(podcast)}
										className="w-full"
										disabled={!podcast.upload && !podcast.link}
									>
										<PlayCircle className="mr-2 h-4 w-4" /> Écouter
									</Button>
									<Button
										onClick={() => handleDownload(podcast)}
										className="w-full bg-purple-600 hover:bg-purple-700 text-white"
										disabled={!podcast.upload && !podcast.link}
									>
										<Download className="mr-2 h-4 w-4" /> Télécharger
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default PodcastsPage;