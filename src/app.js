import * as THREE from "three";
// import { TrackballControls } from "https://unpkg.com/three@0.137.5/examples/jsm/controls/TrackballControls.js";
import { OrbitControls } from "./OrbitControls";
// import { PointerLockControls } from "https://unpkg.com/three@0.137.5/examples/jsm/controls/PointerLockControls.js";
// import { ObjectLoader } from "https://unpkg.com/three@0.137.5/src/loaders/ObjectLoader.js";
// import { GLTFLoader } from "./GLTFLoader";
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.137.5/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from "https://unpkg.com/three@0.137.5/examples/jsm/loaders/GLTFLoader.js";
// import model1 from './models/just_a_girl/scene.gltf';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();

//   setSZIE CANVANS
window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//   ADD GEOMETRY

//   var geometry = new THREE.SphereGeometry(1, 8, 5); // size of box

var textureLoader = new THREE.TextureLoader();

const geometry0 = new THREE.TorusGeometry(10, 4, 116, 100);
var material = new THREE.MeshLambertMaterial({
    color: 0xc9f6cb,
    side: THREE.DoubleSide,
});

const sphere = new THREE.Mesh(geometry0, material);
//   scene.add(sphere);

//   GEO1
var geometry = new THREE.BoxGeometry(5, 5, 5); // size of box

var texture0 = textureLoader.load("./tt1.png");
var texture1 = textureLoader.load("./tt2.jpg");
var texture2 = textureLoader.load("./tt3.jpg");

var material1 = [
    new THREE.MeshLambertMaterial({
        map: texture0,
        side: THREE.DoubleSide,
        color: "#271952",
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

var sphere1 = new THREE.Mesh(geometry, material1);
sphere1.position.y = 30;
scene.add(sphere1);

//   CAMERA POSITION
camera.position.set(20, 10, 20);

// LIGHT
var ambientLight = new THREE.AmbientLight(0xfffffa, 1);
// scene.add(ambientLight);

//   var light1 = new THREE.PointLight(0x0040ff, 4, 150); // lắp thêm 1 bóng đèn đỏ cường độ sáng x4
//   light1.position.set(50, 50, 50);
//   scene.add(light1);

//   var light2 = new THREE.PointLight(0x0040ff, 3, 50); // lắp thêm bóng nữa
//   light2.position.set(-1, -1, -1);
//   scene.add(light2);

var light3 = new THREE.PointLight("#ffffff", 10, 100);
light3.position.set(31, 24, 1);
scene.add(light3);

let pointLightHelper = new THREE.PointLightHelper(light3);
let gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(5, 30, -41);
scene.add(light);

let dLightHelper = new THREE.DirectionalLightHelper(light);
scene.add(dLightHelper);

var spotLight = new THREE.SpotLight(0xffffff, 1, 10);
spotLight.position.set(50, 32, 32);
scene.add(spotLight);

let sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);
//game login
var update = function () {
    // Just for fun
    sphere1.rotation.x += 0.01;
    sphere1.rotation.y += 0.005;
};

// draw scene
var render = function () {
    renderer.render(scene, camera);
};

//run gameloop (update, render, repeat)

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
    }
}

Array(200).fill().forEach(addStar);

// Just for fun
// scene.background = new THREE.Color("#F0Fff0");

// CONTROL

let controls = new OrbitControls(camera, renderer.domElement);
//   controls = new THREE.DragControls([sphere], camera, renderer.domElement);

//   let controls = new PointerLockControls(camera, renderer.domElement);

//   //   Để có thể lock camera, cần 1 cú click, vì vậy cần define vùng click để kích hoạt sự kiện này. Ở đây mình chọn luôn thẻ Body, đặt id là 'body' luôn:
//   var instructions = document.getElementById("body");

//   instructions.addEventListener(
//     "click",
//     function () {
//       controls.lock();
//     },
//     false
//   );

var loader = new GLTFLoader();
const resizeAndCenter = function (mesh) {
    // const box = new Box3().setFromObject(mesh);
    // const size = box.getSize(new Vector3());
    // const maxSize = Math.max(size.x, size.y, size.z);
    // const desizedSize = 1.5;
    // mesh.scale.multiplyScalar(desizedSize / maxSize);
    // box.setFromObject(mesh);
    // const center = box.getCenter(new Vector3());
    // mesh.position.sub(center);
};


loader.load(
    //model here
    new URL('/public/just_a_girl/scene.gltf', import.meta.url).href
    ,
    (gltf) => {
        const root = gltf.scene;
        const scale = 0.2;
        root.scale.multiplyScalar(scale);
        resizeAndCenter(root);
        scene.add(root);
    }
);

// let controls = new TrackballControls(camera, renderer.domElement);

var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    stars.forEach((star) => {
        updateStar(star);
    });
    update();
    render();

    controls.update();
};
GameLoop();