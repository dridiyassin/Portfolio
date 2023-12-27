console.log("Hello Vorld");

import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import {fGround, CustomGround, CustomInvGround} from "./ground.js";


import {NewAppleTree, NewHazelTree, NewTreesBG} from "./csprites.js";


const scene = new THREE.Scene();
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();




const BGText = textureLoader.load('assets/texture/cyberBG.png');
BGText.magFilter = THREE.NearestFilter;

scene.background = BGText;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.physicallyCorrectLights = true;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = 0.5;
bloomPass.strength = 1;
bloomPass.radius = 0.8;

let composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(bloomPass);


camera.position.z = 5;

const TreesBG = NewTreesBG(80,15,15);
//scene.add(TreesBG);


scene.add( fGround );
const BGroundCenter1 = CustomGround(20,5,2)
scene.add(BGroundCenter1);


const BGroundInvisible = CustomInvGround(80,80,1)
scene.add(BGroundInvisible);
BGroundInvisible.position.z = -5

const AppTree1 = NewAppleTree(5,5,5);
//scene.add(AppTree1);


const HazTree1 = NewHazelTree(5,5,5);
//scene.add(HazTree1);


TreesBG.position.set(0,2,-5);
HazTree1.position.set(7,1,-1.2);
AppTree1.position.set(-7,1,-1.2);

fGround.position.set(0,-4,1.1)

BGroundCenter1.position.set(0,-5,-2)

const directionalLight = new THREE.DirectionalLight(0x25277a,2); // Reduce the second parameter (intensity)
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0x25277a,2); // Reduce the second parameter (intensity)
directionalLight2.position.set(1, 1, 0.5).normalize();
scene.add(directionalLight2);




//Light Section

const light = new THREE.AmbientLight( 0xb85581 );
scene.add( light );
light.position.z = -5;
light.intensity = 3;


var pLight = new THREE.PointLight(0x58ffff, 1);
pLight.position.set(-5, -2, -6);
scene.add(pLight);
pLight.distance = 1000;
pLight.intensity = 50;


var pLight2 = new THREE.PointLight(0xff0000, 1);
pLight2.position.set(-9, 0, -2.5);
scene.add(pLight2);
pLight2.distance = 2000;
pLight2.intensity = 50;
pLight2.power = 200;

var pLight3 = new THREE.PointLight(0x9e90ff, 1);
pLight3.position.set(-9, 3, -2.5);
scene.add(pLight3);
pLight3.distance = 2000;
pLight3.intensity = 50;
pLight3.power = 200;


loader.load(
	// resource URL
	'assets/models/Building2.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		gltf.scene.position.set(10.5,-3.8,-6.6);
		gltf.scene.rotation.set(0,3.6,0);
		gltf.scene.scale.set(1.5,1.5,1.5);
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);




let vid = document.getElementById("vid");
vid.play();
let vidTexture = new THREE.VideoTexture(vid);

vid.minFilter = THREE.LinearFilter;
vid.magFilter = THREE.LinearFilter;


var vidMonitor1 = new THREE.MeshBasicMaterial({
	map: vidTexture,
	side: THREE.FrontSide,
	toneMapped: false,
});

loader.load(
	// resource URL
	'assets/models/BuildingLeft.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		
		let build = gltf.scene;

		scene.add( build );

		

		build.position.set(-9.4,-3.8,-8.5);
		build.rotation.set(0,1,0);
		build.scale.set(0.6,0.6,0.6);
		

		console.log(build.getObjectByName('Cube_1'));
		build.getObjectByName('Cube_1').material = vidMonitor1;
		
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);





// Set up raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle the mousemove event
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
	// Calculate normalized device coordinates
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// Update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// Calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children);

	// Log or use the intersection data as needed
	if (intersects.length > 0) {
		console.log('Intersection Point:', intersects[0].point);
		camera.rotation.x = intersects[0].point.y/200;
		camera.rotation.y = -intersects[0].point.x/200;
	}
}

// Set up camera position






function animate() {

	requestAnimationFrame( animate );
	

	

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    THREE.ColorManagement.enabled = true; // or false
    //renderer.useLegacyLights = false; // or true

	//AppTree1.rotation.z += 0.01;
	vidTexture.needsUpdate = true;


	composer.render();
    //renderer.render( scene, camera );
}

//Compatibility
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}