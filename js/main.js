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
    })
}

// Move images in Header 

function moveImages(e) {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    // get 0,0 in the center

    const leftImages = gsap.utils.toArray('.hg__left .hg__image');
    const rightImages = gsap.utils.toArray('.hg__right .hg__image');

    // add modifier func to get variety data x and y
    const modifier = (index) => index * 1.2 + 0.5;

    // move left 3 images
    leftImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            rotationY: xPos * 40,
            rotationX: yPos * 10,
            ease: 'power3.out'

        })
    })
    // move right 3 images
    rightImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: -yPos * 30 * modifier(index),
            rotationY: xPos * 40,
            rotationX: yPos * 10,
            ease: 'power3.out'
        })
    })
    // animate decor circle
    gsap.to('.decor__circle', {
        duration: 1.7,
        x: 100 * xPos,
        y: 120 * yPos,
        ease: 'power4.out'
    })
}

function initHeaderTilt() {
    const header = document.querySelector('header');
    header.addEventListener('mousemove', moveImages)
}


// Reveal Gallery Block 


function initHoverReveal() {
    const sections = document.querySelectorAll('.rg__column');
    sections.forEach(section => {

        // get components for animation
        section.imageBlock = section.querySelector('.rg__image')
        section.mask = section.querySelector('.rg__image--mask')

        // reset the initial position
        gsap.set(section.imageBlock, { yPercent: -101 })
        gsap.set(section.mask, { yPercent: 100 })

        // add event Listeners for each section 

        section.addEventListener('mouseenter', createHoverReveal)
        section.addEventListener('mouseleave', createHoverReveal)

    })
}

function createHoverReveal(e) {

    const { imageBlock, mask } = e.target;

    // setup timeline
    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })
    if (e.type === 'mouseenter') {
        tl.to([mask, imageBlock], { yPercent: 0 })
    } else if (e.type === 'mouseleave') {
        tl.to(mask, { yPercent: 100 })
            .to(imageBlock, { yPercent: -101 }, 0)
    }

    return tl;
}

function init() {

    initNavigation();

    initHeaderTilt();

    initHoverReveal();

}

window.addEventListener('load', function () {
    init();
});