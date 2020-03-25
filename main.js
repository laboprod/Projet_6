// let Roger = new Personnage('Roro', 45);
// let Patrick = new Personnage('Patoche', 50);
// let Gerard = new Personnage('Gege', 35);

let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes.
plateau.generer();
plateau.place(10, 'block'); // cree 10 cases grises

let couteau = new Weapon('couteau', 10);
let hache = new Weapon('hache', 20);
let épée = new Weapon('épée', 30);

plateau.placeWeapon(hache);
plateau.placeWeapon(couteau);

let Roger = new Warrior('Roro', 45);
plateau.placeWarrior(Roger);
