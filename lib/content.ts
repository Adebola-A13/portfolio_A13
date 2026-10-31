import type { StaticImageData } from "next/image";
import proofify from "@/images/work/proofify.png";
import aviprofit from "@/images/work/aviprofit.png";
import climaglobe from "@/images/project_1.png";
import seminarhub from "@/images/project_2.png";
import missprepa from "@/images/project_3.png";

export const person = {
  name: "Ibrahim Adehan",
  fullName: "ADEHAN Aéman Ibrahim Ulrich",
  role: "Développeur full-stack",
  email: "aeman.adehan@gmail.com",
  phone: "+229 01 51 01 50 12",
  phoneHref: "tel:+2290151015012",
  place: "Abomey-Calavi, Bénin",
  github: "https://github.com/Adebola-A13",
  linkedin: "https://www.linkedin.com/in/adehan-ibrahim-126675355",
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  line: string;
  stack: string[];
  demo?: string;
  code?: string;
  image: StaticImageData;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "proofify",
    name: "Proofify Africa",
    kind: "SaaS de preuve sociale",
    year: "2026",
    line: "Collecte de témoignages en texte, image et vidéo, puis des widgets intégrables pour les afficher sur n'importe quel site.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    demo: "https://proofify-africa.vercel.app/",
    image: proofify,
    alt: "Page d'accueil de Proofify Africa",
  },
  {
    slug: "aviprofit",
    name: "AviProfit",
    kind: "SaaS de gestion avicole",
    year: "2026",
    line: "Performances des élevages, santé animale et rentabilité suivies sur des tableaux de bord. Conçu et développé seul.",
    stack: ["Next.js", "Laravel", "PostgreSQL", "Vercel"],
    demo: "https://avi-profit.vercel.app/",
    image: aviprofit,
    alt: "Page d'accueil d'AviProfit",
  },
  {
    slug: "climaglobe",
    name: "ClimaGlobe",
    kind: "Météo mondiale en temps réel",
    year: "2025",
    line: "Chaque pays, ses données et sa météo du moment, servis par une API publique.",
    stack: ["Vue.js", "API REST"],
    demo: "https://climaglobe.vercel.app/",
    code: "https://github.com/Adebola-A13/Clima-Globe",
    image: climaglobe,
    alt: "Fiche du Bénin dans ClimaGlobe",
  },
  {
    slug: "seminarhub",
    name: "SeminarHub",
    kind: "Séminaires universitaires",
    year: "2025",
    line: "Le programme des séminaires de l'IMSP, ses annonces et les actes des sessions passées, au même endroit.",
    stack: ["Laravel", "MySQL", "Tailwind"],
    code: "https://github.com/Adebola-A13/SeminarHub",
    image: seminarhub,
    alt: "Page d'accueil de SeminarHub",
  },
  {
    slug: "missprepa",
    name: "Miss Prépa",
    kind: "Vote en ligne",
    year: "2025",
    line: "Plus de 500 votes à l'élection de l'IMSP, avec les résultats affichés en direct.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://vote-miss.vercel.app/",
    code: "https://github.com/Adebola-A13/vote-miss",
    image: missprepa,
    alt: "Page de vote de Miss Prépa",
  },
];

export const stages = [
  {
    name: "Lycée Coulibaly",
    when: "2020 à 2022",
    line: "CAP, puis DTI-FM et Bac E, à Missebo.",
  },
  {
    name: "IMSP",
    when: "2022 à 2025",
    line: "Licence en Technologies de l'Information et de la Communication, à Dangbo.",
  },
  {
    name: "Inov Service",
    when: "Été 2025",
    line: "Stage front-end en Vue.js sur la plateforme environnementale dataforearth.",
  },
  {
    name: "Alibora",
    when: "Depuis septembre 2025",
    line: "Le module de facturation de Korva et le portail Korva Client. Revues de code sur GitHub.",
  },
  {
    name: "Ingénierie IA",
    when: "La suite",
    line: "Claude et ChatGPT dans mon travail chaque jour, chaque ligne relue. Prochaine étape : construire avec les APIs IA.",
  },
];

export const layers = [
  {
    id: "front",
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS"],
    note: "Vue.js en production chez Alibora et chez Inov Service.",
  },
  {
    id: "back",
    label: "Backend",
    tools: ["Laravel", "Node.js", "PostgreSQL", "MySQL", "API REST"],
    note: "Laravel et PostgreSQL derrière Korva et AviProfit.",
  },
  {
    id: "cloud",
    label: "Cloud",
    tools: ["Vercel", "Supabase", "Git et GitHub", "Docker", "Linux"],
    note: "Les quatre démos de cette page tournent sur Vercel.",
  },
  {
    id: "ia",
    label: "IA",
    tools: ["APIs IA", "Chatbots", "Python", "Glide", "Webflow"],
    note: "Certifié Glide : formation complète et Chatbot Builder.",
  },
];
