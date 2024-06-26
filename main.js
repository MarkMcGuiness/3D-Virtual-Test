const modelViewer = document.getElementById('model-viewer');

// Set the src attribute to load the .glb file from the server
modelViewer.innerHTML = `<model-viewer src="/uploads/your-model.glb" alt="3D Model"></model-viewer>`;
