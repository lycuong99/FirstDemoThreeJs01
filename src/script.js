import './style.css'

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ArcballControls } from "three/examples/jsm/controls/ArcballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//   CAMERA POSITION
camera.position.set(20, 10, 20);

// RENDERER
const renderer = new THREE.WebGLRenderer();

//   Auto resize CANVANS when responsive
window.addEventListener("resize", function () {
    let width = window.innerWidth;
    let height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer.pixelRatio)
// console.log(window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

// SET UP LIGHT
let ambientLight = new THREE.AmbientLight(0xfffffa, 1);
scene.add(ambientLight);

let pointLight = new THREE.PointLight("#ffffff", 10, 100);
pointLight.position.set(31, 24, 1);
scene.add(pointLight);

let pointLightHelper = new THREE.PointLightHelper(pointLight);
let gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

const render = function () {
    renderer.render(scene, camera);
};

// CREATE STAR

let stars = [];

function addStar() {
    const g = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshPhongMaterial({ color: 0xfadaff });
    const star = new THREE.Mesh(g, material);
    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    stars.push(star);
    scene.add(star);
}

function updateStar(star) {
    if (star.position.y < -1) {
        star.position.y = THREE.MathUtils.randFloatSpread(70);
    } else {
        star.position.y -= 0.1;
        // star.position.x -= 1;
    }
}

Array(200).fill().forEach(addStar);

// CONTROL
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// let controls = new THREE.DeviceOrient
// CUBE
//   GEO1
let geometry = new THREE.BoxGeometry(5, 5, 5); // size of box
let textureLoader = new THREE.TextureLoader();
let texture0 = textureLoader.load("tt1.png");
let texture1 = textureLoader.load("tt2.jpg");
let texture2 = textureLoader.load("tt3.jpg");

let material1 = [
    new THREE.MeshLambertMaterial({
        map: texture0,
        side: THREE.DoubleSide,
    }), //right
    new THREE.MeshLambertMaterial({
        map: texture1,
        side: THREE.DoubleSide,
    }),
    new THREE.MeshLambertMaterial({
        map: texture2,
        side: THREE.DoubleSide,
    }),
    new THREE.MeshLambertMaterial({
        map: texture0,
        side: THREE.DoubleSide,
    }),
    new THREE.MeshLambertMaterial({
        map: texture1,
        side: THREE.DoubleSide,
    }),
    new THREE.MeshLambertMaterial({
        map: texture2,
        side: THREE.DoubleSide,
    }),
];

let sphere1 = new THREE.Mesh(geometry, material1);
sphere1.position.y = 30;
scene.add(sphere1);



// LOADER
let loader = new GLTFLoader();

// load girl
loader.load(
    //model here
    "models/just_a_girl/scene.gltf",
    (gltf) => {
        const root = gltf.scene;
        const scale = 0.2;
        root.scale.multiplyScalar(scale);

        scene.add(root);
    }
);


let update = function () {
    // Just for fun
    sphere1.rotation.x += 0.01;
    sphere1.rotation.y += 0.005;
};
let GameLoop = function () {
    requestAnimationFrame(GameLoop);
    stars.forEach((star) => {
        updateStar(star);
    });
    update();
    render();

    controls.update();
};
GameLoop();