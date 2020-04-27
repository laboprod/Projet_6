let game = new Game();

// $('.content').hide();
// $('#enterButton').click(function () {
// 	$('#music')[0].play();
// 	$('#intro').hide();
// 	$('.content').show();
// });

$('.content').show();

$('.nameForm').submit(function (e) {
	e.preventDefault();
	let side = $(this).attr('id');
	let name = e.target.querySelector('.playerName').value;
	let player = new Player(name, side);
	game.addPlayer(player);
	if (game.isReady()) {
		game.start();
	}
});
