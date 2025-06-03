import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, FileText, Users, VolumeX, PlayCircle, Lightbulb, FileArchive } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featureItems = [
	{
		icon: <BookOpen className="h-10 w-10 text-blue-600" />,
		title: "Vulgarisation juridique",
		description: "Traduction des termes juridiques complexes en langage courant et accessible à tous.",
		delay: 0.1,
	},
	{
		icon: <Search className="h-10 w-10 text-purple-600" />,
		title: "Recherche simplifiée",
		description: "Trouvez rapidement les informations juridiques dont vous avez besoin grâce à notre moteur de recherche intuitif.",
		delay: 0.2,
	},
	{
		icon: <FileText className="h-10 w-10 text-green-600" />,
		title: "Fiches thématiques",
		description: "Des explications claires sur les principaux domaines du droit organisées par thématiques. (bientôt disponible).",
		delay: 0.3,
	},
	{
		icon: <Users className="h-10 w-10 text-orange-600" />,
		title: "Accessibilité pour tous",
		description: "Interface adaptée aux personnes en situation de handicap et compatible avec les technologies d'assistance. ",
		delay: 0.4,
	},
	{
		icon: <VolumeX className="h-10 w-10 text-red-600" />,
		title: "Contenu audio",
		description: "Écoutez les explications juridiques pour une meilleure compréhension et accessibilité. (bientôt disponible).",
		delay: 0.5,
	},
	{
		icon: <PlayCircle className="h-10 w-10 text-red-600" />, // Icône pour le contenu vidéo
		title: "Contenu vidéo",
		description: "Regardez et écoutez les explications juridiques pour une meilleure compréhension et accessibilité. (bientôt disponible).",
		delay: 0.6,
	},
	{
		icon: <Lightbulb className="h-10 w-10 text-yellow-600" />,
		title: "Exemples concrets",
		description: "Des cas pratiques et des exemples du quotidien pour illustrer les concepts juridiques. (bientôt disponible).",
		delay: 0.7,
	},
	{
		icon: <FileArchive className="h-10 w-10 text-indigo-600" />,
		title: "Documents juridiques",
		description: "Accédez à des modèles de documents et formulaires juridiques courants (bientôt disponible).",
		delay: 0.8,
	},
];

const Features = () => {
	return (
		<section className="py-16 bg-gray-50" id="features">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-3xl md:text-4xl font-bold mb-4"
					>
						Nos <span className="gradient-text">fonctionnalités</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-xl text-gray-600 max-w-3xl mx-auto"
					>
						Découvrez comment notre plateforme facilite l'accès et la compréhension du droit pour tous les citoyens.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featureItems.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: feature.delay }}
						>
							<Card className="feature-card h-full">
								<CardHeader>
									<div className="mb-4">{feature.icon}</div>
									<CardTitle>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
				{/* <div className="text-center mt-12">
					<Button className="bg-ivory-orange hover:bg-ivory-green text-white">
						Découvrir
					</Button>
				</div> */}
			</div>
		</section>
	);
};

export default Features;
