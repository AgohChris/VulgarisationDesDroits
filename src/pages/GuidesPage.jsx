import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Search, ArrowLeft, Loader2 } from "lucide-react";
import { getRessourcesByType } from "@/api/ressources"; // Ajustez le chemin selon votre structure

const GuidesPage = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [guides, setGuides] = useState([]);
	const [filteredGuides, setFilteredGuides] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fonction pour charger les guides depuis l'API
	const loadGuides = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await getRessourcesByType("guide");
			
			// Transformation des données de l'API vers le format attendu par le composant
			const formattedGuides = response.map(guide => ({
				id: guide.id,
				title: guide.intitule,
				description: guide.description,
				type: guide.type,
				fileName: guide.upload || `${guide.intitule.toLowerCase().replace(/\s+/g, '_')}.pdf`,
				link: guide.lien,
				upload: guide.upload
			}));
			
			setGuides(formattedGuides);
			setFilteredGuides(formattedGuides);
		} catch (err) {
			setError("Erreur lors du chargement des guides");
			console.error("Erreur:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		loadGuides();
	}, []);

	useEffect(() => {
		const results = guides.filter((guide) =>
			guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			guide.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredGuides(results);
	}, [searchTerm, guides]);

	const handleDownload = (guide) => {
		if (guide.upload) {
			// Si c'est un fichier uploadé - construction correcte de l'URL
			let fileUrl = guide.upload;
			// Si l'URL ne commence pas par /media/, on l'ajoute
			if (!fileUrl.startsWith('/media/')) {
				fileUrl = `/media/ressources/${fileUrl}`;
			}
			const downloadUrl = `@https://vulgarisationdesdroits-b02f.onrender.com${fileUrl}`;
			console.log('URL de téléchargement:', downloadUrl); // Debug
			window.open(downloadUrl, '_blank');
		} else if (guide.link) {
			// Si c'est un lien externe
			window.open(guide.link, '_blank');
		} else {
			alert(`Aucun fichier disponible pour : ${guide.title}`);
		}
	};

	const handlePreview = (guide) => {
		if (guide.upload) {
			// Prévisualisation du fichier uploadé - construction correcte de l'URL
			let fileUrl = guide.upload;
			// Si l'URL ne commence pas par /media/, on l'ajoute
			if (!fileUrl.startsWith('/media/')) {
				fileUrl = `/media/ressources/${fileUrl}`;
			}
			const previewUrl = `@https://vulgarisationdesdroits-b02f.onrender.com${fileUrl}`;
			console.log('URL de prévisualisation:', previewUrl); // Debug
			window.open(previewUrl, '_blank');
		} else if (guide.link) {
			// Prévisualisation du lien externe
			window.open(guide.link, '_blank');
		} else {
			alert(`Aucun fichier disponible pour prévisualisation : ${guide.title}`);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex justify-center items-center min-h-[400px]">
					<div className="flex flex-col items-center gap-4">
						<Loader2 className="h-8 w-8 animate-spin text-blue-600" />
						<p className="text-gray-600">Chargement des guides...</p>
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
						<Button onClick={loadGuides} variant="outline">
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
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Guides{" "}
					<span className="gradient-text">Pratiques</span>
				</h1>
				<p className="text-xl text-gray-700 max-w-3xl mx-auto">
					Téléchargez nos guides détaillés pour vous accompagner dans vos
					démarches juridiques.
				</p>
			</motion.div>

			{/* Search Bar */}
			<div className="mb-8 flex justify-center">
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Rechercher un guide..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
				</div>
			</div>

			{/* Affichage du nombre de résultats */}
			<div className="mb-6 text-center">
				<p className="text-gray-600">
					{filteredGuides.length} guide{filteredGuides.length > 1 ? 's' : ''} 
					{searchTerm && ` trouvé${filteredGuides.length > 1 ? 's' : ''} pour "${searchTerm}"`}
				</p>
			</div>

			{/* Grille des guides */}
			{filteredGuides.length === 0 && !loading ? (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">
						{searchTerm ? "Aucun guide trouvé pour votre recherche." : "Aucun guide disponible pour le moment."}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredGuides.map((guide, index) => (
						<motion.div
							key={guide.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
								<CardHeader>
									<CardTitle className="line-clamp-2">{guide.title}</CardTitle>
									<CardDescription className="text-sm text-gray-600 line-clamp-3">
										{guide.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<div className="space-y-2">
										<p className="text-xs text-gray-500">
											Type: {guide.type}
										</p>
										{guide.upload && (
											<p className="text-xs text-green-600">
												📎 Fichier disponible
											</p>
										)}
										{guide.link && (
											<p className="text-xs text-blue-600">
												🔗 Lien externe
											</p>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between gap-2">
									<Button
										variant="outline"
										onClick={() => handlePreview(guide)}
										className="w-full"
										disabled={!guide.upload && !guide.link}
									>
										<Eye className="mr-2 h-4 w-4" /> Consulter
									</Button>
									<Button
										onClick={() => handleDownload(guide)}
										className="w-full bg-blue-600 hover:bg-blue-700 text-white"
										disabled={!guide.upload && !guide.link}
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

export default GuidesPage;