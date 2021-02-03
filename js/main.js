gsap.registerPlugin(ScrollTrigger);

// this func need to be animated after hover link effect
function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            //add class
            link.classList.add('animate-out');
            // setTimeout(() => {
            //     link.classList.remove('animate-out')
            // }, 300);
        });
        link.ontransitionend = function () {
            //remove class
            link.classList.remove('animate-out');
        }

    })
}

function init() {

    initNavigation()

}

window.addEventListener('load', function () {
    init();
});