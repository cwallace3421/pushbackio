const TESTNOISE = {
	bitmap: undefined,
	parent: undefined,

	init: function() {
		STATE.init();
	},

	preload: function() {

	},

	create: function() {
		this.parent = GAME.add.group();
		// this.parent.scale.set(16);

		noise.seed(Math.random());
		let size = _.WORLDSIZE;

		this.bitmap = GAME.add.bitmapData(size, size);
		
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				let c = Math.abs(noise.perlin2(x / 50, y / 50)) * 256;
				c = c >= 60 ? 255 : 0;
				if (c !== 0) {
					this.bitmap.setPixel(x, y, c, c, c, 1, false);
				}
			}
		}

		noise.seed(Math.random());
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				let c = Math.abs(noise.perlin2(x / 80, y / 80)) * 256;
				c = c >= 70 ? 255 : 0;
				if (c !== 0) {
					this.bitmap.setPixel(x, y, c, c, c, 1, false);
				}
			}
		}
		
		// noise.seed(Math.random());
		// for (let y = 0; y < size; y++) {
		// 	for (let x = 0; x < size; x++) {
		// 		let c = Math.abs(noise.perlin2(x / 60, y / 60)) * 256;
		// 		c = c >= 100 ? 255 : 0;
		// 		if (c !== 0) {
		// 			this.bitmap.setPixel(x, y, c, c, c, 1, false);
		// 		}
		// 	}
		// }

		noise.seed(Math.random());
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				let c = Math.abs(noise.perlin2(x / 30, y / 30)) * 256;
				c = c >= 70 ? 0 : 255;
				if (c !== 255 && this.bitmap.getPixel(x, y).r == 255) {
					this.bitmap.setPixel(x, y, c, c, c, 1, false);
				}
			}
		}

		this.bitmap.render();

		this.parent.add(GAME.add.sprite(0, 0, this.bitmap));
	},

	resize: function() {
		GAME.scale.setGameSize(window.innerWidth, window.innerHeight);
	},

	update: function() {

	},

};