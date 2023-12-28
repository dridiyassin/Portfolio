import * as THREE from 'three';

export function PlaceAllLights(scene){

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
}