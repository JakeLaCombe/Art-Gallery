import * as THREE from 'three'
import AbstractApplication from 'views/AbstractApplication'
import shaderVert from 'shaders/custom.vert'
import shaderFrag from 'shaders/custom.frag'

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
	// note: texture passed by reference, will be updated by the update function.

	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet.
	this.numberOfTiles = numTiles;
	texture.wrapS = THREE.RepeatWrapping;
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;

	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
  }
};

class Main extends AbstractApplication {
  constructor () {
    super()

    var planeGeometry = new THREE.PlaneGeometry(150, 150, 1, 1);
    this.animatedTextures = [];

    const texture = new THREE.TextureLoader().load('static/textures/wood5.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 8, 8 );
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    this._scene.add(plane);

    this.buildGalleryWalls();
    this.buildDisplayArea({x: -20, y: -20});
    this.buildDisplayArea({x: 15, y: 15});
    this.buildDisplayArea({x: 50, y: 50});
    this.loadArtWork('static/artwork/chucky.png', {x: -20, z: -4.9, rotation: 0});
    this.loadAnimatedArtwork(
      'static/artwork/animated_hair.png',
      {x: -20, z: -70, rotation: 0},
      {frameCount: 16, horizTiles: 16, vertTiles: 1, tileCount: 16},
    );
    this.loadAnimatedArtwork(
      'static/artwork/ice_cream.png',
      {x: -35.125, z: -20.4, rotation: Math.PI / 2},
      {frameCount: 9, horizTiles: 9, vertTiles: 1, tileCount: 9},
    );

    this.animate();
  }

  setupPlanes() {
    var planeGeometry = new THREE.PlaneGeometry(30, 20, 0, 0);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = 0;
    plane.position.x = 15;
    plane.position.y = 10;
    plane.position.z = 0;

    this._scene.add(plane);
  }

  buildGalleryWalls() {
    for(let i = 0; i < 4; i++) {
      var planeGeometry = new THREE.PlaneGeometry(150, 20, 0, 0);
      var planeMaterial = new THREE.MeshBasicMaterial({color: 0xf2f2f2, side: THREE.DoubleSide});
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.rotation.y = i / 2 * Math.PI;

      plane.position.y = 10;

      switch(i)
      {
        case 0:
          plane.position.x = 0;
          plane.position.z = 75;
          break;
        case 1:
          plane.position.x = -75;
          plane.position.z = 0;
          break;
        case 2:
          plane.position.x = 0;
          plane.position.z = -75;
          break;
        case 3:
          plane.position.x = 75;
          plane.position.z = 0;
          break;
      }

      this._scene.add(plane);
    }
  }

  buildDisplayArea(position) {
    for(let i = 0; i < 4; i++) {
      var planeGeometry = new THREE.PlaneGeometry(30, 20, 0, 0);
      var planeMaterial = new THREE.MeshBasicMaterial({color: 0xf2f2f2, side: THREE.DoubleSide});
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.rotation.y = i / 2 * Math.PI;

      plane.position.y = 10;

      switch(i)
      {
        case 0:
          plane.position.x = position.x;
          plane.position.z = position.y + 15;
          break;
        case 1:
          plane.position.x = position.x + 15;
          plane.position.z = position.y;
          break;
        case 2:
          plane.position.x = position.x;
          plane.position.z = position.y - 15;
          break;
        case 3:
          plane.position.x = position.x - 15;
          plane.position.z = position.y;
          break;
      }

      this._scene.add(plane);
    }

    let roofPlaneGeometry = new THREE.PlaneGeometry(30, 30, 0, 0);
    var roofMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
    var roofPlane = new THREE.Mesh(roofPlaneGeometry, roofMaterial);

    roofPlane.position.y = 10;
    roofPlane.position.x = position.x;
    roofPlane.position.z = position.y;
    roofPlane.rotation.x = Math.PI * 0.5;
    this._scene.add(roofPlane);

  }

  loadArtWork(source, position) {
    var artwork = new Image();
		var ratiow = 0;
		var ratioh = 0;

		var source = source;
		artwork.src = source;

    var texture = THREE.ImageUtils.loadTexture(artwork.src);
    texture.minFilter = THREE.LinearFilter;
		var img = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    artwork.onload = () => {
			ratiow = artwork.width/15;
			ratioh = artwork.height/15;
			// plane for artwork
			let plane = new THREE.Mesh(new THREE.PlaneGeometry(ratiow, ratioh),img); //width, height
			plane.overdraw = true;
                  //-1 because index is 0 - n-1 but num of paintings is n
      plane.rotation.y = position.rotation;
		  plane.position.x = position.x;
      plane.position.y = 10;
      plane.position.z = position.z;

			this._scene.add(plane);
		}

		img.map.needsUpdate = true; //ADDED
  }

  loadAnimatedArtwork(source, position, data) {
    var artwork = new Image();
		var ratiow = 0;
		var ratioh = 0;

		var source = source;
		artwork.src = source;

    var texture = THREE.ImageUtils.loadTexture(artwork.src);
    var annie = new TextureAnimator( texture, data.horizTiles, data.vertTiles, data.tileCount, 2);
    texture.minFilter = THREE.LinearFilter;
		var img = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    artwork.onload = () => {
			ratiow = Math.floor(artwork.width / 15 / data.frameCount);
			ratioh = Math.floor(artwork.height / 15);
			// plane for artwork
			let plane = new THREE.Mesh(new THREE.PlaneGeometry(ratiow, ratioh),img); //width, height
                  //-1 because index is 0 - n-1 but num of paintings is n
      plane.rotation.y = position.rotation;

		  plane.position.x = position.x;
      plane.position.y = 10;
      plane.position.z = position.z;

			this._scene.add(plane);
      this.animatedTextures.push(annie);
		}

		img.map.needsUpdate = true; //ADDED
  }

  animate(timestamp) {
    super.animate(timestamp);
    let delta = this._clock.getDelta();

    for (let i = 0; i < this.animatedTextures.length; i++) {
      this.animatedTextures[i].update(1000 * delta);
    }
  }
}

export default Main;