let game = new Game();

// $('.content').hide();
// $('#intro').show();

// $('#enterButton').click(function () {
// 	$('#music')[0].play();
// 	$('#intro').hide();
// 	$('.content').show();
// });

$('.nameForm').submit(function (e) {
	e.preventDefault();

	let name = $(this).find('input[name="name"]').val();
	let id = $(this).find('input[name="id"]').val();

	let player = new Player(name, id);

	game.addPlayer(player);
	if (game.isReady()) {
		game.start();
	}
});
