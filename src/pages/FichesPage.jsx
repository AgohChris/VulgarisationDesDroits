import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, BookOpen, Search, ArrowLeft } from "lucide-react";

const fichesData = [
	{
		id: 1,
		title: "Fiche : Les droits des consommateurs en ligne",
		description: "Synthèse des protections lors d'achats sur internet.",
		type: "PDF",
		fileName: "fiche_droits_consommateurs_ligne.pdf",
	},
	{
		id: 2,
		title: "Fiche : Succession et héritage, les bases",
		description: "Aperçu des règles de transmission de patrimoine.",
		type: "PDF",
		fileName: "fiche_succession_heritage.pdf",
	},
	{
		id: 3,
		title: "Fiche : Créer une micro-entreprise",
		description: "Les étapes simplifiées pour devenir auto-entrepreneur.",
		type: "PDF",
		fileName: "fiche_micro_entreprise.pdf",
	},
	{
		id: 4,
		title: "Fiche : Le harcèlement au travail",
		description: "Identifier et agir contre le harcèlement.",
		type: "PDF",
		fileName: "fiche_harcelement_travail.pdf",
	},
	{
		id: 5,
		title: "Fiche : Comprendre la garde alternée",
		description: "Les modalités et implications de la garde partagée.",
		type: "PDF",
		fileName: "fiche_garde_alternee.pdf",
	},
];

const FichesPage = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFiches, setFilteredFiches] = useState(fichesData);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const results = fichesData.filter((fiche) =>
			fiche.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredFiches(results);
	}, [searchTerm]);

	const handleDownload = (fileName) => {
		alert(`Simulation du téléchargement de : ${fileName}`);
	};

	const handlePreview = (fileName) => {
		alert(`Simulation de la prévisualisation de : ${fileName}`);
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
					<BookOpen className="h-16 w-16 text-green-600" />
				</div>
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Fiches{" "}
					<span className="gradient-text">Thématiques</span>
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
						className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
					/>
					<Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredFiches.map((fiche, index) => (
					<motion.div
						key={fiche.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader>
								<CardTitle>{fiche.title}</CardTitle>
								<CardDescription className="text-sm text-gray-600 h-16 overflow-hidden">
									{fiche.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow">
								<p className="text-xs text-gray-500">Type: {fiche.type}</p>
							</CardContent>
							<CardFooter className="flex justify-between gap-2">
								<Button
									variant="outline"
									onClick={() => handlePreview(fiche.fileName)}
									className="w-full"
								>
									<Eye className="mr-2 h-4 w-4" /> Consulter
								</Button>
								<Button
									onClick={() => handleDownload(fiche.fileName)}
									className="w-full bg-green-600 hover:bg-green-700 text-white"
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

export default FichesPage;
