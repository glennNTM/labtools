/**
 * Textes de la landing page, centralisés pour être modifiés sans toucher aux composants.
 * TODO(contenu à valider) : tous les textes ci-dessous sont une première version rédigée
 * à partir de la vision, de la mission et de la cible. Les éléments entre crochets [X]
 * sont des placeholders : ne jamais les remplacer par des chiffres non vérifiés.
 */
import type { IconName } from '@/types/icon'

export const cta = {
  primary: { label: 'Lancer mon projet', href: '/#lancer' },
  secondary: { label: 'Découvrir nos activités', href: '/#activites' },
  quote: { label: 'Demander un devis' },
}

export const nav = [
  { label: 'Activités', href: '/#activites' },
  { label: 'Pour qui', href: '/#pour-qui' },
  { label: 'Méthode', href: '/#methode' },
  { label: 'FAQ', href: '/#faq' },
]

export const hero = {
  eyebrow: 'Incubateur de technologies pour l’Afrique',
  title: 'Faites de votre idée une entreprise tech.',
  subtitle:
    'On construit la tech africaine avec ceux qui la portent. LabTools accompagne les porteurs de projet, de l’idée jusqu’au produit en ligne.',
  benefits: [
    'Un accompagnement structuré, de l’idée au lancement',
    'Une équipe technique qui construit avec vous',
    'Un cadre business pour bâtir un modèle viable',
  ],
  // TODO(chiffres) : remplacer [X] par un chiffre réel et vérifiable
  proof: '[X] projets accompagnés',
}

export const problemSolution = {
  eyebrow: 'Le constat',
  title: 'Une bonne idée ne suffit pas. Une méthode, si.',
  intro:
    'Les freins que rencontrent la plupart des porteurs de projet, et la réponse que LabTools y apporte.',
  problemLabel: 'Seul',
  solutionLabel: 'Avec LabTools',
  items: [
    {
      problem: 'J’ai une idée, mais je ne sais pas par où commencer.',
      solution: 'Une feuille de route claire, définie avec vous dès le premier échange.',
    },
    {
      problem: 'Je ne sais pas coder et je n’ai pas d’équipe technique.',
      solution: 'Nos développeurs conçoivent et construisent votre produit à vos côtés.',
    },
    {
      problem: 'Je ne sais pas si mon projet peut être rentable.',
      solution: 'Le framework LabTools vous aide à valider votre marché et votre modèle économique.',
    },
    {
      problem: 'Les prestataires livrent sans expliquer ce qu’ils ont fait.',
      solution: 'Un développement transparent et documenté, que vous comprenez et maîtrisez.',
    },
    {
      problem: 'Je suis seul face à chaque décision.',
      solution: 'Une équipe qui challenge vos choix et vous aide à avancer plus vite.',
    },
  ],
}

export const activities = {
  eyebrow: 'Nos activités',
  title: 'Trois leviers pour transformer un projet en entreprise.',
  intro:
    'Incuber, développer, structurer : LabTools réunit sous un même toit ce dont un projet tech a besoin pour exister.',
  items: [
    {
      icon: 'incubator' as IconName,
      title: 'Incubateur',
      description:
        'Un programme de transformation technologique pour les jeunes porteurs de projet africains.',
      points: ['Diagnostic et cadrage du projet', 'Ateliers et accompagnement suivi', 'Prototypage puis lancement'],
      withQuote: false,
    },
    {
      icon: 'code' as IconName,
      title: 'Développement sur mesure',
      description:
        'Des applications web et mobiles de qualité, conçues pour vos utilisateurs et votre marché.',
      points: ['Sites et applications web', 'Applications mobiles', 'Intégrations et automatisation'],
      withQuote: true,
    },
    {
      icon: 'framework' as IconName,
      title: 'Framework business tech',
      description:
        'Une méthode pour passer de l’idée à un modèle économique solide, étape par étape.',
      points: ['Validation du marché', 'Modèle économique et offre', 'Pilotage et croissance'],
      withQuote: false,
    },
  ],
}

export const audience = {
  eyebrow: 'Pour qui',
  title: 'Pour toute personne qui porte un projet.',
  intro: 'Peu importe votre point de départ : ce qui compte, c’est l’envie de construire.',
  items: [
    {
      icon: 'student' as IconName,
      title: 'Étudiants',
      description: 'Transformez un projet d’études ou une idée en première entreprise.',
    },
    {
      icon: 'briefcase' as IconName,
      title: 'Entrepreneurs',
      description: 'Structurez et digitalisez une activité existante pour changer d’échelle.',
    },
    {
      icon: 'compass' as IconName,
      title: 'En recherche d’emploi',
      description: 'Créez votre propre activité et développez des compétences recherchées.',
    },
    {
      icon: 'clock' as IconName,
      title: 'Salariés',
      description: 'Préparez votre projet à votre rythme, sans tout quitter du jour au lendemain.',
    },
  ],
}

export const howItWorks = {
  eyebrow: 'Méthode',
  title: 'Trois étapes pour démarrer.',
  steps: [
    {
      title: 'Soumettez votre projet',
      description: 'Décrivez votre idée en quelques lignes via le formulaire. Aucun dossier à préparer.',
    },
    {
      title: 'Cadrez-le avec l’équipe',
      description: 'Nous analysons votre projet avec vous et définissons ensemble un plan d’action.',
    },
    {
      title: 'Construisez et lancez',
      description: 'Accompagnement, développement et suivi jusqu’à la mise en ligne de votre produit.',
    },
  ],
}

// TODO(témoignage) : remplacer par un vrai témoignage, avec l'accord écrit de son auteur
export const testimonials = {
  eyebrow: 'Témoignages',
  title: 'Ce qu’en disent les porteurs de projet.',
  previous: 'Témoignage précédent',
  next: 'Témoignage suivant',
  goTo: 'Afficher le témoignage',
  of: 'sur',
  items: [
    {
      quote: '[Témoignage à venir : citation courte d’un étudiant accompagné par LabTools.]',
      name: '[Prénom Nom]',
      role: '[Étudiant·e, projet, ville]',
    },
    {
      quote: '[Témoignage à venir : citation courte d’un entrepreneur accompagné par LabTools.]',
      name: '[Prénom Nom]',
      role: '[Entrepreneur·e, projet, ville]',
    },
    {
      quote: '[Témoignage à venir : citation courte d’un client des services de développement.]',
      name: '[Prénom Nom]',
      role: '[Fonction, entreprise, ville]',
    },
  ],
}

export const midCta = {
  title: 'Vous avez une idée ? C’est suffisant pour commencer.',
  objection: 'Aucune compétence technique requise.',
}

// TODO(chiffres) : remplacer chaque [X] par une donnée réelle, ou retirer la ligne
export const keyFigures = {
  eyebrow: 'En chiffres',
  title: 'L’impact LabTools.',
  items: [
    { value: '[X]', label: 'projets accompagnés' },
    { value: '[X]', label: 'produits mis en ligne' },
    { value: '[X]', label: 'pays représentés' },
    { value: '[X]', label: 'porteurs de projet formés' },
  ],
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'Vos questions, nos réponses.',
  items: [
    {
      question: 'Combien coûte l’accompagnement ?',
      // TODO(contenu à valider) : préciser le modèle (gratuit, payant, prise de participation…)
      answer:
        'Les modalités dépendent du programme et de la nature de votre projet. Elles vous sont présentées clairement lors du premier échange, avant tout engagement.',
    },
    {
      question: 'Faut-il savoir coder ?',
      answer:
        'Non. Vous apportez l’idée et la connaissance de votre marché, l’équipe LabTools apporte l’expertise technique et vous explique chaque choix.',
    },
    {
      question: 'Comment les projets sont-ils sélectionnés ?',
      answer:
        'Chaque projet soumis est étudié. La motivation du porteur, le problème adressé et le potentiel de l’idée comptent davantage que son niveau d’avancement.',
    },
    {
      question: 'Combien de temps dure l’accompagnement ?',
      answer:
        'La durée s’adapte à la maturité de votre projet. Elle est définie ensemble lors de la phase de cadrage.',
    },
    {
      question: 'Qui est propriétaire du projet ?',
      // TODO(contenu à valider) : confirmer selon les conditions contractuelles réelles
      answer:
        'Vous restez propriétaire de votre projet. Les conditions précises sont formalisées par écrit avant le démarrage.',
    },
    {
      question: 'Où se trouve LabTools ?',
      // TODO(coordonnées) : préciser la ville et les modalités (présentiel, distance)
      answer: 'LabTools est basé à [Ville, Pays]. L’accompagnement se fait [en présentiel et à distance].',
    },
  ],
}

export const finalCta = {
  eyebrow: 'Lancer mon projet',
  title: 'Votre idée mérite d’exister. Construisons-la ensemble.',
  description:
    'Décrivez votre projet en quelques lignes. L’équipe LabTools l’étudie et revient vers vous pour en parler.',
  objection: 'Aucune compétence technique requise.',
}

export const form = {
  fields: {
    name: { label: 'Nom complet', error: 'Indiquez votre nom.' },
    email: { label: 'Email', error: 'Indiquez un email valide, par exemple nom@domaine.com.' },
    profile: {
      label: 'Vous êtes',
      placeholder: 'Choisissez votre profil',
      error: 'Choisissez le profil qui vous correspond le mieux.',
      options: ['Étudiant·e', 'Entrepreneur·e', 'En recherche d’emploi', 'Salarié·e', 'Autre'],
    },
    project: {
      label: 'Votre projet en quelques lignes',
      hint: 'Le problème que vous voulez résoudre et pour qui. 500 caractères maximum.',
      error: 'Décrivez votre projet en au moins 20 caractères.',
    },
    consent: {
      label: 'J’accepte que LabTools utilise ces informations pour me recontacter au sujet de mon projet.',
      error: 'Votre accord est nécessaire pour que nous puissions vous recontacter.',
    },
  },
  privacyLink: 'Politique de confidentialité',
  submit: 'Lancer mon projet',
  submitting: 'Envoi en cours…',
  errorSummary: 'Le formulaire contient des erreurs. Corrigez les champs signalés.',
  success: 'Merci, votre projet a bien été envoyé. L’équipe LabTools revient vers vous rapidement.',
  failure: 'L’envoi en ligne n’est pas encore disponible. Écrivez-nous directement à',
}

export const footer = {
  legalTitle: 'Informations légales',
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/confidentialite' },
    { label: 'Cookies', href: '/cookies' },
  ],
  backToTop: 'Retour en haut',
}
