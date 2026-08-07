/* ===================================================
   NUESTRO MEJOR VIAJE
   Carlos & Valeria
   Script Principal v1.0
=================================================== */

// ===================================================
// REFERENCIAS
// ===================================================

const loader = document.getElementById("loader");
const welcome = document.getElementById("welcome");
const logo = document.getElementById("logo");
const gallery = document.getElementById("gallery");
const videoSection = document.getElementById("videoSection");
const finalQuote = document.getElementById("finalQuote");
const boardingPass = document.getElementById("boardingPass");

const status = document.querySelector(".status");

const startButton = document.getElementById("startButton");

const galleryImageA = document.getElementById("galleryImageA");
const galleryImageB = document.getElementById("galleryImageB");

const music = document.getElementById("music");

const weddingVideo = document.getElementById("weddingVideo");

// ===================================================
// VARIABLES
// ===================================================

let currentPhoto = 0;
let currentLayer = 0;
const preloadedImages = [];

// La lista de fotos se genera automáticamente
const photos = [];

for (let i = 1; i <= 50; i++) {

    photos.push(
        `assets/fotos/${String(i).padStart(2,"0")}.jpeg`
    );

}
// ====================================
// REORDENAR FOTOS
// ====================================

const ordered = [
    photos[49], //50

    photos[0],  //01
    photos[1],  //02
    photos[2],  //03

    photos[48], //49

    photos[3],  //04
    photos[4],  //05
    photos[5],  //06
    photos[6],  //07
    photos[7],  //08
    photos[8],  //09
    photos[9],  //10
    photos[10], //11
    photos[11], //12
    photos[12], //13
    photos[13], //14
    photos[14], //15
    photos[15], //16
    photos[16], //17
    photos[17], //18
    photos[18], //19
    photos[19], //20
    photos[20], //21
    photos[21], //22
    photos[22], //23
    photos[23], //24
    photos[24], //25
    photos[25], //26
    photos[26], //27

    photos[39], //40
    photos[40], //41

    photos[27], //28
    photos[28], //29

    photos[46], //47

    photos[29], //30
    photos[30], //31
    photos[31], //32
    photos[32], //33
    photos[33], //34
    photos[34], //35
    photos[35], //36
    photos[36], //37
    photos[37], //38
    photos[38], //39

    photos[41], //42

    photos[47], //48

    photos[42], //43
    photos[43], //44
    photos[44], //45
    photos[45]  //46
];

photos.length = 0;
photos.push(...ordered);

// ====================================
// PRECARGA INTELIGENTE
// ====================================

photos.forEach(src => {

    const img = new Image();

    img.src = src;

    preloadedImages.push(img);

});

// ===================================================
// FUNCIONES
// ===================================================

function showScreen(screen){

    loader.style.display = "none";
    welcome.style.display = "none";
    logo.style.display = "none";
    gallery.style.display = "none";
    videoSection.style.display = "none";
    finalQuote.style.display = "none";
    boardingPass.style.display = "none";

    boardingPass.classList.remove("show");

    screen.style.display = "flex";

}

// ===================================================
// LOADER
// ===================================================

setTimeout(()=>{

    status.innerHTML="Reserva encontrada ✓";

},3000);

setTimeout(()=>{

    showScreen(welcome);

},4500);

setTimeout(()=>{

    showScreen(logo);

},8500);

// ===================================================
// BOTÓN PRINCIPAL
// ===================================================

startButton.addEventListener("click",()=>{

currentPhoto = 0;
currentLayer = 0;

galleryImageA.src = preloadedImages[0].src;

galleryImageA.classList.add("active");
galleryImageB.classList.remove("active");

showScreen(gallery);

showPhoto(0);

    if(music){

        music.currentTime = 0;

        music.play().catch(()=>{});

    }

});

// ===================================================
// GALERÍA
// ===================================================

function showPhoto(index){

    const current = currentLayer === 0 ? galleryImageA : galleryImageB;
    const next = currentLayer === 0 ? galleryImageB : galleryImageA;

    next.src = preloadedImages[index].src;

next.style.objectPosition = "center center";

requestAnimationFrame(() => {

    next.classList.add("active");
    current.classList.remove("active");

    currentLayer = currentLayer === 0 ? 1 : 0;

});

}

// ===================================================
// CAMBIO DE FOTO
// ===================================================

gallery.addEventListener("click",(e)=>{

    const mitadPantalla = window.innerWidth / 2;

    // TOCÓ EL LADO IZQUIERDO
    if(e.clientX < mitadPantalla){

        if(currentPhoto > 0){

            currentPhoto--;

            showPhoto(currentPhoto);

        }

        return;

    }

    // TOCÓ EL LADO DERECHO
    if(currentPhoto < photos.length - 1){

        currentPhoto++;

        showPhoto(currentPhoto);

    }

    // FIN DE LA GALERÍA
    else{

        if(music){

            music.pause();

        }

        showScreen(videoSection);

        weddingVideo.currentTime = 0;

        weddingVideo.play().catch(()=>{});

    }

});
// ===================================================
// FIN DEL VIDEO
// ===================================================

weddingVideo.addEventListener("ended", () => {

    weddingVideo.pause();

    showScreen(finalQuote);

  setTimeout(() => {

    finalQuote.classList.add("fadeOut");

    setTimeout(() => {

        finalQuote.classList.remove("fadeOut");

        showScreen(boardingPass);

        requestAnimationFrame(() => {
            boardingPass.classList.add("show");
        });

    }, 1200);

}, 4500);

});
