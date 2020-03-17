class Personnage {
	constructor(pseudo, age) {
		this.pseudo = pseudo;
		this.age = age;
		this.arme = new Arme('couteau', 10);
		this.pointsDeVie = 100;
		this.nbreCoupRecu = 0;
	}
	recoitCoupPar(attaquant) {
		this.nbreCoupRecu++;

		if (!this.estVivant) {
			throw new Error(this.pseudo + ' est deja mort');
		}
		if (this.pseudo == attaquant.pseudo) {
			throw new Error('je ne peux pas mattaquer moi-meme');
		}
		if (this.age >= 45) {
			attaquant.arme.force * 1.5;
		}

		this.afficher(`
		${this.pseudo} recoit un coup par ${attaquant.pseudo}`);

		this.pointsDeVie -= attaquant.arme.force;

		if (this.pointsDeVie < 0) {
			this.pointsDeVie = 0;
			if (this.nbreCoupRecu > 1) {
				this.afficher(`${this.pseudo} est mort après ${this.nbreCoupRecu} coups.`);
			} else {
				this.afficher(`${this.pseudo} est mort après ${this.nbreCoupRecu} coup.`);
			}
			return;
		}

		return this.pointsDeVie;
	}
	get estVivant() {
		if (this.pointsDeVie <= 0) {
			return false;
		}
		return true;
	}

	afficher(message) {
		document.querySelector('body').innerHTML += message;
	}
	recoitArme(arme) {
		this.arme = arme;
	}
}

class Arme {
	constructor(nom, force) {
		this.nom = nom;
		this.force = force;
	}
}

let couteau = new Arme('couteau', 10);
let hache = new Arme('hache', 20);
let épée = new Arme('épée', 30);

let Roger = new Personnage('Roro', 45);
let Patrick = new Personnage('Patoche', 50);
let Gerard = new Personnage('Gege', 35);

console.log(Patrick.arme);
console.log(Roger.arme);
console.log(Patrick);
Patrick.recoitArme(hache);
console.log(Patrick.arme);
console.log(Patrick.degatArme);
console.log(Roger);
Roger.recoitCoupPar(Patrick);
Patrick.recoitArme(épée);
console.log(Roger.pointsDeVie);
Roger.recoitCoupPar(Patrick);
Roger.recoitCoupPar(Patrick);
Roger.recoitCoupPar(Patrick);
Roger.recoitCoupPar(Patrick);
Roger.recoitCoupPar(Roger);

/*if (victime.pointsDeVie < attaquant.degatArme) {
	victime.pointsDeVie = 0;
}
return (victime.pointsDeVie -= attaquant.degatArme);*/
