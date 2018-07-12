webpackJsonp([1],{"8reM":function(e,i){e.exports="#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1_1(vec3 x) {\n  return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1_1( permute_1_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n\nvoid main() {\n\n  float brightness = snoise_1_2(gl_FragCoord.xx);\n\n    gl_FragColor = vec4(vec3(brightness), 1.0);\n    //gl_FragColor = vec4(vec3(1.,1.,0.), 1.0);\n\n}"},TAWV:function(e,i){e.exports="#define GLSLIFY 1\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}"},eslX:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});t("pTlp");var n=t("Zx67"),o=t.n(n),r=t("Zrlr"),a=t.n(r),s=t("wxAW"),l=t.n(s),c=t("zwoO"),h=t.n(c),d=t("yEsh"),x=t.n(d),p=t("Pf15"),m=t.n(p),u=t("Ml+6"),y=(t("mUWB"),-70),v=70,w=70,_=-70,f=function(){function e(){a()(this,e),this._clock=new u.Clock,this._camera=new u.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1e3),this._camera.position.x=-50,this._camera.position.y=10,this._camera.position.z=50,this._scene=new u.Scene,this._camera.lookAt({x:0,y:5,z:0}),this._renderer=new u.WebGLRenderer,this._renderer.setPixelRatio(window.devicePixelRatio),this._renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this._renderer.domElement),this._controls=new u.FirstPersonControls(this._camera,this._renderer.domElement),this._controls.lookSpeed=.2,this._controls.movementSpeed=20,this._controls.noFly=!0,this._controls.lookVertical=!1,window.addEventListener("resize",this.onWindowResize.bind(this),!1)}return l()(e,[{key:"onWindowResize",value:function(){this._camera.aspect=window.innerWidth/window.innerHeight,this._camera.updateProjectionMatrix(),this._renderer.setSize(window.innerWidth,window.innerHeight)}},{key:"animate",value:function(e){requestAnimationFrame(this.animate.bind(this));var i=this._clock.getDelta();this._controls.update(i),this._camera.position.x<y&&(this._camera.position.x=y),this._camera.position.x>v&&(this._camera.position.x=v),this._camera.position.z<_&&(this._camera.position.z=_),this._camera.position.z>w&&(this._camera.position.z=w),this._renderer.render(this._scene,this._camera)}},{key:"renderer",get:function(){return this._renderer}},{key:"camera",get:function(){return this._camera}},{key:"scene",get:function(){return this._scene}}]),e}();t("TAWV"),t("8reM");new(function(e){function i(){a()(this,i);var e=h()(this,(i.__proto__||o()(i)).call(this)),t=new u.PlaneGeometry(150,150,1,1);e.animatedTextures=[];var n=(new u.TextureLoader).load("static/textures/wood5.png");n.wrapS=u.RepeatWrapping,n.wrapT=u.RepeatWrapping,n.repeat.set(8,8);var r=new u.MeshBasicMaterial({map:n,side:u.DoubleSide}),s=new u.Mesh(t,r);return s.rotation.x=-.5*Math.PI,e._scene.add(s),e.buildGalleryWalls(),e.buildDisplayArea({x:-20,y:-20}),e.buildDisplayArea({x:15,y:15}),e.buildDisplayArea({x:50,y:50}),e.loadArtWork("static/artwork/chucky.png",{x:-20,z:-4.9,rotation:0}),e.loadAnimatedArtwork("static/artwork/animated_hair.png",{x:-20,z:-70,rotation:0},{frameCount:16,horizTiles:16,vertTiles:1,tileCount:16}),e.loadAnimatedArtwork("static/artwork/ice_cream.png",{x:-35.125,z:-20.4,rotation:Math.PI/2},{frameCount:9,horizTiles:9,vertTiles:1,tileCount:9}),e.animate(),e}return m()(i,e),l()(i,[{key:"setupPlanes",value:function(){var e=new u.PlaneGeometry(30,20,0,0),i=new u.MeshBasicMaterial({color:13421772,side:u.DoubleSide}),t=new u.Mesh(e,i);t.rotation.x=0,t.position.x=15,t.position.y=10,t.position.z=0,this._scene.add(t)}},{key:"buildGalleryWalls",value:function(){for(var e=0;e<4;e++){var i=new u.PlaneGeometry(150,20,0,0),t=new u.MeshBasicMaterial({color:15921906,side:u.DoubleSide}),n=new u.Mesh(i,t);switch(n.rotation.y=e/2*Math.PI,n.position.y=10,e){case 0:n.position.x=0,n.position.z=75;break;case 1:n.position.x=-75,n.position.z=0;break;case 2:n.position.x=0,n.position.z=-75;break;case 3:n.position.x=75,n.position.z=0}this._scene.add(n)}}},{key:"buildDisplayArea",value:function(e){for(var i=0;i<4;i++){var t=new u.PlaneGeometry(30,20,0,0),n=new u.MeshBasicMaterial({color:15921906,side:u.DoubleSide}),o=new u.Mesh(t,n);switch(o.rotation.y=i/2*Math.PI,o.position.y=10,i){case 0:o.position.x=e.x,o.position.z=e.y+15;break;case 1:o.position.x=e.x+15,o.position.z=e.y;break;case 2:o.position.x=e.x,o.position.z=e.y-15;break;case 3:o.position.x=e.x-15,o.position.z=e.y}this._scene.add(o)}var r=new u.PlaneGeometry(30,30,0,0),a=new u.MeshBasicMaterial({color:13421772,side:u.DoubleSide}),s=new u.Mesh(r,a);s.position.y=10,s.position.x=e.x,s.position.z=e.y,s.rotation.x=.5*Math.PI,this._scene.add(s)}},{key:"loadArtWork",value:function(e,i){var t=this,n=new Image,o=0,r=0;e=e;n.src=e;var a=u.ImageUtils.loadTexture(n.src);a.minFilter=u.LinearFilter;var s=new u.MeshBasicMaterial({map:a,side:u.DoubleSide});n.onload=function(){o=n.width/15,r=n.height/15;var e=new u.Mesh(new u.PlaneGeometry(o,r),s);e.overdraw=!0,e.rotation.y=i.rotation,e.position.x=i.x,e.position.y=10,e.position.z=i.z,t._scene.add(e)},s.map.needsUpdate=!0}},{key:"loadAnimatedArtwork",value:function(e,i,t){var n=this,o=new Image,r=0,a=0;e=e;o.src=e;var s=u.ImageUtils.loadTexture(o.src),l=new function(e,i,t,n,o){this.tilesHorizontal=i,this.tilesVertical=t,this.numberOfTiles=n,e.wrapS=u.RepeatWrapping,e.repeat.set(1/this.tilesHorizontal,1/this.tilesVertical),this.tileDisplayDuration=o,this.currentDisplayTime=0,this.currentTile=0,this.update=function(i){for(this.currentDisplayTime+=i;this.currentDisplayTime>this.tileDisplayDuration;){this.currentDisplayTime-=this.tileDisplayDuration,this.currentTile++,this.currentTile==this.numberOfTiles&&(this.currentTile=0);var t=this.currentTile%this.tilesHorizontal;e.offset.x=t/this.tilesHorizontal;var n=Math.floor(this.currentTile/this.tilesHorizontal);e.offset.y=n/this.tilesVertical}}}(s,t.horizTiles,t.vertTiles,t.tileCount,2);s.minFilter=u.LinearFilter;var c=new u.MeshBasicMaterial({map:s,side:u.DoubleSide});o.onload=function(){r=Math.floor(o.width/15/t.frameCount),a=Math.floor(o.height/15);var e=new u.Mesh(new u.PlaneGeometry(r,a),c);e.rotation.y=i.rotation,e.position.x=i.x,e.position.y=10,e.position.z=i.z,n._scene.add(e),n.animatedTextures.push(l)},c.map.needsUpdate=!0}},{key:"animate",value:function(e){x()(i.prototype.__proto__||o()(i.prototype),"animate",this).call(this,e);for(var t=this._clock.getDelta(),n=0;n<this.animatedTextures.length;n++)this.animatedTextures[n].update(1e3*t)}}]),i}(f))},pTlp:function(e,i){}},["eslX"]);
//# sourceMappingURL=app.783009f320dcfe921751.js.map