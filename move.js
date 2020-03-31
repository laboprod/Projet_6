let playerPosition = 'Yoda-cell'.id;

$(document).keydown(function(e) {
	if (e.which == 39) {
		// droite
		playerPosition += 10;
	}
	if (e.which == 37) {
		// gauche
		playerPosition -= 10;
	}
	if (e.which == 38) {
		// haut
		this.playerPosition -= 1;
	}
	if (e.which == 40) {
		// bas
		this.playerPosition += 1;
	}
});

// $(document).keydown(function(e) {
// 	let key = e.keyCode || e.which;
// 	switch (key) {
// 		case 37:
// 			//Move left
// 			$('.Yoda-cell').animate({ left: '-=50px' });
// 			break;
// 		case 39:
// 			//-Move right
// 			$('.Yoda-cell').animate({ left: '+=50px' });
// 			break;
// 		case 38:
// 			//-Move up
// 			$('.Yoda-cell').animate({ top: '-=50px' });
// 			break;
// 		case 40:
// 			//-Move down
// 			$('.Yoda-cell').animate({ top: '+=50px' });
// 			break;
// 		default:
// 			break;
// 	}
// });
