document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for (let index = 1; index <= 12; index++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${index}.webp`;
        imagen.dataset.imagenId = index;
        imagen.onclick = mostrarImagene;

        const lista = document.createElement('LI');
        lista.appendChild(imagen); 
        galeria.appendChild(lista);
    }
}
function mostrarImagene(e){
    const id = parseInt(e.target.dataset.imagenId);
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    const body = document.querySelector('body');
    body.classList.add('fijar-body');
    body.appendChild(overlay);

    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    overlay.appendChild(cerrarImagen);
}