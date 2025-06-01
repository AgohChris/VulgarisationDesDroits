import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Download, Headphones, Search, ArrowLeft } from "lucide-react";

const PodcastsPage = () => {
	const navigate = useNavigate();
	const [podcasts, setPodcasts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredPodcasts, setFilteredPodcasts] = useState([]);

	useEffect(() => {
		const fetchPodcasts = async () => {
			try {
				const response = await getRessourcesByType('podcast');
				setPodcasts(response);
				setFilteredPodcasts(response);
			} catch (error) {
				console.error('Erreur lors du chargement des podcasts:', error);
			}
		};
		fetchPodcasts();
	}, []);

	useEffect(() => {
		const results = podcasts.filter((podcast) =>
			podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPodcasts(results);
	}, [searchTerm]);

	const handlePlay = (fileName) => {
		alert(`Simulation de la lecture de : ${fileName}`);
	};

	const handleDownload = (fileName) => {
		alert(`Simulation du téléchargement de : ${fileName}`);
	};

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
								<CardTitle>{podcast.title}</CardTitle>
								<CardDescription className="text-sm text-gray-600">
									{podcast.episode}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow">
								<p className="text-xs text-gray-500">
									Durée: {podcast.duration}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between gap-2">
								<Button
									variant="outline"
									onClick={() => handlePlay(podcast.fileName)}
									className="w-full"
								>
									<PlayCircle className="mr-2 h-4 w-4" /> Écouter
								</Button>
								<Button
									onClick={() => handleDownload(podcast.fileName)}
									className="w-full bg-purple-600 hover:bg-purple-700 text-white"
								>
									<Download className="mr-2 h-4 w-4" /> Télécharger
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default PodcastsPage;
