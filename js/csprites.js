import * as THREE from 'three';


const appleTree = new THREE.TextureLoader().load( 'assets/sprites/trees/Apple Tree.png' );
const hazelTree = new THREE.TextureLoader().load( 'assets/sprites/trees/Hazel Tree.png' );
const treesBG = new THREE.TextureLoader().load( 'assets/texture/TreeBGLong.png' );

appleTree.magFilter = THREE.NearestFilter;
hazelTree.magFilter = THREE.NearestFilter;
treesBG.magFilter = THREE.NearestFilter;

function NewSprite(sx, sy, sz, mat)
{
    const material = new THREE.SpriteMaterial( { map: mat} );

    const sprite = new THREE.Sprite( material );
    sprite.scale.set(sx,sy,sz);
    return sprite;
}

export function NewAppleTree(sx, sy, sz)
{
    return NewSprite(sx, sy, sz, appleTree);
}

export function NewHazelTree(sx, sy, sz)
{
    return NewSprite(sx, sy, sz, hazelTree);
}

export function NewTreesBG(sx,sy,sz)
{
    return NewSprite(sx, sy, sz, treesBG);
}