let SLICKUI;
const WELCOME = {

	init: function() {
		STATE.init();
	},

	preload: function() {
		GAME.add.plugin(PhaserInput.Plugin);
		GAME.load.image('test', 'assets/phaser.png');
	},

	create: function() {
		GAME.add.sprite((GAME.width / 2), (GAME.height / 2), 'test').anchor.setTo(0.5, 0.5);
		let input = GAME.add.inputField(10, 90, {
			font: '18px Roboto',
			fill: '#212121',
			fontWeight: 'bold',
			width: 150,
			padding: 8,
			borderWidth: 1,
			borderColor: '#000',
			borderRadius: 6,
			placeHolder: 'Password',
			type: PhaserInput.InputType.text
		});
	},

	update: function() {

	},

	resize: function() {
		GAME.scale.setGameSize(window.innerWidth, window.innerHeight);
	},

};