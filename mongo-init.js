db = db.getSiblingDB("collection");

db.games.insertOne({
  id: "werewolf",
  displayName: "Loup 2 zipette",
  minPlayers: 2,
  metadata: {
    roles: [
      {
        id: "dj",
        displayName: "DJ",
        image: "https://...",
        description:
          "Doit faire passer 3 musiques nulles choisies par l'application.",
        expectedActions: ["Jouer des musiques de mauvaise qualité"],
      },
      {
        id: "villageois",
        displayName: "Villageois",
        image: "https://...",
        description: "Fait sa vie franchement.",
        expectedActions: ["Profiter de la soirée sans rôle particulier"],
      },
      {
        id: "idiot_du_village",
        displayName: "L'Idiot du village",
        image: "https://...",
        description: "Doit dire le même mot souvent.",
        expectedActions: ["Répéter un mot spécifique toute la soirée"],
      },
      {
        id: "saboteur",
        displayName: "Le Saboteur",
        image: "https://...",
        description: "Sabote les verres des autres.",
        expectedActions: ["Ajouter des ingrédients inattendus dans les verres"],
      },
      {
        id: "barman",
        displayName: "Le Barman",
        image:
          "http://46.202.168.50:9001/api/v1/buckets/zipette-games/objects/download?preview=true&prefix=bartender.png&version_id=null",
        description: "Propose des mélanges douteux.",
        expectedActions: ["Préparer des cocktails étranges et inhabituels"],
      },
      {
        id: "amoureux",
        displayName: "Les Amoureux",
        image: "https://...",
        description:
          "Deux joueurs choisis par l'application doivent avoir le même verre, même quantité et être dans la même pièce.",
        expectedActions: [
          "Suivre les consignes pour garder une parfaite synchronisation",
        ],
      },
      {
        id: "copieur",
        displayName: "Le Copieur",
        image: "https://...",
        description:
          "Désigne une personne et doit boire à chaque fois que cette personne boit.",
        expectedActions: ["Imiter la consommation d’un joueur désigné"],
      },
      {
        id: "dictateur",
        displayName: "Le Dictateur",
        image: "https://...",
        description: "Impose un shot à une personne toutes les heures.",
        expectedActions: [
          "Désigner une personne pour boire un shot chaque heure",
        ],
      },
      {
        id: "serpillere",
        displayName: "La Serpillière",
        image:
          "https://png.pngtree.com/png-clipart/20240313/original/pngtree-bartender-or-barman-character-png-image_14581474.png",
        description:
          "Bien joué, tu t’es fait avoir ! Tu devras venir nettoyer demain.",
        expectedActions: ["Nettoyer après la soirée"],
      },
      {
        id: "arabe",
        displayName: "L'Arabe",
        image: "https://...",
        description: "Essaye de voler le verre des autres.",
        expectedActions: ["Prendre discrètement le verre des autres joueurs"],
      },
      {
        id: "pyromane",
        displayName: "Le Pyromane",
        image: "https://...",
        description:
          "Doit mettre de la sauce piquante dans les verres des autres.",
        expectedActions: ["Ajouter de la sauce piquante dans les boissons"],
      },
    ],
  },
  object: "Wereworlf",
});
