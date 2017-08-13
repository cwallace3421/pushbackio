const PLAYING = {
	parent: undefined,
	player: undefined,

	init: function() {
		STATE.init();
	},

	preload: function() {
		GAME.time.advancedTiming = true;
		setInterval(() => {
			document.title = "FPS: " + GAME.time.fps;
		}, 100);

		if (location.href.includes('debug=true')) {
			GAME.add.plugin(Phaser.Plugin.Debug);
		}

		GAME.load.spritesheet('character', 'assets/char.png', 3, 8, 4);
		GAME.load.image('shadow', 'assets/shadow.png');
		GAME.load.image('ground_tileset', 'assets/ground_tileset.png');
		GAME.load.spritesheet('pillar_tileset', 'assets/pillar_tileset.png', 48, 96);
	},

	create: function() {
		GAME.world.setBounds(0, 0, (_.TILESIZE * _.WORLDSIZE) * _.ENVSCALE, (_.TILESIZE * _.WORLDSIZE) * _.ENVSCALE);
		GAME.camera.setBoundsToWorld();

		let map = new GameMap('game_map', 'ground_tileset');


		// Creating Tile Map
		// GAME.cache.addTilemap('game_map', null, GENERATE.map(), Phaser.Tilemap.TILED_JSON);
		// let map = GAME.add.tilemap('game_map', 48, 48);
		// map.addTilesetImage('ground_tileset', 'ground_tileset', 48, 48);

		// let layer0 = map.createLayer('floor');
		// layer0.setScale(_.ENVSCALE, _.ENVSCALE);

		// Creating Pillars
		let env = GAME.add.group();
		env.scale.set(_.ENVSCALE);

		let pillar = GAME.add.sprite((6 * (_.TILESIZE)), (6  * (_.TILESIZE)), 'pillar_tileset', 1);
		pillar.anchor = new Phaser.Point(0, 1);
		env.add(pillar);

		// Creating Parent Group
		this.parent = GAME.add.group();
		this.parent.scale.set(_.SCALE);

		// Creating Player
		let shadow = GAME.add.sprite(-1, 8 - 2, 'shadow');
		shadow.alpha = 0.3;
		this.player = GAME.add.sprite(20, 20, 'character', 0);
		this.player.addChild(shadow);
		this.player.animations.add('walk');
		this.parent.add(this.player);
		GAME.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
	},

	resize: function() {
		GAME.scale.setGameSize(window.innerWidth, window.innerHeight);
		GAME.camera.unfollow();
		GAME.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN, 0.2, 0.2);
	},

	update: function() {
		this.playerinput();
	},

	playerinput: function() {
		let cursors = GAME.input.keyboard.createCursorKeys();
		let speed = 1;

		if (cursors.up.isDown) {
			this.player.position.y -= speed;
		} else if (cursors.down.isDown) {
			this.player.position.y += speed;
		}

		if (cursors.left.isDown) {
			this.player.position.x -= speed;
		} else if (cursors.right.isDown) {
			this.player.position.x += speed;
		}

		if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown) {
			this.player.animations.play('walk', 8);
		} else {
			this.player.animations.stop();
			this.player.frame = 0;
		}
	},

};