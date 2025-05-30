import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Youtube, Search, ArrowLeft } from "lucide-react";

const VideosData = [
	{
		id: 1,
		title: "Le droit du travail décrypté",
		episode: "Épisode 1: Le contrat de travail",
		duration: "15:30",
		url: "https://www.youtube.com/watch?v=example1",
	},
	{
		id: 2,
		title: "Justice au quotidien",
		episode: "Focus sur les litiges de voisinage",
		duration: "22:10",
		url: "https://www.youtube.com/watch?v=example2",
	},
	{
		id: 3,
		title: "Les arcanes du droit de la famille",
		episode: "Le divorce par consentement mutuel",
		duration: "18:45",
		url: "https://www.youtube.com/watch?v=example3",
	},
	{
		id: 4,
		title: "Consommation : connaissez vos droits",
		episode: "Achats en ligne : les pièges à éviter",
		duration: "20:00",
		url: "https://www.youtube.com/watch?v=example4",
	},
	{
		id: 5,
		title: "L'actualité juridique en bref",
		episode: "Les dernières réformes importantes",
		duration: "12:05",
		url: "https://www.youtube.com/watch?v=example5",
	},
];

const VideosPage = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredVideos, setFilteredVideos] = useState(VideosData);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const results = VideosData.filter((video) =>
			video.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredVideos(results);
	}, [searchTerm]);

	const handleWatch = (url) => {
		window.open(url, "_blank");
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

			{/* Search Bar */}
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
								<CardTitle>{video.title}</CardTitle>
								<CardDescription className="text-sm text-gray-600">
									{video.episode}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow">
								<p className="text-xs text-gray-500">
									Durée: {video.duration}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between gap-2">
								<Button
									onClick={() => handleWatch(video.url)}
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

export default VideosPage;
