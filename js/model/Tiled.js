class Tiled {

	constructor() { 
		this.layers = undefined;
		this.tilesize = undefined;
		this.tilesets = undefined;
		this.extension = undefined;
	}

	addLayer(name = REQUIRED(), data = REQUIRED()) {
		let layer = {
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

		if (this.layers && this.layers instanceof Array) {
			this.layers.push(layer);
		} else {
			this.layers = [layer];
		}
	}

	addTileset(name = REQUIRED(), tilesize = REQUIRED(), imagewidth = REQUIRED(), imageheight = REQUIRED(), gid = REQUIRED()) {
		this.tilesize = tilesize;

		let data = {
			firstgid: gid,
			image: name + (this.ext ? this.ext :'.png'),
			name: name,
			tilewidth: tilesize,
			tileheight: tilesize,
			imagewidth: imagewidth,
			imageheight: imageheight,
			margin: 0,
			spacing: 0,
			properties: {},
			tileproperties: {}
		};

		if (this.tilesets && this.tilesets instanceof Array) {
			this.tilesets.push(data);
		} else {
			this.tilesets = [data];
		}
	}

	setExtension(ext = REQUIRED()) {
		this.extension = ext;
	}

	exportObject() {
		return {
			renderorder: 'right-down',
			orientation: 'orthogonal',
			width: _.WORLDSIZE,
			height: _.WORLDSIZE,
			tilewidth: this.tilesize,
			tileheight: this.tilesize,
			layers: this.layers,
			tilesets: this.tilesets
		};
	}
}