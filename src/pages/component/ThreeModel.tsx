import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ThreeDModel = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // @ts-expect-error
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            1,
            1000
        );
        camera.position.set(4, 5, 11);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 5;
        controls.maxDistance = 20;
        controls.minPolarAngle = 0.5;
        controls.maxPolarAngle = 1.5;
        controls.autoRotate = false;
        controls.target = new THREE.Vector3(0, 1, 0);
        controls.update();

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        groundGeometry.rotateX(-Math.PI / 2);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            side: THREE.DoubleSide,
        });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.castShadow = false;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);

        // SpotLight
        const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
        spotLight.position.set(0, 25, 0);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        scene.add(spotLight);

        // GLTF Loader
        const loader = new GLTFLoader().setPath('/millennium_falcon/');
        loader.load(
            'scene.gltf',
            (gltf) => {
                const mesh = gltf.scene;

                mesh.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                mesh.position.set(0, 1.05, -1);
                scene.add(mesh);
            },
            (xhr) => {
                console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
            },
            (error) => {
                console.error(error);
            }
        );

        // Resize Handler
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '500px',
                position: 'relative',
                overflow: 'hidden',
            }}
        />
    );
};

export default ThreeDModel;
