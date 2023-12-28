
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export let vidTexture = 0;

const loader = new GLTFLoader();

export function LeftBuilding(scene){
let vid = document.getElementById("vid");
vid.play();
let vidTextureLocal = new THREE.VideoTexture(vid);

vid.minFilter = THREE.LinearFilter;
vid.magFilter = THREE.LinearFilter;

vidTexture = vidTextureLocal;

let vidMonitor1 = new THREE.MeshBasicMaterial({
	map: vidTextureLocal,
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

		

		build.position.set(-12,-3.8,-8.5);
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
}