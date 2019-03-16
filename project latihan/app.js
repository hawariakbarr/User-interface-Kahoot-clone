const navSlide = ()=>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-link');

    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');
    });

    // navLink.forEach((link, index)=>{
    //     link.style.animation = `navLinkFade 0.5s ease forward ${index/7}s`;
    //     console.log(index/7);
    // });
}

navSlide();