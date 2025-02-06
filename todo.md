# To Do Mobile
## Authentification 
- [] fournisseur identité (Symfony)
    - [] classe JetonUtilisateur : Utilisateur, string jeton
    - [] login mobile sans pin (API) => retourne JetonUtilisateur 

- [] crypto web (springboot)
    - [] classe JetonUtilisateur : Utilisateur, string jeton
    - [] login mobile (API) => appel api symfony , retourne JetonUtilisateur

- [] crypto mobile
    - [] model Utilisateur : id, nom, mail, mdp
    - [] model JetonUtilisateur : utilisateur, string jeton
    - [] fonction check login => appel api springboot (retourne JetonUtilisateur), mettre l'utilisateur et le jeton dans AsyncStorage pour données simple
    
