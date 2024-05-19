export function emptyFileInput() {
  const fileInput = document.getElementById('file-input-image');

  if (fileInput) {
    fileInput.value = '';
  }
}
