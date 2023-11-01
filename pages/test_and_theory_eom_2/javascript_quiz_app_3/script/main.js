const anwserArr4 = ['Шибер', 'Клин', 'Диск']
const imgPathArr = ['./content/03_01.png', './content/03_02.png', './content/03_03.png'] 

const row3 = document.getElementById('row3')
const collumnInner = document.getElementById('drag4-inner')

let rowList2 = []
let fieldsList = []
let fullList2 = []

let dragElem3;
let startIndx2;
let endIndx2;


let numberOfQuestion = 3; 
let numberOfQuestionSum = 13;

let stepMarkerPlace = document.querySelector('.step_marker');
console.log("stepMarkerPlace")
for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    stepMarkerPlace.appendChild(markers);
}

for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    stepMarkerPlace.appendChild(markers);
}

let stepPlaceDescription = document.querySelector('.number_description');
stepPlaceDescription.innerHTML = numberOfQuestion + '/' + numberOfQuestionSum;

let questionText = 'Установите соответствие между схемой запорного органа и его названием'
let questionPlase = document.querySelector('#question_text_1');
questionPlase.innerHTML = '<span>' + numberOfQuestion + '. ' + '</span>' + questionText;




createRow2()
createColumnElement()

addEventListeners4()

function createRow2() {
    [...anwserArr4]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const rowItem = document.createElement('li')

        rowItem.setAttribute('id', index)
        rowItem.classList.add('item4')
        rowItem.draggable = 'true'
        rowItem.innerText = item

        rowList2.push(rowItem)
        row3.appendChild(rowItem)
    })
}

function createColumnElement() {
    imgPathArr.forEach((item, index) => {
        const field = document.createElement('div')

        field.classList.add('field-col')
        field.innerHTML = `
        <img class="img-col" src="${item}" alt="img">
        <div class="field" index="${index}"></div>
        `
        fullList2.push(field)
        collumnInner.appendChild(field)

        let zoomButton = document.createElement('button');
        zoomButton.classList.add('zoom_button');
        zoomButton.id = 'zoom_button_' + `${index}`;
        zoomButton.innerHTML = '<img class="img-zoom" src="./content/zoom_up.svg">';
        field.appendChild(zoomButton);
    })
}

function dragStart3() {
    dragElem3 = this;
    if (this.parentNode.getAttribute('index') === 'row2') {
        startIndx2 = this.parentNode.getAttribute('index')
    } else {
        startIndx2 = +this.closest('.field').getAttribute('index')
    }
}

function dragEnd3() {
    dragElem3 = null
}

function dragEnter3() {
    this.classList.add('over');
}

function dragLeave3() {
    this.classList.remove('over');
}

function dragOver3(e) {
    e.preventDefault();
}

function dragDrop3() {
    if (this.getAttribute('index') === 'row2') {
        endIndx2 = this.getAttribute('index');
    } else {
        endIndx2 = +this.getAttribute('index');
    }
    
    const indexDragElem = +dragElem3.getAttribute('id')

    if (startIndx2 === 'row2' && this.childNodes.length === 0) {
        this.append(dragElem3)
        dragElem3.classList.add('none-border')
    } else if (startIndx2 !== undefined && this.childNodes.length === 0) {
        this.append(dragElem3)
    } else if (startIndx2 === 'row2' && this.childNodes.length !== 0) {
        swap2(endIndx2, indexDragElem)
    } else if (startIndx2 !== undefined && endIndx2 === 'row2') {
        this.append(dragElem3)
        dragElem3.classList.remove('none-border')
    } else if (startIndx2 !== undefined && endIndx2 !== undefined && endIndx2 !== 'row2') {
        swapItems3(startIndx2, endIndx2);
    }
    this.classList.remove('over');
}

function swap2(end, start) {
    const itemOne = rowList2[start]
    const itemTwo = fullList2[end].querySelector('.item4')

    itemOne.classList.add('none-border')
    itemTwo.classList.remove('none-border')

    rowList2[start].replaceWith(itemTwo)
    fullList2[end].children[1].append(itemOne)
}

function swapItems3(fromIndex, toIndex) {
    const itemOne = fullList2[fromIndex].querySelector('.item4');
    const itemTwo = fullList2[toIndex].querySelector('.item4');

    fullList2[fromIndex].children[1].appendChild(itemTwo);
    fullList2[toIndex].children[1].appendChild(itemOne);
}

let answerButton = document.querySelector('#check_button_1')
let reloadButton = document.querySelector('#check_button_2')
let nextButton = document.querySelector('#check_button_3')
reloadButton.addEventListener('click', function(){
    window.location.reload();
});

function checkAnwser4() {
    fullList2.forEach((item, index) => {
        if (item.children[1].querySelector('.item4')?.innerText.trim() === undefined) {
            localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
            item.children[1].classList.add('incorrect')
            reloadButton.classList.remove('disabled_button')
            nextButton.classList.remove('disabled_button')
            answerButton.classList.add('disabled_button')
        } else {
            const itemName = item.children[1].querySelector('.item4').innerText.trim();

            if (itemName !== anwserArr4[index]) {
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
                item.children[1].classList.add('incorrect')
                reloadButton.classList.remove('disabled_button')
                nextButton.classList.remove('disabled_button')
                answerButton.classList.add('disabled_button')
            } else {
                item.children[1].classList.remove('incorrect')
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
                item.children[1].classList.add('correct')
                reloadButton.classList.remove('disabled_button')
                nextButton.classList.remove('disabled_button')
                answerButton.classList.add('disabled_button')
            }
        }
    });
}

function addEventListeners4() {
    const itemElem = document.querySelectorAll('.item4');
    const fieldsElem = document.querySelectorAll('.field');
    const rowElem = document.querySelectorAll('.row')

    itemElem.forEach((item) => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart3);
        item.addEventListener('dragend', dragEnd3);
    });
    fieldsElem.forEach((elem) => {
        elem.addEventListener('dragover', dragOver3);
        elem.addEventListener('dragenter', dragEnter3);
        elem.addEventListener('dragleave', dragLeave3);
        elem.addEventListener('drop', dragDrop3);
    });
    rowElem.forEach((elem) => {
        elem.addEventListener('dragover', dragOver3);
        elem.addEventListener('dragenter', dragEnter3);
        elem.addEventListener('dragleave', dragLeave3);
        elem.addEventListener('drop', dragDrop3);
    })
}

let zoomImgButton1 = document.querySelector('#zoom_button_0');
let zoomImgButton2 = document.querySelector('#zoom_button_1');
let zoomImgButton3 = document.querySelector('#zoom_button_2');
let zoomImgButton4 = document.querySelector('#zoom_button_3');

let popUpImg1 = document.querySelector('#popup1');
let popUpImg2 = document.querySelector('#popup2');
let popUpImg3 = document.querySelector('#popup3');
let popUpImg4 = document.querySelector('#popup4');

let closePopUpbutton1 = document.querySelector('#close_popup_button_1');
let closePopUpbutton2 = document.querySelector('#close_popup_button_2');
let closePopUpbutton3 = document.querySelector('#close_popup_button_3');
let closePopUpbutton4 = document.querySelector('#close_popup_button_4');

zoomImgButton1.addEventListener('click', function(){
    popUpImg1.classList.remove('close');
});

closePopUpbutton1.addEventListener('click', function(){
    popUpImg1.classList.add('close');
});


zoomImgButton2.addEventListener('click', function(){
    popUpImg2.classList.remove('close');
});

closePopUpbutton2.addEventListener('click', function(){
    popUpImg2.classList.add('close');
});


zoomImgButton3.addEventListener('click', function(){
    popUpImg3.classList.remove('close');
});

closePopUpbutton3.addEventListener('click', function(){
    popUpImg3.classList.add('close');
});

let descriptionBtn = document.querySelector('#description_button')

descriptionBtn.addEventListener('click', function(){
    popUpImg4.classList.remove('close');
});

closePopUpbutton4.addEventListener('click', function(){
    popUpImg4.classList.add('close');
});