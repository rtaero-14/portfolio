const projectsData = [
  {
    id: "mobile",
    title: "ALT-F4",
    year: "2026",
    role: "Développeur Mobile Débutant",
    isGroup: true,
    roleDetail: "Conception de l'architecture MVC et du maquettage, développement de la fonctionnalité d'ajout de tâche et de l'interface générale de l'application.",
    competence: "Réaliser - Niveau 2 : Partir des exigences et aller jusqu'à une application complète",
    summary: "Création d'une application mobile de gestion de tâches.",
    description: "L'objectif de notre binôme était de réaliser une application mobile de gestion de tâches. Il est possible pour l'utilisateur de créer une tâche en lui donnant un titre, une descritpion, une image, une date et heure butoire ou même de rendre la tâche récurrente. L'utilisateur a accès à un caldendrier intéractif pour créer des tâches tout en navigant facilement. Enfin, l'utilisateur a accès à un onglet de recherche avancée permettant de filtrer les tâches en fonction de leur état (A FAIRE, REALISEE, EN RETARD).",
    image: "./ressources/altf4.png",
    technologies: ["Kotlin", "Android Studio", "Figma"],
    livrables: [
      { name: "Dépôt GitHub", url: "https://github.com/nbillaud1/task_list_app.git" }
    ],
    gallery: [
      "./ressources/altf4-1.png",
      "./ressources/altf4-code.png"
    ],
    apprentissagesCritiques: [
      { id: "AC21.01", description: "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences" },
      { id: "AC21.02", description: "Appliquer des principes d'accessibilité et d'ergonomie" }
    ],
    difficulties: [
      "Création d'un système de recherche avec filtres.",
      "Mise en place d'une interface fluide et ergonomique."
    ],
    skills: [
      "Maîtrise des bases en Kotlin.",
      "Maîtrise du pattern MVC.",
      "Maîtrise d'Android Studio."
    ],
    accent: {
      color: "#aa4eff",
      glow: "rgba(170, 78, 255, 0.35)"
    }
  },
  {
    id: "erp",
    title: "ERP centralisé",
    year: "2026",
    role: "Développeur Back-end",
    isGroup: true,
    roleDetail: "Participation majeure dans la partie back-end du projet. Création du système de périodicité des rappels pour les mails automatiques envoyés aux professeurs et vacataires pour le remplissage et/ou la validation de fiches ressource. Implémentation du serveur Postfix prévu à cet effet.",
    competence: "Administrer - Niveau 2 : Déployer des services dans une architecture réseau.",
    summary: "ERP centralisé pour la gestion des fiches ressources de l'administration de l'IUT.",
    description: "L'objectif de notre équipe était de développer un ERP centralisé pour le corps enseignant et de l'administration de notre IUT afin d'alléger leur charge administrative. Ce site internet permet aux professeurs de remplir leurs fiches ressources et à l'administration de gérer les utilisateurs.",
    image: "./ressources/erp.png",
    technologies: ["Java Springboot", "Maria DB", "CSS", "HTML", "Vue JS"],
    livrables: [
      { name: "Code source complet (GitHub)", url: "https://github.com/nbillaud1/sae_erp.git" }
    ],
    gallery: [
      "./ressources/erp-1.png",
      "./ressources/erp-code.png"
    ],
    apprentissagesCritiques: [
      { id: "AC23.01", description: "Concevoir et développer des applications communicantes" },
      { id: "AC23.02", description: "Utiliser des serveurs et des services réseaux virtualisés" }
    ],
    difficulties: [
      "Montée en compétence en SpringBoot et View JS.",
      "Synchronisation de l'authentification avec le CAS (Biome).",
      "Gestion stricte des rôles et des permissions d'accès."
    ],
    skills: [
      "Conception et développement d'une API avec Spring Boot.",
      "Modélisation avancée de bases de données relationnelles.",
      "Travail en équipe avec la méthode Agile."
    ],
    accent: {
      color: "#2083ff",
      glow: "rgba(32, 131, 255, 0.35)"
    }
  },
  {
    id: "ptp",
    title: "Protect The Pig (Projet personnel)",
    year: "2025",
    role: "Game Developper",
    isGroup: false,
    competence: "Optimiser - Niveau 2 : Utiliser des techniques algorithmiques adaptées pour des problèmes complexes.",
    summary: "Petit jeu-vidéo sur PC codé en C# et réalisé sur Unity.",
    description: "J'ai réalisé un petit jeu-vidéo ou le joueur incarne un chevalier (ou chevalière !) dont le but est de défendre un cochon allongé dans une forêt. Des ennemis apparaissent à droite et à gauche de l'écran et se dirigent vers le milieu du niveau pour tuer le cochon. Le joueur peut se déplacer, attaquer, sauter. (Le jeu n'est pas complètement terminé, plus de fonctionnalités sont à prévoir !)",
    image: "./ressources/ptp.png",
    technologies: ["C#", "Unity 6"],
    livrables: [],
    gallery: [
      "./ressources/ptp-1.png",
      "./ressources/ptp-code.png"
    ],
    apprentissagesCritiques: [
      { id: "AC22.01", description: "Choisir des structures de données complexes adaptées au problème" },
      { id: "AC22.02", description: "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes" }
    ],
    difficulties: [
      "Découverte de Unity et de son interface.",
      "Montée en compétence en C#.",
      "Implémentation de nouvelles fonctionnalités."
    ],
    skills: [
      "Conception de l'interface graphique on Unity.",
      "Réalisation de la logique métier pour le comportement du personnage du Joueur, du cochon et des ennemis.",
      "Réalisation de la logique pour les collisions, le système de points de vie, de dégâts et timer."
    ],
    accent: {
      color: "#ff3b3b",
      glow: "rgba(255, 59, 59, 0.35)"
    }
  },
  {
    id: "web",
    title: "ASTÉRIX - Site de streaming web",
    year: "2026",
    role: "Développeur Fullstack",
    isGroup: false,
    competence: "Optimiser - Niveau 2 : Utiliser des techniques algorithmiques adaptées pour des problèmes complexes.",
    summary: "Petit jeu-vidéo sur PC codé en C# et réalisé sur Unity.",
    description: "J'ai réalisé un petit jeu-vidéo ou le joueur incarne un chevalier (ou chevalière !) dont le but est de défendre un cochon allongé dans une forêt. Des ennemis apparaissent à droite et à gauche de l'écran et se dirigent vers le milieu du niveau pour tuer le cochon. Le joueur peut se déplacer, attaquer, sauter. (Le jeu n'est pas complètement terminé, plus de fonctionnalités sont à prévoir !)",
    image: "./ressources/ptp.png",
    technologies: ["C#", "Unity 6"],
    livrables: [],
    gallery: [
      "./ressources/ptp-1.png",
      "./ressources/ptp-code.png"
    ],
    apprentissagesCritiques: [
      { id: "AC22.01", description: "Choisir des structures de données complexes adaptées au problème" },
      { id: "AC22.02", description: "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes" }
    ],
    difficulties: [
      "Découverte de Unity et de son interface.",
      "Montée en compétence en C#.",
      "Implémentation de nouvelles fonctionnalités."
    ],
    skills: [
      "Conception de l'interface graphique on Unity.",
      "Réalisation de la logique métier pour le comportement du personnage du Joueur, du cochon et des ennemis.",
      "Réalisation de la logique pour les collisions, le système de points de vie, de dégâts et timer."
    ],
    accent: {
      color: "#ff3b3b",
      glow: "rgba(255, 59, 59, 0.35)"
    }
  }
];