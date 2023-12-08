

function addHoverEffectListener() {
    
    let skillIcons = document.getElementsByClassName('skill');

    console.log('called', skillIcons);

    for (let i = 0; i < skillIcons.length; i++) {

        console.log('called');
        console.log(skillIcons[i]);

        skillIcons[i].addEventListener("mouseover", addHoverEffect, false);
        skillIcons[i].addEventListener("mouseout", removeHoverEffect, false);
    }
}

function addHoverEffect(event) {
    console.log('called', event);
    event.target.classList.add('fa-flip');
}
function removeHoverEffect(event) {
    console.log('called', event);
    event.target.classList.remove('fa-flip');
}

//INIT
//addHoverEffectListener();