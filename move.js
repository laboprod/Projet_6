$(document).keydown(function(e) {
	if (e.which == 39) {
		// droite
		player.cellId += 10;
	}
	if (e.which == 37) {
		// gauche
		player.cellId -= 10;
	}
	if (e.which == 38) {
		// haut
		player.cellId -= 1;
	}
	if (e.which == 40) {
		// bas
		player.cellId += 1;
	}
});
