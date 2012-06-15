$(document).ready(function() {

	// Fallback image style
	var style = "background: white url('img/fallback.jpg') no-repeat center center fixed;";
	style += "-webkit-background-size: cover;";
	style += "-moz-background-size: cover;";
	style += "-o-background-size: cover;";
	style += "background-size: cover;";
		
	if (! Detector.webgl) {
		$('body').attr('style', style);
	} else {
		try {
			// Canvas definitions
			var width = window.innerWidth;
			var height = window.innerHeight;
			var canvasSelector = 'div#canvas';

			// Renderer
			var renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setSize(width, height);
			$(canvasSelector).append(renderer.domElement);
			renderer.shadowMapEnabled = true;
			renderer.setClearColorHex(0xFFFFFF, 0.0);
			renderer.clear();
		
			// Scene
			var scene = new THREE.Scene();

			// Camera
			var camera = new THREE.PerspectiveCamera(20, width/height, 1, 10000);
			camera.position.z = 600;
			camera.position.x = 600;
			camera.position.y = 600;
			scene.add(camera);
		
			// Ambient light
			var ambientLight = new THREE.AmbientLight(0x555555);
			scene.add(ambientLight);

			// Spotlight
			var light = new THREE.SpotLight();
			light.position.set( 170, 330, -160 );
			light.castShadow = true;
			scene.add(light);

			// Materials
			var wireMat = new THREE.MeshBasicMaterial({color: 0x8C2D19, wireframe: true, transparent: true});
			var shadowMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

			// Cube
			var cubeWire = new THREE.Mesh(new THREE.CubeGeometry(50,50,50), wireMat);
			cubeWire.castShadow = true;
			cubeWire.receiveShadow = true;
			scene.add(cubeWire);
			var cube = new THREE.Mesh(new THREE.CubeGeometry(45,45,45), shadowMat);
			cube.castShadow = true;
			cube.receiveShadow = true;
			scene.add(cube);

			// Cylinder
			var cylinderWire = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 50, 16, 5, false), wireMat);
			cylinderWire.castShadow = true;
			cylinderWire.receiveShadow = true;
			scene.add(cylinderWire);
			var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(22.5, 22.5, 45, 16, 5, false), shadowMat);
			cylinder.castShadow = true;
			cylinder.receiveShadow = true;
			scene.add(cylinder);   
		
			// Cone
			var coneWire = new THREE.Mesh(new THREE.CylinderGeometry(0, 25, 50, 16, 5, false), wireMat);
			coneWire.castShadow = true;
			coneWire.receiveShadow = true;
			scene.add(coneWire);  
			var cone = new THREE.Mesh(new THREE.CylinderGeometry(0, 22.5, 45, 16, 5, false), shadowMat);
			cone.castShadow = true;
			cone.receiveShadow = true;
			scene.add(cone);    
		
			// Torus inner
			var torusInner = new THREE.Mesh(new THREE.TorusGeometry(150, 10, 50, 50), shadowMat);
			torusInner.castShadow = true;
			torusInner.receiveShadow = true;
			scene.add(torusInner);

			// Torus outter
			var torusOutter = new THREE.Mesh(new THREE.TorusGeometry(170, 10, 50, 50), shadowMat);
			torusOutter.castShadow = true;
			torusOutter.receiveShadow = true;
			scene.add(torusOutter);

			// FPS values
			var lastCycle = 0;
			var fps = 0;

			function animate(t) {

				/*// Measure FPS
				if(lastCycle != 0) {
					fps = 1000.0 / (t - lastCycle);
					if(fps < 5) {
						$('canvas').remove();
						$('body').attr('style', 'background: white url(\'img/fallback.jpg\') center fixed no-repeat;');
						return;
					}
				}
				lastCycle = t;*/

				var posX1 = Math.cos(t/3000)*85; var posX2 = Math.cos(Math.PI*(3/2) + t/3000)*85; var posX3 = Math.cos(Math.PI*(3/4) + t/3000)*85;
				var posZ1 = Math.sin(t/3000)*85; var posZ2 = Math.sin(Math.PI*(3/2) + t/3000)*85; var posZ3 = Math.sin(Math.PI*(3/4) + t/3000)*85;
				var rot1 = t/2000;
				var rot2 = t/2600;
				var rot3 = t/3600;
				var torusSep = 1000;
				var rotTorus = t/(torusSep * 4) + torusSep;
			
				// Cube animation
				cube.position.x = posX1; cubeWire.position.x = posX1;
				cube.position.z = posZ1; cubeWire.position.z = posZ1;
				cube.rotation.x = rot1; cubeWire.rotation.x = rot1;
					cube.rotation.y = rot3; cubeWire.rotation.y = rot3;
				cube.rotation.z = rot2; cubeWire.rotation.z = rot2;

				// Cone animation
				cone.position.x = posX2; coneWire.position.x = posX2;
				cone.position.z = posZ2; coneWire.position.z = posZ2;
				cone.rotation.x = rot1; coneWire.rotation.x = rot1;
				cone.rotation.y = rot2; coneWire.rotation.y = rot2;
				cone.rotation.z = rot3; coneWire.rotation.z = rot3;
		
				// Cylinder animation
				cylinder.position.x = posX3; cylinderWire.position.x = posX3;
				cylinder.position.z = posZ3; cylinderWire.position.z = posZ3;
				cylinder.rotation.x = rot2; cylinderWire.rotation.x = rot2;
				cylinder.rotation.y = rot1; cylinderWire.rotation.y = rot1;
				cylinder.rotation.z = rot3; cylinderWire.rotation.z = rot3;

				// Over torus animation
				torusInner.rotation.x = rotTorus;
				torusInner.rotation.y = rotTorus;
				torusOutter.rotation.x = rotTorus + torusSep;
				torusOutter.rotation.y = rotTorus + torusSep;

				// Scene refresh
				camera.lookAt(scene.position);
				renderer.render(scene, camera);
				window.requestAnimationFrame(animate, renderer.domElement);
			};

			// Start animation
			animate(new Date().getTime());
		} catch (ex) {
			$('body').attr('style', style);
		}
	}
});
