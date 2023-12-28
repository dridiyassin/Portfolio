console.log("Hello Vorld");

import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import {fGround, CustomGround, CustomInvGround} from "./ground.js";
import {LeftBuilding, vidTexture} from "./leftbuild.js";
import {RightBuilding} from "./rightbuild.js";
import {PlaceAllLights} from "./lights.js";

import {NewAppleTree, NewHazelTree, NewTreesBG} from "./csprites.js";
import { Billboard, bilTexture } from './billboard.js';



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



PlaceAllLights(scene);

scene.add( fGround );
const BGroundCenter1 = CustomGround(20,5,2)
scene.add(BGroundCenter1);


const BGroundInvisible = CustomInvGround(80,80,1)
scene.add(BGroundInvisible);
BGroundInvisible.position.z = -5;
fGround.position.set(0,-4,1.1);
BGroundCenter1.position.set(0,-5,-2);

LeftBuilding(scene);

RightBuilding(scene);

Billboard(scene);
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
		//console.log('Intersection Point:', intersects[0].point);
		camera.rotation.x = intersects[0].point.y/200;
		camera.rotation.y = -intersects[0].point.x/200;
	}
}

// Set up camera position






function animate() {

	requestAnimationFrame( animate );
	

	

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    THREE.ColorManagement.enabled = true;
	vidTexture.needsUpdate = true;
	bilTexture.needsUpdate = true;

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