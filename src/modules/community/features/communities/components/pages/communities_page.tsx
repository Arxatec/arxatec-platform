import { CommunitiesCard } from "../organisms";
import { Pagination } from "../molecules";
import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";

const communities = [
  {
    id: 1,
    name: "r/Law",
    description: "Discusión general sobre leyes y derecho.",
    members: "3 M miembros",
    icon: "https://images.pexels.com/photos/4427616/pexels-photo-4427616.jpeg",
  },
  {
    id: 2,
    name: "r/LegalAdvice",
    description: "Consejos legales generales para distintas situaciones.",
    members: "2.5 M miembros",
    icon: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg",
  },
  {
    id: 3,
    name: "r/Courts",
    description: "Casos legales, tribunales y justicia en acción.",
    members: "1.8 M miembros",
    icon: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
  },
  {
    id: 4,
    name: "r/Lawyers",
    description: "Un espacio para abogados y estudiantes de derecho.",
    members: "1.5 M miembros",
    icon: "https://images.pexels.com/photos/4427549/pexels-photo-4427549.jpeg",
  },
  {
    id: 5,
    name: "r/LegalNews",
    description: "Noticias y cambios en legislaciones alrededor del mundo.",
    members: "1.2 M miembros",
    icon: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg",
  },
  {
    id: 6,
    name: "r/HumanRights",
    description:
      "Discusión sobre derechos humanos y legislación internacional.",
    members: "1.1 M miembros",
    icon: "https://images.pexels.com/photos/4669143/pexels-photo-4669143.jpeg",
  },
  {
    id: 7,
    name: "r/BusinessLaw",
    description: "Aspectos legales del mundo empresarial y corporativo.",
    members: "900K miembros",
    icon: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
  },
  {
    id: 8,
    name: "r/CriminalLaw",
    description: "Análisis de casos penales y debates sobre derecho penal.",
    members: "850K miembros",
    icon: "https://images.pexels.com/photos/4427611/pexels-photo-4427611.jpeg",
  },
  {
    id: 9,
    name: "r/ImmigrationLaw",
    description: "Asesoría e información sobre leyes de inmigración.",
    members: "780K miembros",
    icon: "https://images.pexels.com/photos/6099201/pexels-photo-6099201.jpeg",
  },
  {
    id: 10,
    name: "r/LaborLaw",
    description: "Derechos laborales, sindicatos y normativas laborales.",
    members: "730K miembros",
    icon: "https://images.pexels.com/photos/4427561/pexels-photo-4427561.jpeg",
  },
  {
    id: 11,
    name: "r/PropertyLaw",
    description: "Leyes sobre bienes raíces, propiedad y herencias.",
    members: "700K miembros",
    icon: "https://images.pexels.com/photos/4427503/pexels-photo-4427503.jpeg",
  },
  {
    id: 12,
    name: "r/FamilyLaw",
    description: "Custodia, divorcios y otros temas de derecho familiar.",
    members: "680K miembros",
    icon: "https://images.pexels.com/photos/6144840/pexels-photo-6144840.jpeg",
  },
  {
    id: 13,
    name: "r/TaxLaw",
    description: "Discusión sobre impuestos, regulaciones fiscales y más.",
    members: "650K miembros",
    icon: "https://images.pexels.com/photos/4386322/pexels-photo-4386322.jpeg",
  },
  {
    id: 14,
    name: "r/TechLaw",
    description: "El impacto de la tecnología en el derecho y regulaciones.",
    members: "620K miembros",
    icon: "https://images.pexels.com/photos/4427447/pexels-photo-4427447.jpeg",
  },
  {
    id: 15,
    name: "r/InternationalLaw",
    description: "Debates sobre leyes internacionales y tratados globales.",
    members: "600K miembros",
    icon: "https://images.pexels.com/photos/61174/pexels-photo-61174.jpeg",
  },
  {
    id: 16,
    name: "r/LegalEthics",
    description: "Ética en la abogacía y en el ejercicio del derecho.",
    members: "580K miembros",
    icon: "https://images.pexels.com/photos/6129104/pexels-photo-6129104.jpeg",
  },
  {
    id: 17,
    name: "r/CyberLaw",
    description: "Delitos informáticos y regulaciones digitales.",
    members: "560K miembros",
    icon: "https://images.pexels.com/photos/6077323/pexels-photo-6077323.jpeg",
  },
  {
    id: 18,
    name: "r/EnvironmentalLaw",
    description: "Leyes de protección ambiental y sostenibilidad.",
    members: "540K miembros",
    icon: "https://images.pexels.com/photos/5473951/pexels-photo-5473951.jpeg",
  },
  {
    id: 19,
    name: "r/LawStudents",
    description: "Foro de estudiantes de derecho y recursos para aprender.",
    members: "520K miembros",
    icon: "https://images.pexels.com/photos/5675845/pexels-photo-5675845.jpeg",
  },
  {
    id: 20,
    name: "r/ClassAction",
    description: "Debates sobre demandas colectivas y casos relevantes.",
    members: "500K miembros",
    icon: "https://images.pexels.com/photos/6266580/pexels-photo-6266580.jpeg",
  },
  {
    id: 21,
    name: "r/LegalAdvice",
    description: "Get legal advice from professionals and experienced members.",
    members: "5 M miembros",
    icon: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
  },
  {
    id: 22,
    name: "r/Lawyers",
    description:
      "A place for lawyers to discuss cases, ethics, and career paths.",
    members: "3 M miembros",
    icon: "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg",
  },
  {
    id: 23,
    name: "r/CriminalDefense",
    description:
      "Discussions on criminal defense strategies and legal precedents.",
    members: "2 M miembros",
    icon: "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg",
  },
  {
    id: 24,
    name: "r/ConstitutionalLaw",
    description: "Talk about constitutional rights and landmark cases.",
    members: "1.5 M miembros",
    icon: "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg",
  },
  {
    id: 25,
    name: "r/LawSchool",
    description: "A support group for law students and aspiring attorneys.",
    members: "1.2 M miembros",
    icon: "https://images.pexels.com/photos/3781333/pexels-photo-3781333.jpeg",
  },
  {
    id: 26,
    name: "r/LegalNews",
    description: "Latest updates on laws, legal reforms, and court rulings.",
    members: "900 K miembros",
    icon: "https://images.pexels.com/photos/4427403/pexels-photo-4427403.jpeg",
  },
  {
    id: 27,
    name: "r/EmploymentLaw",
    description: "Everything about workers' rights, labor laws, and disputes.",
    members: "800 K miembros",
    icon: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg",
  },
  {
    id: 28,
    name: "r/CorporateLaw",
    description: "Discuss mergers, acquisitions, and corporate regulations.",
    members: "750 K miembros",
    icon: "https://images.pexels.com/photos/4427486/pexels-photo-4427486.jpeg",
  },
  {
    id: 29,
    name: "r/FamilyLaw",
    description: "Topics include divorce, custody, and inheritance disputes.",
    members: "700 K miembros",
    icon: "https://images.pexels.com/photos/5668775/pexels-photo-5668775.jpeg",
  },
  {
    id: 30,
    name: "r/HumanRightsLaw",
    description: "Advocating for human rights and legal protections worldwide.",
    members: "650 K miembros",
    icon: "https://images.pexels.com/photos/4427612/pexels-photo-4427612.jpeg",
  },
  {
    id: 1,
    name: "r/Law",
    description: "Discusión general sobre leyes y derecho.",
    members: "3 M miembros",
    icon: "https://images.pexels.com/photos/4427616/pexels-photo-4427616.jpeg",
  },
  {
    id: 2,
    name: "r/LegalAdvice",
    description: "Consejos legales generales para distintas situaciones.",
    members: "2.5 M miembros",
    icon: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg",
  },
  {
    id: 3,
    name: "r/Courts",
    description: "Casos legales, tribunales y justicia en acción.",
    members: "1.8 M miembros",
    icon: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
  },
  {
    id: 4,
    name: "r/Lawyers",
    description: "Un espacio para abogados y estudiantes de derecho.",
    members: "1.5 M miembros",
    icon: "https://images.pexels.com/photos/4427549/pexels-photo-4427549.jpeg",
  },
  {
    id: 5,
    name: "r/LegalNews",
    description: "Noticias y cambios en legislaciones alrededor del mundo.",
    members: "1.2 M miembros",
    icon: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg",
  },
  {
    id: 6,
    name: "r/HumanRights",
    description:
      "Discusión sobre derechos humanos y legislación internacional.",
    members: "1.1 M miembros",
    icon: "https://images.pexels.com/photos/4669143/pexels-photo-4669143.jpeg",
  },
  {
    id: 7,
    name: "r/BusinessLaw",
    description: "Aspectos legales del mundo empresarial y corporativo.",
    members: "900K miembros",
    icon: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
  },
  {
    id: 8,
    name: "r/CriminalLaw",
    description: "Análisis de casos penales y debates sobre derecho penal.",
    members: "850K miembros",
    icon: "https://images.pexels.com/photos/4427611/pexels-photo-4427611.jpeg",
  },
  {
    id: 9,
    name: "r/ImmigrationLaw",
    description: "Asesoría e información sobre leyes de inmigración.",
    members: "780K miembros",
    icon: "https://images.pexels.com/photos/6099201/pexels-photo-6099201.jpeg",
  },
  {
    id: 10,
    name: "r/LaborLaw",
    description: "Derechos laborales, sindicatos y normativas laborales.",
    members: "730K miembros",
    icon: "https://images.pexels.com/photos/4427561/pexels-photo-4427561.jpeg",
  },
  {
    id: 11,
    name: "r/PropertyLaw",
    description: "Leyes sobre bienes raíces, propiedad y herencias.",
    members: "700K miembros",
    icon: "https://images.pexels.com/photos/4427503/pexels-photo-4427503.jpeg",
  },
  {
    id: 12,
    name: "r/FamilyLaw",
    description: "Custodia, divorcios y otros temas de derecho familiar.",
    members: "680K miembros",
    icon: "https://images.pexels.com/photos/6144840/pexels-photo-6144840.jpeg",
  },
  {
    id: 13,
    name: "r/TaxLaw",
    description: "Discusión sobre impuestos, regulaciones fiscales y más.",
    members: "650K miembros",
    icon: "https://images.pexels.com/photos/4386322/pexels-photo-4386322.jpeg",
  },
  {
    id: 14,
    name: "r/TechLaw",
    description: "El impacto de la tecnología en el derecho y regulaciones.",
    members: "620K miembros",
    icon: "https://images.pexels.com/photos/4427447/pexels-photo-4427447.jpeg",
  },
  {
    id: 15,
    name: "r/InternationalLaw",
    description: "Debates sobre leyes internacionales y tratados globales.",
    members: "600K miembros",
    icon: "https://images.pexels.com/photos/61174/pexels-photo-61174.jpeg",
  },
  {
    id: 16,
    name: "r/LegalEthics",
    description: "Ética en la abogacía y en el ejercicio del derecho.",
    members: "580K miembros",
    icon: "https://images.pexels.com/photos/6129104/pexels-photo-6129104.jpeg",
  },
  {
    id: 17,
    name: "r/CyberLaw",
    description: "Delitos informáticos y regulaciones digitales.",
    members: "560K miembros",
    icon: "https://images.pexels.com/photos/6077323/pexels-photo-6077323.jpeg",
  },
  {
    id: 18,
    name: "r/EnvironmentalLaw",
    description: "Leyes de protección ambiental y sostenibilidad.",
    members: "540K miembros",
    icon: "https://images.pexels.com/photos/5473951/pexels-photo-5473951.jpeg",
  },
  {
    id: 19,
    name: "r/LawStudents",
    description: "Foro de estudiantes de derecho y recursos para aprender.",
    members: "520K miembros",
    icon: "https://images.pexels.com/photos/5675845/pexels-photo-5675845.jpeg",
  },
  {
    id: 20,
    name: "r/ClassAction",
    description: "Debates sobre demandas colectivas y casos relevantes.",
    members: "500K miembros",
    icon: "https://images.pexels.com/photos/6266580/pexels-photo-6266580.jpeg",
  },
  {
    id: 21,
    name: "r/LegalAdvice",
    description: "Get legal advice from professionals and experienced members.",
    members: "5 M miembros",
    icon: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
  },
  {
    id: 22,
    name: "r/Lawyers",
    description:
      "A place for lawyers to discuss cases, ethics, and career paths.",
    members: "3 M miembros",
    icon: "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg",
  },
  {
    id: 23,
    name: "r/CriminalDefense",
    description:
      "Discussions on criminal defense strategies and legal precedents.",
    members: "2 M miembros",
    icon: "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg",
  },
  {
    id: 24,
    name: "r/ConstitutionalLaw",
    description: "Talk about constitutional rights and landmark cases.",
    members: "1.5 M miembros",
    icon: "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg",
  },
  {
    id: 25,
    name: "r/LawSchool",
    description: "A support group for law students and aspiring attorneys.",
    members: "1.2 M miembros",
    icon: "https://images.pexels.com/photos/3781333/pexels-photo-3781333.jpeg",
  },
  {
    id: 26,
    name: "r/LegalNews",
    description: "Latest updates on laws, legal reforms, and court rulings.",
    members: "900 K miembros",
    icon: "https://images.pexels.com/photos/4427403/pexels-photo-4427403.jpeg",
  },
  {
    id: 27,
    name: "r/EmploymentLaw",
    description: "Everything about workers' rights, labor laws, and disputes.",
    members: "800 K miembros",
    icon: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg",
  },
  {
    id: 28,
    name: "r/CorporateLaw",
    description: "Discuss mergers, acquisitions, and corporate regulations.",
    members: "750 K miembros",
    icon: "https://images.pexels.com/photos/4427486/pexels-photo-4427486.jpeg",
  },
  {
    id: 29,
    name: "r/FamilyLaw",
    description: "Topics include divorce, custody, and inheritance disputes.",
    members: "700 K miembros",
    icon: "https://images.pexels.com/photos/5668775/pexels-photo-5668775.jpeg",
  },
  {
    id: 30,
    name: "r/HumanRightsLaw",
    description: "Advocating for human rights and legal protections worldwide.",
    members: "650 K miembros",
    icon: "https://images.pexels.com/photos/4427612/pexels-photo-4427612.jpeg",
  },
];

export default function CommunitiesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Comunidades - Arxatec");
  }, []);

  return (
    <div className="mx-auto max-w-6xl w-full  min-h-screen">
      <div className="grid grid-cols-1 gap-2">
        <CommunitiesCard
          title={"Las mejores comunidades de Arxatec"}
          description="Aquí encontrarás una amplia variedad de temas interesantes y útiles."
          communities={communities}
        />
        <Pagination />
      </div>
    </div>
  );
}
