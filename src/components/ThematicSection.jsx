
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Briefcase, Users, Scale, Car, Heart } from "lucide-react";

const thematicData = {
  logement: {
    title: "Droit du logement",
    icon: <Home className="h-6 w-6 text-blue-600" />,
    description: "Tout ce que vous devez savoir sur vos droits et obligations en matière de logement.",
    content: [
      {
        title: "Bail d'habitation",
        description: "Le bail est un contrat qui définit les droits et obligations du propriétaire et du locataire.",
        details: "Il doit contenir certaines mentions obligatoires comme la durée, le montant du loyer, les charges, etc."
      },
      {
        title: "État des lieux",
        description: "Document qui décrit l'état du logement au début et à la fin de la location.",
        details: "Il est essentiel pour éviter les litiges concernant la restitution du dépôt de garantie."
      },
      {
        title: "Préavis",
        description: "Délai que le locataire doit respecter pour informer le propriétaire de son départ.",
        details: "Le préavis est généralement de 3 mois, mais peut être réduit à 1 mois dans certains cas (mutation professionnelle, perte d'emploi, etc.)."
      }
    ]
  },
  travail: {
    title: "Droit du travail",
    icon: <Briefcase className="h-6 w-6 text-green-600" />,
    description: "Comprendre vos droits en tant que salarié ou employeur.",
    content: [
      {
        title: "Contrat de travail",
        description: "Document qui formalise la relation entre l'employeur et le salarié.",
        details: "Il peut être à durée déterminée (CDD) ou indéterminée (CDI) et doit préciser les conditions de travail."
      },
      {
        title: "Licenciement",
        description: "Rupture du contrat de travail à l'initiative de l'employeur.",
        details: "Il doit être justifié par une cause réelle et sérieuse, et respecter une procédure précise."
      },
      {
        title: "Congés payés",
        description: "Période pendant laquelle le salarié est dispensé de travailler tout en conservant sa rémunération.",
        details: "Un salarié acquiert 2,5 jours ouvrables de congés payés par mois de travail effectif."
      }
    ]
  },
  famille: {
    title: "Droit de la famille",
    icon: <Users className="h-6 w-6 text-purple-600" />,
    description: "Les aspects juridiques liés à la famille, au mariage, au divorce et à la filiation.",
    content: [
      {
        title: "Mariage",
        description: "Union légale entre deux personnes qui crée des droits et des obligations mutuels.",
        details: "Les époux se doivent mutuellement respect, fidélité, secours et assistance."
      },
      {
        title: "Divorce",
        description: "Dissolution légale du mariage qui met fin aux obligations matrimoniales.",
        details: "Il existe plusieurs types de divorce : par consentement mutuel, pour acceptation du principe de la rupture, pour altération définitive du lien conjugal ou pour faute."
      },
      {
        title: "Autorité parentale",
        description: "Ensemble des droits et devoirs des parents envers leurs enfants mineurs.",
        details: "Elle est exercée conjointement par les deux parents, même en cas de séparation, sauf décision contraire du juge."
      }
    ]
  },
  justice: {
    title: "Justice et procédures",
    icon: <Scale className="h-6 w-6 text-red-600" />,
    description: "Comment fonctionne le système judiciaire et quelles sont les procédures à suivre.",
    content: [
      {
        title: "Aide juridictionnelle",
        description: "Assistance financière accordée par l'État pour les personnes aux revenus modestes.",
        details: "Elle permet de bénéficier d'une prise en charge totale ou partielle des frais de justice et des honoraires d'avocat."
      },
      {
        title: "Médiation",
        description: "Processus amiable de résolution des conflits avec l'aide d'un tiers neutre.",
        details: "Elle permet souvent d'éviter un procès et de trouver une solution plus rapide et moins coûteuse."
      },
      {
        title: "Recours",
        description: "Voies permettant de contester une décision de justice.",
        details: "Les principaux recours sont l'appel (devant une cour d'appel) et le pourvoi en cassation (devant la Cour de cassation)."
      }
    ]
  },
  consommation: {
    title: "Droit de la consommation",
    icon: <Car className="h-6 w-6 text-yellow-600" />,
    description: "Protection des consommateurs dans leurs relations avec les professionnels.",
    content: [
      {
        title: "Droit de rétractation",
        description: "Possibilité pour le consommateur de revenir sur son engagement dans certains cas.",
        details: "Pour les achats en ligne, le délai de rétractation est généralement de 14 jours à compter de la réception du produit."
      },
      {
        title: "Garantie légale",
        description: "Protection contre les défauts de conformité et les vices cachés.",
        details: "La garantie légale de conformité est de 2 ans pour les biens neufs et de 6 mois pour les biens d'occasion."
      },
      {
        title: "Pratiques commerciales trompeuses",
        description: "Actions des professionnels qui induisent le consommateur en erreur.",
        details: "Elles sont interdites et peuvent être sanctionnées pénalement."
      }
    ]
  },
  sante: {
    title: "Droit de la santé",
    icon: <Heart className="h-6 w-6 text-pink-600" />,
    description: "Vos droits en tant que patient et les obligations des professionnels de santé.",
    content: [
      {
        title: "Consentement aux soins",
        description: "Principe selon lequel aucun acte médical ne peut être pratiqué sans le consentement du patient.",
        details: "Le médecin doit fournir une information claire et complète pour permettre au patient de prendre sa décision."
      },
      {
        title: "Secret médical",
        description: "Obligation pour les professionnels de santé de ne pas divulguer les informations concernant leurs patients.",
        details: "Le secret médical est un droit du patient et une obligation déontologique et légale pour le professionnel de santé."
      },
      {
        title: "Dossier médical",
        description: "Ensemble des documents relatifs à la santé d'un patient.",
        details: "Le patient a le droit d'accéder à son dossier médical et d'en obtenir une copie."
      }
    ]
  }
};

const ThematicSection = () => {
  const navigate = useNavigate();

  const handleSeeMore = (themeKey) => {
    navigate(`/thematiques#${themeKey}`);
  };

  return (
    <section className="py-16 bg-gray-50" id="thematiques">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explorez par <span className="gradient-text">thématiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les informations juridiques organisées par domaines pour faciliter votre recherche.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="logement" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              {Object.keys(thematicData).map((key) => (
                 <TabsTrigger key={key} value={key} className="flex flex-col items-center py-3">
                  {React.cloneElement(thematicData[key].icon, { className: "h-5 w-5 mb-1"})}
                  <span className="text-xs md:text-sm">{thematicData[key].title.split(" ")[thematicData[key].title.split(" ").length -1]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(thematicData).map((key) => (
              <TabsContent key={key} value={key} className="mt-6" id={key}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {thematicData[key].icon}
                      <CardTitle className="ml-2">{thematicData[key].title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {thematicData[key].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {thematicData[key].content.map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                          <p className="text-gray-700 mb-2">{item.description}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{item.details}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button variant="outline" onClick={() => handleSeeMore(key)}>
                        Voir plus sur ce thème <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ThematicSection;
