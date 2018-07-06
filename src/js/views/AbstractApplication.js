import * as THREE from 'three'
import 'three/examples/js/controls/FirstPersonControls'

const boundaries = {
  left: -70,
  right: 70,
  up: 70,
  down: -70,
};

class AbstractApplication {
  constructor () {
    this._clock = new THREE.Clock();

    this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this._camera.position.x = -50;
    this._camera.position.y = 10;
    this._camera.position.z = 50;

    this._scene = new THREE.Scene()
    this._camera.lookAt({x: 0, y: 5, z: 0});

    this._renderer = new THREE.WebGLRenderer()
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this._renderer.domElement)

    this._controls = new THREE.FirstPersonControls(this._camera, this._renderer.domElement)
    this._controls.lookSpeed = 0.2;
    this._controls.movementSpeed = 20;
    this._controls.noFly = true;
    this._controls.lookVertical = false;

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  get renderer () {
    return this._renderer
  }

  get camera () {
    return this._camera
  }

  get scene () {
    return this._scene
  }

  onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()

    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate (timestamp) {
    requestAnimationFrame(this.animate.bind(this))
    let delta = this._clock.getDelta();
    this._controls.update(delta);

    if (this._camera.position.x < boundaries.left) {
      this._camera.position.x = boundaries.left;
    }

    if (this._camera.position.x > boundaries.right) {
      this._camera.position.x = boundaries.right;
    }

    if (this._camera.position.z < boundaries.down) {
      this._camera.position.z = boundaries.down;
    }

    if (this._camera.position.z > boundaries.up) {
      this._camera.position.z = boundaries.up;
    }

    this._renderer.render(this._scene, this._camera)
  }
}

export default AbstractApplication
