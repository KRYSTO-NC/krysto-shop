const products = [
  {
    name: 'Bagues fantaisie',
    image: '/images/bagues.png',
    subname: 'Un Bijou Unique, Un Pas Vers un Monde Plus Durable',
    description:
      "Nos bagues recyclées ne sont pas seulement un accessoire de mode, elles sont une déclaration d'amour à notre planète. Chaque bague est fabriquée à partir de plastique 100% recyclé, collecté localement en partenariat avec des associations et des entreprises engagées en faveur de la durabilité.",
    brand: 'Krysto',
    category: 'Accessoires de Mode',
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Cache-pots',
    subname: 'Donnez Vie à Vos Plantes Tout en Protégeant la Planète',
    image: '/images/cache_pot.png',
    description:
      'Nos cache-pots écologiques ne sont pas simplement des récipients pour vos plantes, ils sont une affirmation de votre engagement envers un monde plus durable. Chaque cache-pot est soigneusement fabriqué à partir de plastique 100% recyclé, collecté localement en partenariat avec des associations et entreprises responsables.',
    brand: 'Krysto',
    category: "Décoration d'Intérieur",
    price: 450,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Peignes grand modèle',
    subname: 'Démêlez Vos Cheveux, Pas Votre Conscience Écologique',
    image: '/images/large_comb.png',
    description:
      "Notre Peigne Grand Modèle n'est pas seulement un outil de soin capillaire, c'est un symbole de votre engagement pour un monde plus vert. Chaque peigne est soigneusement fabriqué en Nouvelle-Calédonie à partir de plastique 100% recyclé, collecté auprès de nos partenaires locaux engagés dans la durabilité.",
    brand: 'Krysto',
    category: 'Beauté',
    price: 590,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },

  {
    name: 'Perles',
    image: '/images/perle.png',
    subname: 'Ajoutez une Touche de Beauté Durable à Vos Créations',
    description:
      "Nos perles écologiques sont plus qu'un simple élément de bijouterie, elles sont une célébration de la créativité durable. Chaque perle est fabriquée à partir de plastique 100% recyclé, collecté localement en Nouvelle-Calédonie, en partenariat avec des organisations et entreprises soucieuses de l'environnement.",
    brand: 'Krysto',
    category: 'Accessoires de Mode',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Porte-savons',
    image: '/images/porte_savons.png',
    subname: 'Un Havre de Propreté, Un Geste pour la Planète',
    description:
      'Nos Porte-Savons Écologiques ne sont pas juste un accessoire de salle de bain, ils sont un acte de responsabilité environnementale. Chaque porte-savon est soigneusement fabriqué à partir de plastique 100% recyclé, collecté localement en partenariat avec des associations et des entreprises engagées en faveur de la durabilité.',
    brand: 'Krysto',
    category: "Décoration d'Intérieur",
    price: 900,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Dessous de verres',
    subname: 'Protégez Vos Surfaces, Pas Juste Vos Boissons',
    image: '/images/tiles.png',
    description:
      "Nos Dessous de Verres Carrés Écologiques ne sont pas seulement un accessoire de table, ils sont une déclaration en faveur de la durabilité. Chaque dessous de verre est méticuleusement fabriqué à partir de plastique 100% recyclé, collecté localement en Nouvelle-Calédonie en partenariat avec des organisations soucieuses de l'environnement.",
    brand: 'Krysto',
    category: "Décoration d'Intérieur",
    price: 1200,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Peigne de poche',
    subname: 'Le Style et la Durabilité, Toujours à Portée de Main',
    image: '/images/pocketBeardcomb.png',
    description:
      "Nos Peignes de Poche Écologiques ne sont pas juste un accessoire de toilettage, ils sont un choix responsable. Chaque peigne est conçu avec soin à partir de plastique 100% recyclé, collecté localement en Nouvelle-Calédonie en partenariat avec des organisations et entreprises engagées pour l'environnement.",
    brand: 'Krysto',
    category: 'Beauté',
    price: 800,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Jeux Jenga',
    subname: 'Le Divertissement Responsable Pour Toute la Famille',
    image: '/images/jenga.png',
    description:
      "Notre Jeu Jenga Écologique n'est pas seulement un jeu de société, c'est une expérience de divertissement durable. Chaque bloc est soigneusement fabriqué en Nouvelle-Calédonie à partir de plastique 100% recyclé, collecté localement auprès de partenaires engagés dans la durabilité",
    brand: 'Krysto',
    category: 'Jeux et Divertissement',
    price: 4200,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Règles de Bureau',
    subname: 'Mesurez Votre Succès, Réduisez Votre Empreinte',
    image: '/images/regle.png',
    description:
      "Nos Règles de Bureau Écologiques ne sont pas juste un outil de mesure, elles sont un symbole de votre engagement pour un monde plus durable. Chaque règle est soigneusement fabriquée en Nouvelle-Calédonie à partir de plastique 100% recyclé, collecté localement en partenariat avec des organisations et entreprises engagées pour l'environnement.",
    brand: 'Krysto',
    category: 'Burautique',
    price: 290,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Mousqueton Porte-Clés',
    subname: 'Attachez Vos Clés, Détachez-Vous des Mauvaises Habitudes',
    image: '/images/mousqueton.png',
    description:
      "Notre Mousqueton Porte-Clés Écologique n'est pas juste un accessoire pratique, c'est une déclaration de durabilité. Chaque mousqueton est fabriqué avec soin en Nouvelle-Calédonie à partir de plastique 100% recyclé, collecté localement auprès de partenaires responsables.",
    brand: 'Krysto',
    category: 'Burautique',
    price: 290,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Livre 8/12 ans Destination plastique',
    subname: 'Sauve la planète en t’amusant ! et deviens un héros du recyclage',
    image: '/images/mission_plastique.png',
    description:
      'Le plastique, c’est bien plus étonnant que tu ne le crois ! D’où vient-il ? Quel est son histoire ? Comment se transforme-t-il en bouteilles d’eau ou en ustensiles de cuisine ? Et lorsque le plastique se brise, que devient-il ?Ouvre ce livre et laisse-toi entraîner dans une aventure extraordinaire à travers le monde fascinant du plastique ! Explore de nouveaux horizons à travers des jeux d’énigmes et des expériences surprenantes, et découvre tout ce que tu ne savais pas sur ce matériau mystérieux et sous-estimé. Tu seras surpris de voir à quel point il mérite d’être valorisé et mieux compris !',
    brand: 'Krysto',
    category: 'Livre pour enfant',
    price: 1200,
    countInStock: 12,
    rating: 4,
    numReviews: 12,
  },
]

export default products
