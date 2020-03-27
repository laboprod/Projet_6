class Player {
	constructor(name, age) {
		this.name = name;
		this.age = age;
		this.weapon = new Weapon('pistol', 10);
		this.health = 100;
		this.nbreCoupRecu = 0;
	}
	recoitCoupPar(attaquant) {
		this.nbreCoupRecu++;

		if (!this.estVivant) {
			throw new Error(this.name + ' est deja mort');
		}
		if (this.name == attaquant.name) {
			throw new Error('je ne peux pas mattaquer moi-meme');
		}
		if (this.age >= 45) {
			attaquant.weapon.damage * 1.5;
		}

		this.afficher(`
		${this.name} recoit un coup par ${attaquant.name}`);

		this.health -= attaquant.weapon.damage;
		$('#pb-player1')
			.css('width', this.health + '%')
			.text(this.health);

		if (this.health < 0) {
			this.health = 0;
			if (this.nbreCoupRecu > 1) {
				this.afficher(`${this.name} est mort après ${this.nbreCoupRecu} coups.`);
			} else {
				this.afficher(`${this.name} est mort après ${this.nbreCoupRecu} coup.`);
			}
			return;
		}

		return this.health;
	}
	get estVivant() {
		if (this.health <= 0) {
			return false;
		}
		return true;
	}

	afficher(message) {
		document.querySelector('body').innerHTML += message;
	}
	getNewWeapon(weapon) {
		this.weapon = weapon;
	}
}
