const dropArea = document.getElementById('drop-area');
const modelViewer = document.getElementById('model-viewer');

dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('drop', handleDrop);

async function handleDragOver(event) {
    event.preventDefault();
    dropArea.classList.add('drag-over');
}

async function handleDrop(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith('.glb')) {
        const formData = new FormData();
        formData.append('glbFile', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            const fileUrl = await response.text();
            displayGLBModel(fileUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        alert('Please drop a .glb file.');
    }

    dropArea.classList.remove('drag-over');
}

function displayGLBModel(fileUrl) {
    modelViewer.innerHTML = `<model-viewer src="${fileUrl}" alt="3D Model"></model-viewer>`;
}
