let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes.
plateau.generer();
plateau.place(10, 'block'); // cree 10 cases grises

let pistol = new Weapon('pistol', 10);
let rifle = new Weapon('rifle', 20);
let canon = new Weapon('canon', 30);
let sniper = new Weapon('sniper', 40);
let lightsaber = new Weapon('lightsaber', 50);

plateau.placeWeapon(rifle);
plateau.placeWeapon(canon);
plateau.placeWeapon(lightsaber);
plateau.placeWeapon(sniper);

let player1 = new Player('Yoda', 45);
let player2 = new Player('Vador', 40);
plateau.placePlayer(player1);
plateau.placePlayer(player2);

$('#currentWeaponP1').text('Arme : ' + player1.weapon.name + ' - Dégâts : ' + player1.weapon.damage);
$('#currentWeaponP2').text('Arme : ' + player2.weapon.name + ' - Dégâts : ' + player2.weapon.damage);
