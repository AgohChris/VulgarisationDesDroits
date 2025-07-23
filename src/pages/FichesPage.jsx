import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, BookOpen, Search, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { getRessourcesByType } from "@/api/ressources";

const FichesPage = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [fiches, setFiches] = useState([]);
	const [filteredFiches, setFilteredFiches] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fonction pour charger les fiches depuis l'API
	const loadFiches = async () => {
		try {
			setLoading(true);
			setError(null);
			console.log("Chargement des fiches...");
			
			const response = await getRessourcesByType("fiche");
			console.log("Réponse de l'API pour les fiches:", response);
			
			// Transformation des données de l'API vers le format attendu par le composant
			const formattedFiches = response.map(fiche => {
				console.log("Fiche brute:", fiche);
				return {
					id: fiche.id,
					title: fiche.intitule || fiche.title || "Titre non défini",
					description: fiche.description || "Description non disponible",
					type: fiche.type,
					fileName: fiche.upload || `${(fiche.intitule || fiche.title || 'document').toLowerCase().replace(/\s+/g, '_')}.pdf`,
					link: fiche.lien,
					upload: fiche.upload,
					createdAt: fiche.created_at || fiche.createdAt,
					updatedAt: fiche.updated_at || fiche.updatedAt
				};
			});
			
			console.log("Fiches formatées:", formattedFiches);
			setFiches(formattedFiches);
			setFilteredFiches(formattedFiches);
		} catch (err) {
			console.error("Erreur lors du chargement des fiches:", err);
			setError("Erreur lors du chargement des fiches. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		loadFiches();
	}, []);

	useEffect(() => {
		if (!searchTerm.trim()) {
			setFilteredFiches(fiches);
			return;
		}

		const results = fiches.filter((fiche) => {
			const searchLower = searchTerm.toLowerCase();
			return (
				fiche.title.toLowerCase().includes(searchLower) ||
				fiche.description.toLowerCase().includes(searchLower) ||
				fiche.type.toLowerCase().includes(searchLower)
			);
		});
		setFilteredFiches(results);
	}, [searchTerm, fiches]);

	// Construction de l'URL complète pour les fichiers
	const buildFileUrl = (upload) => {
		if (!upload) return null;
		
		let fileUrl = upload;
		// Si l'URL ne commence pas par /media/, on l'ajoute
		if (!fileUrl.startsWith('/media/')) {
			fileUrl = `/media/ressources/${fileUrl}`;
		}
		return `${process.env.REACT_APP_API_BASE_URL || '@https://vulgarisationdesdroits-b02f.onrender.com'}${fileUrl}`;
	};

	const handleDownload = (fiche) => {
		try {
			if (fiche.upload) {
				const downloadUrl = buildFileUrl(fiche.upload);
				console.log('URL de téléchargement:', downloadUrl);
				
				// Créer un lien de téléchargement
				const link = document.createElement('a');
				link.href = downloadUrl;
				link.download = fiche.fileName;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else if (fiche.link) {
				window.open(fiche.link, '_blank');
			} else {
				alert(`Aucun fichier disponible pour : ${fiche.title}`);
			}
		} catch (error) {
			console.error('Erreur lors du téléchargement:', error);
			alert('Erreur lors du téléchargement du fichier.');
		}
	};

	const handlePreview = (fiche) => {
		try {
			if (fiche.upload) {
				const previewUrl = buildFileUrl(fiche.upload);
				console.log('URL de prévisualisation:', previewUrl);
				window.open(previewUrl, '_blank');
			} else if (fiche.link) {
				window.open(fiche.link, '_blank');
			} else {
				alert(`Aucun fichier disponible pour prévisualisation : ${fiche.title}`);
			}
		} catch (error) {
			console.error('Erreur lors de la prévisualisation:', error);
			alert('Erreur lors de l\'ouverture du fichier.');
		}
	};

	const clearSearch = () => {
		setSearchTerm("");
	};

	// Composant de chargement
	if (loading) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex justify-center items-center min-h-[400px]">
					<div className="flex flex-col items-center gap-4">
						<Loader2 className="h-8 w-8 animate-spin text-green-600" />
						<p className="text-gray-600">Chargement des fiches...</p>
					</div>
				</div>
			</div>
		);
	}

	// Composant d'erreur
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
						<AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
						<p className="text-red-600 mb-4 text-lg">{error}</p>
						<Button onClick={loadFiches} variant="outline" className="mr-2">
							Réessayer
						</Button>
						<Button onClick={() => navigate(-1)} variant="ghost">
							Retour
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
					className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
				>
					<ArrowLeft className="h-5 w-5" /> Retour
				</Button>
			</div>

			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-12"
			>
				<div className="flex justify-center items-center mb-4">
					<BookOpen className="h-16 w-16 text-green-600" />
				</div>
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Fiches{" "}
					<span className="gradient-text bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
						Thématiques
					</span>
				</h1>
				<p className="text-xl text-gray-700 max-w-3xl mx-auto">
					Consultez nos fiches synthétiques pour une compréhension rapide des
					sujets juridiques clés.
				</p>
			</motion.div>

			{/* Search Bar */}
			<div className="mb-8 flex justify-center">
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Rechercher une fiche..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
					/>
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
						{searchTerm && (
							<button
								onClick={clearSearch}
								className="text-gray-400 hover:text-gray-600 text-sm"
								title="Effacer la recherche"
							>
								✕
							</button>
						)}
						<Search className="h-5 w-5 text-gray-400" />
					</div>
				</div>
			</div>

			{/* Results Counter */}
			<div className="mb-6 text-center">
				<p className="text-gray-600">
					{filteredFiches.length} fiche{filteredFiches.length !== 1 ? 's' : ''} 
					{searchTerm && ` trouvée${filteredFiches.length !== 1 ? 's' : ''} pour "${searchTerm}"`}
				</p>
			</div>

			{/* Fiches Grid */}
			{filteredFiches.length === 0 ? (
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-12"
				>
					<BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-4" />
					<p className="text-gray-500 text-lg mb-2">
						{searchTerm ? "Aucune fiche trouvée pour votre recherche" : "Aucune fiche disponible pour le moment"}
					</p>
					{searchTerm && (
						<Button onClick={clearSearch} variant="outline" className="mt-4">
							Effacer la recherche
						</Button>
					)}
				</motion.div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredFiches.map((fiche, index) => (
						<motion.div
							key={fiche.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="h-full"
						>
							<Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
								<CardHeader className="pb-4">
									<CardTitle className="line-clamp-2 text-lg font-semibold text-gray-800">
										{fiche.title}
									</CardTitle>
									<CardDescription className="text-sm text-gray-600 line-clamp-3 mt-2">
										{fiche.description}
									</CardDescription>
								</CardHeader>
								
								<CardContent className="flex-grow pb-4">
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
												{fiche.type}
											</span>
										</div>
										
										<div className="flex flex-col gap-1">
											{fiche.upload && (
												<div className="flex items-center gap-1 text-xs text-green-600">
													<span>📎</span>
													<span>Fichier disponible</span>
												</div>
											)}
											{fiche.link && (
												<div className="flex items-center gap-1 text-xs text-blue-600">
													<span>🔗</span>
													<span>Lien externe</span>
												</div>
											)}
										</div>
									</div>
								</CardContent>
								
								<CardFooter className="flex gap-2 pt-4">
									<Button
										variant="outline"
										onClick={() => handlePreview(fiche)}
										className="flex-1 hover:bg-gray-50 transition-colors"
										disabled={!fiche.upload && !fiche.link}
									>
										<Eye className="mr-2 h-4 w-4" /> 
										Consulter
									</Button>
									<Button
										onClick={() => handleDownload(fiche)}
										className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors"
										disabled={!fiche.upload && !fiche.link}
									>
										<Download className="mr-2 h-4 w-4" /> 
										Télécharger
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

export default FichesPage;