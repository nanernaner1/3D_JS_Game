import * as THREE from 'three';
import { FBXLoader } from 'https://threejs.org/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // For 2D Adventure
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // For 2D Adventure
// const cube = new THREE.Mesh( geometry, material ); // For 2D Adventure
// scene.add( cube ); // For 2D Adventure

// Camera Positioning
camera.position.z = 5;

// Define movement directions
let moveUp = false;
let moveLeft = false;
let moveDown = false;
let moveRight = false;

// Handle touch events for character movement
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    event.preventDefault();

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    // Check which button is pressed
    const btnUp = document.getElementById('btnUp');
    const btnLeft = document.getElementById('btnLeft');
    const btnDown = document.getElementById('btnDown');
    const btnRight = document.getElementById('btnRight');

    if (isTouchInsideElement(touchX, touchY, btnUp)) {
        moveUp = true;
    } else if (isTouchInsideElement(touchX, touchY, btnLeft)) {
        moveLeft = true;
    } else if (istouchInsideElement(touchX, touchY, btnDown)) {
        moveDown = true;
    } else if (isTouchInsideElement(touchX, touchY, btnRight)) {
        moveRight = true;
    }
}

function handleTouchEnd(event) {
    event.preventDefault();

    // Reset movement flags on touch end
    moveUp = false;
    moveLeft = false;
    moveDown = false;
    moveRight = false;
}


function isTouchInsideElement(touchX, touchY, element) {
    const rect = element.getBoundingClientRect();
    return (
        touchX >= rect.left &&
        touchX <= rect.right &&
        touchY >= rect.top &&
        touchY <= rect.bottom
    )
}

// Handle keyboard events for character movement
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveUp = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveDown = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
}

function handleKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveUp = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveDown = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
}

function updateCharacterPosition() {
    const sensitivity = 0.01;

    if (moveUp) character.position.y += 0.8 * sensitivity;
    if (moveLeft) character.position.x -= 0.8 * sensitivity;
    if (moveDown) character.position.y -= 0.8 * sensitivity;
    if (moveRight) character.position.x += 0.8 * sensitivity;
}

document.addEventListener('touchstart', (event) => {
    const touchStartX = event.touches[0].clientX;
    const touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;


    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Adjust the senitivity based on your needs
    const sensitivity = 0.1;

    // Update character position based on touch movement
    character.position.x -= deltaX * sensitivity;
    character.position.y += deltaY * sensitivity;

    touchStartX = touchX;
    touchStartY = touchY;
});

// Handle on-screen control buttons
const btnUp = document.getElementById('btnUp');
const btnLeft = document.getElementById('btnLeft');
const btnDown = document.getElementById('btnDown');
const btnRight = document.getElementById('btnRight');

btnUp.addEventListener('touchstart', () => {
    character.position.y += 0.1;
});

btnLeft.addEventListener('touchstart', () => {
    character.position.x -= 0.1;
});

btnDown.addEventListener('touchstart', () => {
    character.position.y -= 0.1;
});

btnDown.addEventListener('touchstart', () => {
    character.position.x += 0.1;
});

// Add character
const characterGeometry = new THREE.BoxGeometry();
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
scene.add(character);



function animate() {
	requestAnimationFrame( animate );


    updateCharacterPosition();
	// character.rotation.x += 0.01; // Uncomment to begin rotating character, can be used for effects
	// character.rotation.x += 0.01; // Uncomment to begin rotating character, can be used for effects

	renderer.render( scene, camera );
}

animate();