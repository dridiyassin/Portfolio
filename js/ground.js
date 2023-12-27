import * as THREE from 'three';



const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('assets/texture/floor.png');
const texture2 = textureLoader.load('assets/texture/floor.png');


texture1.repeat.set(6,1);

texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.magFilter = THREE.NearestFilter;

texture2.repeat.set(6,1);

texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.magFilter = THREE.NearestFilter;


const dirtMaterial = new THREE.MeshLambertMaterial ({ map: texture1 });
const grassMaterial = new THREE.MeshLambertMaterial ({ map: texture2 });
//cube
const geometry = new THREE.BoxGeometry( 16, 3, 2 );

const materials = [dirtMaterial,dirtMaterial, grassMaterial,dirtMaterial,dirtMaterial,dirtMaterial];

const standingGround = new THREE.Mesh( geometry, materials);


export function CustomGround(sizex, sizey, sizez){
    const newGeo = new THREE.BoxGeometry(sizex,sizey,sizez);
    
    const newGround = new THREE.Mesh( newGeo, materials);
    return newGround;
}

export function CustomInvGround(sizex, sizey, sizez){

    const invMat = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    invMat.transparent = true;
    invMat.opacity = 0;
    const newGeo = new THREE.BoxGeometry(sizex,sizey,sizez);
    
    const newGround = new THREE.Mesh( newGeo, invMat);
    return newGround;
}



export const fGround = standingGround;