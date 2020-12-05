const pop = document.querySelector('.pop'),
closePop = pop.querySelector('.close'),
confirmPop = document.querySelector('.confirm');

const HIDE = 'pop__showing';


const popUp = ()=> {
    closePop.addEventListener('click',()=>pop.classList.add(HIDE));
    confirmPop.addEventListener('click',()=>pop.classList.remove(HIDE))
}

popUp()