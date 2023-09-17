// Replace with your S3 bucket name and endpoint URL
const bucketName = 'uploadfilestos3';
const endpointURL = 'https://fejx2l5juj.execute-api.eu-north-1.amazonaws.com/dev';

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        setStatus('Please select a file.');
        return;
    }

    const filename = encodeURIComponent(file.name);

    // Create a URL with the S3 bucket and filename
    const uploadURL = `${endpointURL}/${bucketName}/${filename}`;

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Use fetch to make a PUT request to the S3 endpoint
    fetch(uploadURL, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            setStatus(`File uploaded successfully. URL: ${uploadURL}`);
        } else {
            setStatus('Error uploading file.');
        }
    })
    .catch(error => {
        setStatus(`Error: ${error.message}`);
    });
}

function setStatus(message) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
}
