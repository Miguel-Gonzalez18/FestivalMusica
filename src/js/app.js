document.addEventListener('DOMContentLoaded', ()=> {
    scrollNav();
    navegacionFija();
});
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-prinncipal a');
    enlaces.forEach(function(enlace){
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
            const session = document.querySelector(e.target.attributes.href.value);
            session.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
function navegacionFija(){
    const barra = document.querySelector('.header');
    const obsever = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        }
        else{
            barra.classList.add('fijo');
        }
    });
    obsever.observe(document.querySelector('.sobre-festival'));
}