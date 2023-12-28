
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader();

export let bilTexture = 0;

export function Billboard(scene){


    let vid = document.getElementById("vidbil");

vid.play();
vid.muted = false;
let vidTextureLocal = new THREE.VideoTexture(vid);

vid.minFilter = THREE.LinearFilter;
vid.magFilter = THREE.LinearFilter;

bilTexture = vidTextureLocal;

let vidMonitor1 = new THREE.MeshBasicMaterial({
	map: vidTextureLocal,
	side: THREE.FrontSide,
	toneMapped: false,
});


    loader.load(
        // resource URL
        'assets/models/Billboard.gltf',
        // called when the resource is loaded
        function ( gltf ) {
    
            scene.add( gltf.scene );
    
            gltf.animations; // Array<THREE.AnimationClip>

            gltf.scene.position.set(0,-6,-11);
            gltf.scene.rotation.set(0,0,0);
            gltf.scene.scale.set(1.5,1.5,1.5);

            gltf.scene.getObjectByName('Cube_1').material = vidMonitor1;
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