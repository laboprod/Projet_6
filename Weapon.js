class Weapon {
	constructor(name, damage) {
		this.name = name;
		this.damage = damage;
		this.position = null;
	}
}

let weapons = [];

let weaponList = {
	names: ['pistol', 'rifle', 'canon', 'sniper', 'lightsaber'],
	damages: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

function selectRandomAttributes(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function generateUniqueWeapon(attributes) {
	let weapon = {};
	for (let i = 0; i < attributes.length; i++) {
		let attribute = selectRandomAttributes(attributes[i]);
		weapon = weapon + attribute;
	}
	if (!weapons.includes(weapon)) {
		weapons.push(weapon);
	} else {
		generateUniqueWeapon(attributes);
	}
	return weapon;
}

function generateweapons(qty) {
	weapons = [];
	for (i = 0; i < qty; i++) {
		weapon = generateUniqueWeapon(weaponList);
	}
	return weaponList;
}
