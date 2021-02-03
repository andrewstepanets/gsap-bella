gsap.registerPlugin(ScrollTrigger);

// this func need to be animated after hover link effect


function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();

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

    // nav links animation function

    function navAnimation(direction) {
        const scrollingDown = direction === 1;
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev
        return gsap.to(links, {
            duration: 0.3,
            stagger: 0.05,
            autoAlpha: () => scrollingDown ? 0 : 1,
            y: () => scrollingDown ? 20 : 0,
            ease: 'power4.out'
        })
    }


    // Add .hasScrolled class when scroll down 100px

    ScrollTrigger.create({
        start: 100,
        end: 'bottom bottom-=200',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({ direction }) => navAnimation(direction),
        onLeaveBack: ({ direction }) => navAnimation(direction),
        markers: true
    })
}

function init() {

    initNavigation()

}

window.addEventListener('load', function () {
    init();
});