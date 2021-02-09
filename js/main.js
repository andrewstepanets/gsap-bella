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

const sections = document.querySelectorAll('.rg__column');

function initHoverReveal() {
    sections.forEach(section => {

        // get components for animation
        section.imageBlock = section.querySelector('.rg__image')
        section.image = section.querySelector('.rg__image img')
        section.mask = section.querySelector('.rg__image--mask')
        section.text = section.querySelector('.rg__text')
        section.textCopy = section.querySelector('.rg__text--copy')
        section.textMask = section.querySelector('.rg__text--mask')
        section.textP = section.querySelector('.rg__text--mask p')

        // reset the initial position
        gsap.set([section.imageBlock, section.textMask], { yPercent: -101 })
        gsap.set([section.mask, section.textP], { yPercent: 100 })
        gsap.set(section.image, { scale: 1.2 })

        // add event Listeners for each section 

        section.addEventListener('mouseenter', createHoverReveal)
        section.addEventListener('mouseleave', createHoverReveal)

    })
}

function getTextHeight(textCopy) {
    return -(textCopy.clientHeight / 2);
}

function createHoverReveal(e) {

    const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;

    // setup timeline
    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })
    if (e.type === 'mouseenter') {
        tl
            .to([mask, imageBlock, textMask, textP], { yPercent: 0 })
            .to(text, { y: () => getTextHeight(textCopy) }, 0)
            .to(image, { duration: 1.1, scale: 1 }, 0)
    } else if (e.type === 'mouseleave') {
        tl
            .to([mask, textP], { yPercent: 100 })
            .to([imageBlock, textMask], { yPercent: -101 }, 0)
            .to(text, { y: 0 }, 0)
            .to(image, { scale: 1.2 }, 0)
    }

    return tl;
}

function init() {

    initNavigation();

    initHeaderTilt();

    // initHoverReveal();

}

window.addEventListener('load', function () {
    init();
});

// define a brakpoint

const mq = window.matchMedia('(min-width: 768px)');

// add change listener to this breakpoint

mq.addEventListener('change', handleWithChange)

// first page load

handleWithChange(mq);

// reset all properties 

function resetProps(elements) {

    // this func stops all tweens 

    gsap.killTweensOf('*');

    if (elements.length) {
        elements.forEach(element => {
            element && gsap.set(element, { clearProps: 'all' });
        })
    }
}

// media query change
function handleWithChange(mq) {
    // check if we are on the right breakpoint
    if (mq.matches) {
        // setup hover animation
        initHoverReveal();
    } else {
        // width is less than 768px
        console.log('We are using a mobile');
        // remove event listener  for each sections 

        sections.forEach(section => {
            section.removeEventListener('mouseenter', createHoverReveal);
            section.removeEventListener('mouseleave', createHoverReveal);

            const { imageBlock, mask, text, textCopy, textMask, textP, image } = section;
            resetProps([imageBlock, mask, text, textCopy, textMask, textP, image]);
        })
    }
}