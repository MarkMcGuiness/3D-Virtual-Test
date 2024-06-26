document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const urlInput = document.getElementById('urlInput');
    const loadButton = document.getElementById('loadButton');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1); // Set background color to white

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Directional Light from the front
    const directionalLightFront = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightFront.position.set(1, 1, 1).normalize();
    scene.add(directionalLightFront);

    // Directional Light from the back
    const directionalLightBack = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLightBack.position.set(-1, -1, -1).normalize();
    scene.add(directionalLightBack);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('dragover');
        dropZone.style.display = 'none'; // Hide the drop zone

        const file = event.dataTransfer.files[0];
        if (file && file.name.endsWith('.glb')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                loadModel(contents);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please drop a .glb file.');
        }
    });

    loadButton.addEventListener('click', () => {
        const url = urlInput.value;
        if (url) {
            loadModelFromURL(url);
        } else {
            alert('Please enter a valid URL.');
        }
    });

    function loadModel(contents) {
        const loader = new THREE.GLTFLoader();
        loader.parse(contents, '', (gltf) => {
            scene.add(gltf.scene);
        });
    }

    function loadModelFromURL(url) {
        const loader = new THREE.GLTFLoader();
        loader.load(url, (gltf) => {
            scene.add(gltf.scene);
        }, undefined, (error) => {
            console.error('An error occurred while loading the model:', error);
            alert('Failed to load the model from the URL. Please check the URL and try again.');
        });
    }
});
