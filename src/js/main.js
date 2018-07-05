import * as THREE from 'three'
import AbstractApplication from 'views/AbstractApplication'
import shaderVert from 'shaders/custom.vert'
import shaderFrag from 'shaders/custom.frag'

class Main extends AbstractApplication {
  constructor () {
    super()

    var axes = new THREE.AxisHelper( 20 );
    this._scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(150, 150, 1, 1);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xB27752, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    this._scene.add(plane);

    this.buildDisplayArea({x: -20, y: -20});
    this.buildDisplayArea({x: 15, y: 15});
    this.buildDisplayArea({x: 50, y: 50});

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, side: THREE.DoubleSide});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    this._scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    this._scene.add(sphere);
    this.animate()
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

  buildDisplayArea(position) {
    for(let i = 0; i < 4; i++) {
      var planeGeometry = new THREE.PlaneGeometry(30, 20, 0, 0);
      var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
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
}

export default Main
