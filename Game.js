class Game {
	constructor(playersQty = 2) {
		this.playersQty = playersQty;
		this.players = [];
		this.turn = 1;
	}

	// chooseWhoStarts() {
	// 	let playerTurn = 0;
	// 	playerTurn = Math.floor(Math.random() * 2);
	// 	if (playerTurn < 1) {
	// 		player = player1;
	// 	}
	// 	player = player2;
	// }

	isReady() {
		return this.players.length === this.playersQty;
	}

	addPlayer(player) {
		this.players.push(player);
	}

	start() {
		let player1 = this.players[0];
		let player2 = this.players[1];
		$('#showNamePlayer1').text(player1.name); // affiche le nom du joueur sous son personnage
		$('#showNamePlayer2').text(player2.name);
		$('#currentWeaponP1').text('Arme : ' + player1.weapon.name + ' - Dégâts : ' + player1.weapon.damage); // affiche l'arme actuelle
		$('#currentWeaponP2').text('Arme : ' + player2.weapon.name + ' - Dégâts : ' + player2.weapon.damage);
		$('#beforeGameStarts1').hide(); // cache la page où l'on choisi son nom
		$('#beforeGameStarts2').hide();
		$('#intro').hide();
		// $('#music')[0].pause();
		$('#game').fadeIn(2000); // affiche le jeu
		$('#restartGame').hide(); // cache le bouton recommencer tant que la partie n'est pas fini

		let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes.
		plateau.generer();
		plateau.placeBlocks(10); // cree 10 cases grises

		let rifle = new Weapon('rifle', 20);
		let canon = new Weapon('canon', 30);
		let sniper = new Weapon('sniper', 40);
		let lightsaber = new Weapon('lightsaber', 50);

		plateau.placeWeapon(rifle);
		plateau.placeWeapon(canon);
		plateau.placeWeapon(lightsaber);
		plateau.placeWeapon(sniper);
		plateau.placePlayer(player1);
		plateau.placePlayer(player2);
		player1.play();
	}
}
