// Check if touch device
let isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

// Variables -------------------------------------------------------------
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

let lastClicked = '';
let fillColor = '#24a8c4';

//SVG Variables ---------------------------------------
let leftSideEye;
let leftSideEyePath;
let rightSideEye;
let rightSideEyePath;
//let outerIris;
//let outerIrisPaths;
let midIris;
let midIrisPaths;
let innerIris;
let innerIrisPaths;

let topSection = document.getElementById('about');

// Initialize -------------------------------------------------------------------------------------------
function init() {

    if(!isTouch) {
        for(var m = 0; m < sectionDivs.length; m++) {
            sectionDivs[m].addEventListener('mouseenter', startAnimText);
            sectionDivs[m].addEventListener('mouseleave', stopAnimText);
        }
    } 
}

// Functions ----------------------------------------------------------------------------------------------
function clickedAbout(clicked) {
    //console.log('Clicked: ', clicked);
    //console.log('Last Clicked: ', lastClicked);

    if(!isTouch) {

        leftSideEye = document.getElementById('left-side');
        leftSideEyePath = leftSideEye.getElementsByTagName('path');

        rightSideEye = document.getElementById('right-side');
        rightSideEyePath = rightSideEye.getElementsByTagName('path');

        //outerIris = document.getElementById('outer-iris');
        //outerIrisPaths = outerIris.getElementsByTagName('path');

        midIris = document.getElementById('mid-iris-inner');
        midIrisPaths = midIris.getElementsByTagName('path');

        innerIris = document.getElementById('inner-iris');
        innerIrisPaths = innerIris.getElementsByTagName('path');

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

// Initialize -----------------------------------------------------------------------------------
init();