const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const error = document.getElementById("error");
const progressBar = document.getElementById("progress-bar");
window.onload = function () {

    const savedImage = localStorage.getItem("uploadedImage");

    if (savedImage) {
        preview.innerHTML = `<img src="${savedImage}" style="width:100%; border-radius:10px;">`;
    }
};
dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea.addEventListener("drop", function(e){

    e.preventDefault();
    const file = e.dataTransfer.files[0];

    handleFile(file);
});
fileInput.addEventListener("change", function(){

    const file = fileInput.files[0];
    handleFile(file);
});
function handleFile(file){

    error.innerText = "";
    progressBar.style.width = "0%";

    if(!file) return;

    const allowedTypes = ["image/png","image/jpg","image/gif"];
    if(!allowedTypes.includes(file.type)){

        error.innerText = "Only PNG, JPG and GIF images are allowed!";
        preview.innerHTML = "";
        localStorage.removeItem("uploadedImage");

        return;
    }

    simulateUpload(file);
}
function simulateUpload(file){

    let progress = 0;

    const interval = setInterval(function(){

        progress += 10;
        progressBar.style.width = progress + "%";

        if(progress >= 100){

            clearInterval(interval);
            previewImage(file);
        }

    },200);
}
function previewImage(file){

    const reader = new FileReader();

    reader.onload = function(e){

        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100%";
        img.style.marginTop = "20px";
        img.style.borderRadius = "10px";

        preview.innerHTML = "";
        preview.appendChild(img);
        localStorage.setItem("uploadedImage", e.target.result);
    };

    reader.readAsDataURL(file);
}