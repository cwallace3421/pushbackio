const GENERATE = {

	map: function() {
		let mapObj = {
			renderorder: 'right-down',
			orientation: 'orthogonal',
			width: _.WORLDSIZE,
			height: _.WORLDSIZE,
			tilewidth: 8,
			tileheight: 8,
			layers: [
				this._newlayer('floor', this._floor()),
				this._newlayer('grass', this._grass()),
			],
			tilesets: [
				{
					firstgid: 1,
					image: "floor_tileset.png",
					name: 'floor_tileset',
					tilewidth: 8,
					tileheight: 8,
					imagewidth: 24,
					imageheight: 64,
					margin: 0,
					spacing: 0,
					properties: {},
					tileproperties: {}
				},
				{
					firstgid: 50,
					image: "grass_tileset.png",
					name: 'grass_tileset',
					tilewidth: 8,
					tileheight: 8,
					imagewidth: 64,
					imageheight: 8,
					margin: 0,
					spacing: 0,
					properties: {},
					tileproperties: {}
				}
			]
		};
		return mapObj;
	},

	_floor: function(data) {

		let randomtile = function(tiles) {
			return tiles[GAME.rnd.between(0, tiles.length - 1)];
		};
		
		let array = new Array(_.WORLDSIZE);
		for (y = 0; y < _.WORLDSIZE; y++) {
			array[y] = new Array(_.WORLDSIZE);
		}

		for (let gy = 0; gy < (_.WORLDSIZE / 3); gy++) {
			for (let gx = 0; gx < (_.WORLDSIZE / 3); gx++) {
				let ox = gx * 3;
				let oy = gy * 3;

				array[0 + oy][0 + ox] = this._randomtile([0, 0, 0, 9]);
				array[0 + oy][1 + ox] = this._randomtile([1, 1, 1, 10]);
				array[0 + oy][2 + ox] = this._randomtile([2, 2, 2, 11]);

				array[1 + oy][0 + ox] = this._randomtile([3, 3, 3, 12]);
				array[1 + oy][1 + ox] = this._randomtile([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13]);
				array[1 + oy][2 + ox] = this._randomtile([5, 5, 5, 14]);

				array[2 + oy][0 + ox] = this._randomtile([6, 6, 6, 15]);
				array[2 + oy][1 + ox] = this._randomtile([7, 7, 7, 16]);
				array[2 + oy][2 + ox] = this._randomtile([8, 8, 8, 17]);
			}
		}

		return [].concat(...array);
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