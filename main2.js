// Import necessary Three.js modules
import * as THREE from 'three';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a basic grassland
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true})
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);

// Position the camera
camera.position.z = 5;

// Create a simple character
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

// Render loop with character movement
function animate() {
  requestAnimationFrame(animate);

  handleCharacterMovement();

  renderer.render(scene, camera);
}

animate();
