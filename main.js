import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;


// Add character
const characterGeometry = new THREE.BoxGeometry();
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
scene.add(character);

// Position the character
character.position.y = 1;

// Handle keyboard input for character movement
const moveSpeed = 0.1;
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

function handleCharacterMovement() {
    if (keys['KeyW']) character.position.z -= moveSpeed;
    if (keys['KeyS']) character.position.z += moveSpeed;
    if (keys['KeyA']) character.position.x -= moveSpeed;
    if (keys['KeyD']) character.position.x += moveSpeed;
}

function animate() {
	requestAnimationFrame( animate );

    handleCharacterMovement();
	character.rotation.x += 0.01;
	character.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();