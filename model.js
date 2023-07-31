import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color(0xbdbfbb);
camera.zoom = 20;
camera.position.set(80,0, 0);
camera.lookAt(new THREE.Vector3(1,1,1));
camera.updateProjectionMatrix()


const renderer = new THREE.WebGLRenderer();
const orbitControls = new OrbitControls( camera, renderer.domElement, );


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapSoft = true;
document.body.appendChild( renderer.domElement );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

const loader = new GLTFLoader();

loader.load( 'assets/model/van.glb', function ( gltf ) {
	const model = gltf.scene;
    model.position.set(0,0,0.2);
    //model.setSize(100,100,false);
    scene.add( model );
}, undefined, function ( error ) {
	console.error( error );
} );

let objects = [];
loader.load( 'assets/model/LaunchX/two_seater_sofa_bed/scene.gltf', function ( gltf ) {
	const model = gltf.scene;
    model.position.set(0,1.4,0.2);
    //model.setSize(100,100,false);
    scene.add( model );
    objects.push(model);
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( 'assets/model/LaunchX/carpet/scene.gltf', function ( gltf ) {
	const model = gltf.scene;
    model.position.set(2,0.5,-0.5);
    //model.setSize(100,100,false);
    scene.add( model );
    objects.push(model);
}, undefined, function ( error ) {
	console.error( error );
} );

console.log(objects);
var dragControls = new DragControls(objects, camera, renderer.domElement);
dragControls.addEventListener('dragstart', function (event) {
    orbitControls.enabled = false
    event.object.material.opacity = 0.33
})
dragControls.addEventListener('dragend', function (event) {
    orbitControls.enabled = true
    event.object.material.opacity = 1
})

orbitControls.update();
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();