import * as THREE from 'three'
import AbstractApplication from 'views/AbstractApplication'
import shaderVert from 'shaders/custom.vert'
import shaderFrag from 'shaders/custom.frag'

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration, delayCount, stopTile) {
  // note: texture passed by reference, will be updated by the update function.

  this.tilesHorizontal = tilesHoriz;
  this.tilesVertical = tilesVert;
  // how many images does this spritesheet contain?
  //  usually equals tilesHoriz * tilesVert, but not necessarily,
  //  if there at blank tiles at the bottom of the spritesheet.
  this.numberOfTiles = numTiles;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

  // how long should each image be displayed?
  this.tileDisplayDuration = tileDispDuration;

  // how long has the current image been displayed?
  this.currentDisplayTime = 0;
  this.delayTime = delayCount | 0;

  // which image is currently being displayed?
  this.currentTile = 0;
  this.stopTile = stopTile;

  this.update = function (milliSec) {
    this.currentDisplayTime += milliSec;

    while (this.currentDisplayTime > this.tileDisplayDuration) {
      if (this.currentTile == this.stopTile) {
        if (this.currentDisplayTime >= this.delayTime) {
          this.currentDisplayTime = 0;
        }
        else {
          return;
        }
      }
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;
      if (this.currentTile >= this.numberOfTiles)
        this.currentTile = 0;

      var currentColumn = this.currentTile % this.tilesHorizontal;
      texture.offset.x = currentColumn / this.tilesHorizontal;
      var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
      texture.offset.y = 1 - currentRow / this.tilesVertical;
    }

    // if (this.currentTile == (this.numberOfTiles - 1) && this.currentDisplayTime > this.delayTime) {
    //   this.currentTile = 0;
    //   this.currentDisplayTime = 0;
    // }
  }
};

class Main extends AbstractApplication {
  constructor() {
    super()

    var planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
    this.animatedTextures = [];

    const texture = new THREE.TextureLoader().load('static/textures/wood5.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    this._scene.add(plane);

    this.buildGalleryWalls();
    this.buildDisplayArea({ x: -30, y: -30 });
    this.buildDisplayArea({ x: 15, y: 15 });
    this.buildDisplayArea({ x: 70, y: 70 });
    this.loadArtWork('static/artwork/leaf.png', { x: -32, z: -14.9, rotation: 0 }, { scale: 60 });
    this.loadArtWork('static/artwork/artist_family_sketch.png', { x: -80, z: -99.8, rotation: 0 }, { scale: 20 });
    this.loadArtWork('static/artwork/m&msandwich.png', { x: 80, z: 99.8, rotation: 0 }, { scale: 28 });
    this.loadArtWork('static/artwork/thor_hammer.png', { x: 80, z: 85.1, rotation: 0 }, { scale: 120 });
    this.loadArtWork('static/artwork/michael_myers.png', { x: 77, z: 54.8, rotation: Math.PI }, { scale: 30 });
    this.loadArtWork('static/artwork/SweetTooth.png', { x: 63, z: 54.8, rotation: Math.PI }, { scale: 9 });
    this.loadArtWork('static/artwork/stilllifefemale.png', { x: 40, z: 99.8, rotation: 0 }, { scale: 28 });
    this.loadArtWork('static/artwork/nightbeach.png', { x: -60, z: 99.8, rotation: 0 }, { scale: 30 });
    this.loadArtWork('static/artwork/opticalillusion.png', { x: 0, z: 99.8, rotation: 0 }, { scale: 40 });
    this.loadArtWork('static/artwork/portrait_purple.png', { x: -40, z: -99.8, rotation: 0 }, { scale: 8 });
    this.loadArtWork('static/artwork/doghouse.png', { x: -60, z: -99.8, rotation: 0 }, { scale: 80 });
    this.loadArtWork('static/artwork/totoro.png', { x: -14.875, z: -29.4, rotation: Math.PI / 2 }, { scale: 30 });
    this.loadArtWork('static/artwork/plaza_lights.png', { x: -99.125, z: 5.125, rotation: Math.PI / 2 }, { scale: 13 });
    this.loadArtWork('static/artwork/night_tokyo.png', { x: -99.125, z: -30.125, rotation: Math.PI / 2 }, { scale: 28 });
    this.loadArtWork('static/artwork/loft-scene.png', { x: -99.125, z: -50.125, rotation: Math.PI / 2 }, { scale: 28 });
    this.loadArtWork('static/artwork/kc_fountain.png', { x: 99.125, z: 5.125, rotation: - Math.PI / 2 }, { scale: 50 });
    this.loadArtWork('static/artwork/hear_broken.png', { x: 99.125, z: 35.125, rotation: - Math.PI / 2 }, { scale: 15 });
    this.loadArtWork('static/artwork/another_bird.png', { x: 99.125, z: -25.125, rotation: - Math.PI / 2 }, { scale: 30 });
    this.loadArtWork('static/artwork/isabelle_camping.png', { x: 30.125, z: 15.125, rotation: Math.PI / 2 }, { scale: 20 });
    this.loadArtWork('static/artwork/wishbone.png', { x: 22.125, z: -0.125, rotation: - Math.PI }, { scale: 20 });
    this.loadArtWork('static/artwork/Ruby.png', { x: 7.125, z: -0.125, rotation: - Math.PI }, { scale: 40 });

    this.loadAnimatedArtwork(
      'static/artwork/animated_hair.png',
      { x: -20, z: -99.8, rotation: 0 },
      { frameCount: 16, horizTiles: 16, vertTiles: 1, tileCount: 16, delayCount: 33 },
    );
    this.loadAnimatedArtwork(
      'static/artwork/ice_cream.png',
      { x: -45.125, z: -28.4, rotation: Math.PI / 2 },
      { frameCount: 9, horizTiles: 9, vertTiles: 1, tileCount: 9, delayCount: 33, stopTile: 8 },
    );
    this.loadAnimatedArtwork(
      'static/artwork/egghero.png',
      { x: 20, z: -99.8, rotation: 0 },
      { frameCount: 25, horizTiles: 5, vertTiles: 4, tileCount: 20, delayCount: 60, scale: 60, stopTile: 4 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/legoman.png',
      { x: 60, z: -99.8, rotation: 0 },
      { frameCount: 43, horizTiles: 5, vertTiles: 9, tileCount: 43, delayCount: 60, scale: 60, stopTile: 43 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/melting_snowman.png',
      { x: 54.8, z: 69.8, rotation: Math.PI / 2 },
      { frameCount: 43, horizTiles: 5, vertTiles: 9, tileCount: 43, delayCount: 60, scale: 17, stopTile: 43 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/bert.png',
      { x: -0.125, z: 15.125, rotation: -Math.PI / 2 },
      { frameCount: 6, horizTiles: 6, vertTiles: 1, tileCount: 6, scale: 30 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/garfieldphone.png',
      { x: 15.125, z: 30.125, rotation: 0 },
      { frameCount: 9, horizTiles: 3, vertTiles: 3, tileCount: 9, scale: 31, stopTile: 2, delayCount: 60 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/yawning.png',
      { x: -99.125, z: 35.125, rotation: Math.PI / 2 },
      { frameCount: 12, horizTiles: 4, vertTiles: 3, tileCount: 12, scale: 60, stopTile: 10, delayCount: 60 },
    );

    this.loadAnimatedArtwork(
      'static/artwork/slinky_stairs.png',
      { x: -99.125, z: 55.125, rotation: Math.PI / 2 },
      { frameCount: 8, horizTiles: 4, vertTiles: 2, tileCount: 8, scale: 32 },
    );

    this.animate();
  }

  setupPlanes() {
    var planeGeometry = new THREE.PlaneGeometry(30, 20, 0, 0);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = 0;
    plane.position.x = 15;
    plane.position.y = 10;
    plane.position.z = 0;

    this._scene.add(plane);
  }

  buildGalleryWalls() {
    for (let i = 0; i < 4; i++) {
      var planeGeometry = new THREE.PlaneGeometry(200, 20, 0, 0);
      var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xf2f2f2, side: THREE.DoubleSide });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.rotation.y = i / 2 * Math.PI;

      plane.position.y = 10;

      switch (i) {
        case 0:
          plane.position.x = 0;
          plane.position.z = 100;
          break;
        case 1:
          plane.position.x = -100;
          plane.position.z = 0;
          break;
        case 2:
          plane.position.x = 0;
          plane.position.z = -100;
          break;
        case 3:
          plane.position.x = 100;
          plane.position.z = 0;
          break;
      }

      this._scene.add(plane);
    }
  }

  buildDisplayArea(position) {
    for (let i = 0; i < 4; i++) {
      var planeGeometry = new THREE.PlaneGeometry(30, 20, 0, 0);
      var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xf2f2f2, side: THREE.DoubleSide });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.rotation.y = i / 2 * Math.PI;

      plane.position.y = 10;

      switch (i) {
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
    var roofMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
    var roofPlane = new THREE.Mesh(roofPlaneGeometry, roofMaterial);

    roofPlane.position.y = 10;
    roofPlane.position.x = position.x;
    roofPlane.position.z = position.y;
    roofPlane.rotation.x = Math.PI * 0.5;
    this._scene.add(roofPlane);

  }

  loadArtWork(source, position, data = {}) {
    var artwork = new Image();
    var ratiow = 0;
    var ratioh = 0;

    var source = source;
    artwork.src = source;

    var texture = THREE.ImageUtils.loadTexture(artwork.src);
    texture.minFilter = THREE.LinearFilter;
    var img = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    artwork.onload = () => {
      ratiow = artwork.width / (data.scale || 15);
      ratioh = artwork.height / (data.scale || 15);
      // plane for artwork
      let plane = new THREE.Mesh(new THREE.PlaneGeometry(ratiow, ratioh), img); //width, height
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
    var annie = new TextureAnimator(texture, data.horizTiles, data.vertTiles, data.tileCount, 3, data.delayCount, data.stopTile);
    texture.minFilter = THREE.LinearFilter;
    var img = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    artwork.onload = () => {
      ratiow = Math.floor(artwork.width / (data.scale | 15) / data.horizTiles);
      ratioh = Math.floor(artwork.height / (data.scale | 15) / data.vertTiles);
      // plane for artwork
      let plane = new THREE.Mesh(new THREE.PlaneGeometry(ratiow, ratioh), img); //width, height
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
