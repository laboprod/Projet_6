$('.content').hide();
$('#enterButton').click(function() {
	$('#intro').hide();
	$('.content').show();
});

$('#startGame1').click(function() {
	// au clic sur le bouton, on execute la fonction
	player1.name = $('#player1Name').val(); // on récupère le nom saisi dans l'input
	player2.name = $('#player2Name').val();
	$('#showNamePlayer1').text(player1.name); // affiche le nom du joueur sous son personnage
	$('#showNamePlayer2').text(player2.name);
	$('#currentWeaponP1').text('Arme : ' + player1.weapon.name + ' - Dégâts : ' + player1.weapon.damage); // affiche l'arme actuelle
	$('#currentWeaponP2').text('Arme : ' + player2.weapon.name + ' - Dégâts : ' + player2.weapon.damage);
	$('#beforeGameStarts1').hide(); // cache la page où l'on choisi son nom
	$('#beforeGameStarts2').hide();
	$('#intro').hide();
	$('#game').show(); // affiche le jeu
	$('#restartGame').hide(); // cache le bouton recommencer tant que la partie n'est pas fini
});

let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes.
plateau.generer();
plateau.placeBlocks(10); // cree 10 cases grises

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
