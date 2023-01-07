# Réservation des Terrains

Cette application est  dédiée aux opérations sur le terrain simplifient les processus pour permettre aux utilisateurs de mener à bien leurs tâches. Les applications de terrain utilisent les technologies de localisation pour la collecte de données, la coordination des équipes, le calcul d’itinéraire et la navigation, ainsi que le suivi de la localisation du personnel pour rationaliser les opérations sur le terrain.

# Fonctionnalités

## Administrateur : (Spring boot / Angular)
• Gestion des villes 
• Gestion des zones 
• Gestion des Résérvations
• Afficher la liste des Terrains  
• Validation des Terrains 
• Afficher l’historique des résérvation d’un terrain
• Statistiques :
 Afficher le nombre des Terrains au fontion des tarifs et d'état par des charts.


# Mise en place du projet

Pour mettre en place ce projet, vous aurez besoin des éléments suivants :

- Un éditeur de code (comme Visual Studio Code)
- Un SGBD (comme MySQL)
- un backend springboot
- un browser (google chrome,Firefox, ...)
# Déploiement

Pour déployer ce projet sur votre serveur d'application, suivez les étapes suivantes :

- Clonez ce dépôt sur votre ordinateur : git clone https://github.com/hamzakarouane/FrontEnd.git
- Installez les dépendances du frontend en utilisant la commande npm install dans le répertoire frontend.
- Installez les dépendances du backend en utilisant la commande mvn install dans le répertoire backend.
- Créez un fichier de configuration application.properties dans le répertoire backend/src/main/resources et configurez les paramètres de connexion à votre base de données MySQL.
- Lancez l'application en exécutant la commande mvn spring-boot:run dans le répertoire backend.
- Ouvrez un navigateur web et accédez à l'adresse http://localhost:4200 pour utiliser l'application.


## Architecture du projet :
L'application est divisée en deux parties : le frontend, codé en Angular, et le backend, codé en Spring Boot. Le backend utilise également une base de données MySQL pour stocker les données de l'application.

Le frontend et le backend communiquent via des API REST. Le frontend envoie des requêtes HTTP au backend, qui réalise les opérations souhaitées sur la base de données et renvoie les résultats au frontend sous forme de JSON.

![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/angular-spring-boot-mysql.png?raw=true)


## Interfaces 

-> interface Admin 1:
![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/admin1.jpeg?raw=true)

-> interface Admin 2:
![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/admin2.jpeg?raw=true)

-> interface Admin 3:
![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/admin3.jpeg?raw=true)

-> Dashboard :
![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/dashboard.jpeg?raw=true)

-> Localisation :
![App Screenshot](https://github.com/hamzakarouane/hh/blob/master/screenshots/localisation.jpeg?raw=true)


## Authors

Ce projet a été réalisé par : 
- KAROUANE Hamza
- KADIRI Meriem 
- LAYOUNE Ghita 

## License

Tous droits sont présérvées.


