const GENERATE = {

	map: function() {
		let mapObj = {
			renderorder: 'right-down',
			orientation: 'orthogonal',
			width: _.WORLDSIZE,
			height: _.WORLDSIZE,
			tilewidth: 48,
			tileheight: 48,
			layers: [
				this._newlayer('floor', this._floor()),
				// this._newlayer('grass', this._grass()),
			],
			tilesets: [
				{
					firstgid: 1,
					image: "ground_tileset.png",
					name: 'ground_tileset',
					tilewidth: 48,
					tileheight: 48,
					imagewidth: 192,
					imageheight: 768,
					margin: 0,
					spacing: 0,
					properties: {},
					tileproperties: {}
				}
			]
		};
		return mapObj;
	},

	_floor: function() {
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
	},

	_grass: function() {
		
		let fillpass = function(seed, size, array, scale, cutoff, subtract) {
			console.log('scale: ' + scale + ' - cutoff: ' + cutoff);
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
		}

		let array = new Array(_.WORLDSIZE);
		for (y = 0; y < _.WORLDSIZE; y++) {
			array[y] = new Array(_.WORLDSIZE);
		}

		// fillpass(Math.random(), _.WORLDSIZE, array, 50, 90, false);
		// fillpass(Math.random(), _.WORLDSIZE, array, 50, 90, false);

		// fillpass(Math.random(), _.WORLDSIZE, array, 50, 60, false);
		// fillpass(Math.random(), _.WORLDSIZE, array, 80, 70, false);
		// fillpass(Math.random(), _.WORLDSIZE, array, 30, 70, true);

		fillpass(Math.random(), _.WORLDSIZE, array, 50, 50, false);
		fillpass(Math.random(), _.WORLDSIZE, array, 60, 50, false);
		fillpass(Math.random(), _.WORLDSIZE, array, 30, 70, true);

		for (let y = 0; y < _.WORLDSIZE; y++) {
			for (let x = 0; x < _.WORLDSIZE; x++) {
				if (array[y][x] == 50 && array[y + 1] && array[y + 1][x] == 0) {
					array[y][x] = this._randomtile([51, 51, 51, 51, 51, 52, 52, 53, 53]) - 1;
				}
			}
		}

		return [].concat(...array);
	},

	_randomtile: function(tiles) {
		return tiles[GAME.rnd.between(0, tiles.length - 1)] + 1;
	},

	_newlayer: function(name, data) {
		return {
					width: _.WORLDSIZE,
					height: _.WORLDSIZE,
					name: name,
					type: 'tilelayer',
					visible: true,
					x: 0,
					y: 0,
					opacity: 1,
					properties: {},
					data: data
				};
	},

};