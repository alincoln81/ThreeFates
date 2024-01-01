
// Show/Hide Nav/Header on Scroll Up/Down
/*
var didScroll;
var lastScrollTop = 0;
var delta = 100;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    console.log(st);
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta) {
        console.log('did not scroll more than delta');
        return;
    }
    
    if (st > lastScrollTop && st > navbarHeight){
        console.log('hide nav');
        // Scroll Down Hide Nav
        $('header').removeClass('nav-down').addClass('nav-up');

    } else {
        // Scroll Up Show Nav
        if(st + $(window).height() < $(document).height()) {
            console.log('show nav');
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}
*/
//----------------------------------------------------------------------------------------------------------------------------

// Check if touch device
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
console.log(isTouch);

// Animate About Section Buttons on Hover
function startAnimText(el) {
    //console.log('mousenter: ', el.target.id);

    let targetSpans;

    if(el.target.id === 'aboutDiv') {
        targetSpans = sectionSpans[0];
    } else if(el.target.id === 'servicesDiv') {
        targetSpans = sectionSpans[1];
    } else if(el.target.id === 'processDiv') {
        targetSpans = sectionSpans[2];
    } else if(el.target.id === 'portfolioDiv') {
        targetSpans = sectionSpans[3];
    } else {
        console.log('Not Known');
    }

    //console.log(targetSpans);

    for(var i = 0; i < targetSpans.length; i++) {
        doSetTimeoutColor(targetSpans[i], i * 75, '#FFFFFF');
        doSetTimeoutColor(targetSpans[i], (i+1) * 150, '#24a8c4');
    }
}
function stopAnimText(el) {
    //console.log('mouseleave: ', el.target.id);
}
// Change Text Color
function doSetTimeoutColor(el, num, color) {
    //console.log(el.innerHTML, num);
    setTimeout(function() {
        changeColor(el, color);
    }, num);
}
function changeColor(e, color) {
    //console.log(e);
    e.style.color = color;
}
//-----------------------------------------------------------------------------------------------------------------------

// Change Fill Color ----------------------------------------------------------
function doSetTimeoutEyeFill(el, num, fill) {
    setTimeout(function() {
        changeFill(el, fill);
    }, num);
  }
function changeFill(e, fill) {
    e.style.fill = fill;
}

// Change Opacity -------------------------------------------------------------
function doSetTimeoutEyeOpacity(el, num, opacity) {
    setTimeout(function() {
        changeOpacity(el, opacity);
    }, num);
}
  function changeOpacity(e, opacity) {
    e.style.opacity = opacity;
}


// Handle About Section Clicks -------------------------------------------------------------
let section = [
    document.getElementById('toggle-animation-about'),
    document.getElementById('toggle-animation-services'),
    document.getElementById('toggle-animation-process'),
    document.getElementById('toggle-animation-portfolio')
];
let sectionButtons = [
    document.getElementById('aboutBut'),
    document.getElementById('servicesBut'),
    document.getElementById('processBut'),
    document.getElementById('portfolioBut')
];
let sectionSpans = [
    sectionButtons[0].getElementsByTagName('span'),
    sectionButtons[1].getElementsByTagName('span'),
    sectionButtons[2].getElementsByTagName('span'),
    sectionButtons[3].getElementsByTagName('span')
]

let sectionDivs = [
    document.getElementById('aboutDiv'),
    document.getElementById('servicesDiv'),
    document.getElementById('processDiv'),
    document.getElementById('portfolioDiv')
];


if(!isTouch) {
    for(var m = 0; m < sectionDivs.length; m++) {
        sectionDivs[m].addEventListener('mouseenter', startAnimText);
        sectionDivs[m].addEventListener('mouseleave', stopAnimText);
    }
}


let lastClicked = '';
let fillColor = '#24a8c4';

//SVG Manipulation
let leftSideEye = document.getElementById('left-side');
let leftSideEyePath = leftSideEye.getElementsByTagName('path');

let rightSideEye = document.getElementById('right-side');
let rightSideEyePath = rightSideEye.getElementsByTagName('path');


let outerIris = document.getElementById('outer-iris');
let outerIrisPaths = outerIris.getElementsByTagName('path');

let midIris = document.getElementById('mid-iris-inner');
let midIrisPaths = midIris.getElementsByTagName('path');

let innerIris = document.getElementById('inner-iris');
let innerIrisPaths = innerIris.getElementsByTagName('path');

let topSection = document.getElementById('about');

function clickedAbout(clicked) {
    //console.log('Clicked: ', clicked);
    //console.log('Last Clicked: ', lastClicked);
    

    if(!isTouch) {
        //Color Left & Right Eyes White or Blue based on Current Color
        if(fillColor === '#FFFFFF') {
            fillColor = '#24a8c4';
        } else {
            fillColor = '#FFFFFF';
        }
        for(var i = 0; i < leftSideEyePath.length; i++) {
            doSetTimeoutEyeFill(leftSideEyePath[i], (i+50) * 2.5, fillColor);
        }
        for(var j = 0; j < rightSideEyePath.length; j++) {
            doSetTimeoutEyeFill(rightSideEyePath[j], (j+50) * 2.5, fillColor);
        }

        //Adjust Mid Iris Opacities
        for(var j = 0; j < midIrisPaths.length; j++) {
            doSetTimeoutEyeOpacity(midIrisPaths[j], j * 0.3, '1');
            doSetTimeoutEyeFill(midIrisPaths[j], j*0.3, '#24a8c4');
            doSetTimeoutEyeOpacity(midIrisPaths[j], (j+10) * 0.8, midIrisPaths[j].style.opacity);
            doSetTimeoutEyeFill(midIrisPaths[j], (j+10) * 0.8, midIrisPaths[j].style.fill);
        }
        

        //Adjust Inner Iris Opacities
        for(var j = 0; j < innerIrisPaths.length; j++) {
            doSetTimeoutEyeOpacity(innerIrisPaths[j], j * 0.3, '1');
            doSetTimeoutEyeFill(innerIrisPaths[j], j * 0.3, '#FFFFFF');
            doSetTimeoutEyeOpacity(innerIrisPaths[j], (j+10) * 0.8, innerIrisPaths[j].style.opacity);
            doSetTimeoutEyeFill(innerIrisPaths[j], (j+10) * 0.8, innerIrisPaths[j].style.fill);
        }

    }

    //----------------------------------------------------------------
    // Remove Active Class from All Buttons
    for(var l = 0; l < sectionButtons.length; l++) {
        sectionButtons[l].classList.remove('active');
    }

    //----------------------------------------------------------------
    // Save the Clicked Button
    let clickedBut;
    if(clicked === 'about') {
        clickedBut = sectionButtons[0];
    } else if(clicked === 'services') {
        clickedBut = sectionButtons[1];
    } else if(clicked === 'process') {
        clickedBut = sectionButtons[2];
    } else if(clicked === 'portfolio') {
        clickedBut = sectionButtons[3];
    } else {
        console.log('Not Known');
    }

    //----------------------------------------------------------------
    // Open/Close the correct sections
    if(clicked === lastClicked) {
        //console.log('clicked already open section, closing it.');
        lastClicked = '';

    } else {
        
        topSection.scrollIntoView({ behavior: "smooth" });
        /*setTimeout(() => {
            $('header').removeClass('nav-down').addClass('nav-up');
        }, 500);
        */

        //Add Active Class to the last Clicked Button
        clickedBut.classList.add('active');
        //console.log('clicked new section, opening it.');

        for(var i = 0; i < section.length; i++) {
            //Close other open sections
            if(!section[i].hasAttribute('hidden')) {
                section[i].setAttribute("hidden", "true");
            }
        }
        lastClicked = clicked;
    }
}