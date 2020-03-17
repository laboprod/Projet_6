// let body = document.getElementsByTagName('body')[0];

// // création des éléments <table> et <tbody>
// table = document.createElement('table');
// tablebody = document.createElement('tbody');

// // création des cellules
// for (let j = 0; j < 10; j++) {
// 	// création d'un élément <tr>
// 	row = document.createElement('tr');

// 	for (let i = 0; i < 10; i++) {
// 		// création d'un élément <td>
// 		cell = document.createElement('td');
// 		// ajoute la cellule <td> à la ligne <tr>
// 		row.appendChild(cell);
// 	}
// 	// ajoute la ligne <tr> à l'élément <tbody>
// 	tablebody.appendChild(row);
// }

// // ajoute <tbody> à l'élément <table>
// table.appendChild(tablebody);
// // ajoute <table> à l'élément <body>
// body.appendChild(table);
// // définit l'attribut border de table à 2;
// table.setAttribute('border', '2');

/***********************************************************************/

class Plateau {
	constructor(rows, cols, blocks) {
		this.rows = rows;
		this.cols = cols;
		this.blocks = blocks;
	}
	genererPlateau() {
		let table = '';
		for (let r = 0; r < this.rows; r++) {
			table += '<tr>';
			for (let c = 0; c < this.cols; c++) {
				let id = String(c) + String(r);
				table += "<td id='" + id + "'></td>"; // donner un Identifiant à chaque case du plateau
			}
			table += '</tr>';
		}
		let tableau = "<table id='plateau'>" + table + '</table>';
		document.getElementById('container').innerHTML = tableau;
	}

	genererBlocks() {}
}
let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes
plateau.genererPlateau();
