class GameMap {

	constructor(name = REQUIRED(), tileimagename = REQUIRED()) {
		this.name = name;
		this.tileimagename = tileimagename;
		this.map = undefined;
		this.layer = undefined;
		this.tiled = undefined;
		this.pillars = undefined;

		GAME.cache.addTilemap(this.name, null, this._getMap(), Phaser.Tilemap.TILED_JSON);
		this.map = GAME.add.tilemap(this.name, this.tiled.tilesize, this.tiled.tilesize);
		this.map.addTilesetImage(this.tileimagename, this.tileimagename, this.tiled.tilesize, this.tiled.tilesize);
		this.layer = this.map.createLayer(this.tiled.layers[0].name);
		this.layer.setScale(_.ENVSCALE, _.ENVSCALE);
	}

	_getMap() {
		this.tiled = new Tiled();
		this.tiled.addLayer('floor', this._generateFloor());
		this.tiled.addTileset(this.tileimagename, 48, 192, 768, 1);
		return this.tiled.exportObject();
	}

	_generateFloor() {
		let randomtile = function(tiles) {
			let tile = tiles[GAME.rnd.between(0, tiles.length - 1)];
			let altchance = GAME.rnd.between(0, 100);
			if (altchance > 89) {
				tile += 12;
			}
			let variationchance = GAME.rnd.between(0, 100);
			if (variationchance > 90) {
				tile += 8;
			} else if (variationchance > 60) {
				tile += 4;
			}
			return tile + 1;
		};
		
		let data = [];
		for (let i = 0; i < _.WORLDSIZE * _.WORLDSIZE; i++) {
			data[i] = randomtile([0, 1, 1, 2, 3, 3]);
		}

		return data;
	}

	_generateGrass() {
		let fillpass = function(seed, size, array, scale, cutoff, subtract) {
			noise.seed(seed);
			for (let y = 0; y < size; y++) {
				for (let x = 0; x < size; x++) {

					let tile = Math.abs(noise.perlin2(x / scale, y / scale)) * 256;
					tile = tile >= cutoff ? 50 : 0;
					
					if (subtract) {
						if (tile == 50) {
							array[y][x] = 0;
						}
					} else {
						array[y][x] = tile;
					}
				}
			}
		};

		let randomtile = function(tiles) {
			return tiles[GAME.rnd.between(0, tiles.length - 1)] + 1;
		}

		let array = new Array(_.WORLDSIZE);
		for (y = 0; y < _.WORLDSIZE; y++) {
			array[y] = new Array(_.WORLDSIZE);
		}

		fillpass(Math.random(), _.WORLDSIZE, array, 50, 50, false);
		fillpass(Math.random(), _.WORLDSIZE, array, 60, 50, false);
		fillpass(Math.random(), _.WORLDSIZE, array, 30, 70, true);

		for (let y = 0; y < _.WORLDSIZE; y++) {
			for (let x = 0; x < _.WORLDSIZE; x++) {
				if (array[y][x] == 50 && array[y + 1] && array[y + 1][x] == 0) {
					array[y][x] = randomtile([51, 51, 51, 51, 51, 52, 52, 53, 53]) - 1;
				}
			}
		}

		return [].concat(...array);
	}
};