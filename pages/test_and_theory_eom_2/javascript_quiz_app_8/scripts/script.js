// dran&drop 1
let checkAnwserButton = document.querySelector('#control_button_2')
let reloadButton = document.querySelector('#control_button_3')
let backButton = document.querySelector('#control_button_1')
let nextButton = document.querySelector('#control_button_4')
// let 
const anwserArr = ['Открутите гайки крепления втулки и отведите кронштейны', 'Подтяните равномерно гайки крепления втулки сальника', 'Установите новую сальниковую набивку', 'Подготовьте новую сальниковую набивку необходимой длины', 'Установите на место кронштейны крепления втулки сальника', 'Уплотните сальниковые кольца', 'Извлеките изношенную сальниковую набивку',];
let questionPlace = 'Распределите в правильной последовательности этапы замены сальниковой набивки';


function reloadPage(){
    window.location.reload();

}


let numberOfQuestion = 8; 
let numberOfQuestionSum = 13;

if (numberOfQuestion !== 1){
    backButton.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion-1}/index.html'`)
}

if (numberOfQuestion != numberOfQuestionSum){
    nextButton.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
} else {
    nextButton.setAttribute('onclick',`location.href='../javascript_result_page/index.html'`)
}



let questionHead = document.querySelector('#number_question_head');

questionHead.innerHTML = '<span>' + numberOfQuestion + '. ' + '</span>' + questionPlace;

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


let stepPlaceDescription = document.querySelector('.number_question_ten');
stepPlaceDescription.innerHTML = '<strong>' + numberOfQuestion + '/' + numberOfQuestionSum + '</strong>';


const list = document.getElementById('list');
let storeItems = [];
let listItems = [];
let dragStartIndex;

init();

function init() {
    localStorage.getItem(`data${numberOfQuestionSum}+${numberOfQuestion}`) ? loadList() : createList()
}


function createList() {
    [...anwserArr]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.innerHTML = `<div class="item" draggable="true">${item}</div>`;

        var num = document.createElement('span');
        num.setAttribute('class', 'number');
        num.innerHTML = `${index+1}`;
        document.getElementsByClassName("numbers")[0].appendChild(num);

        listItems.push(listItem);
        list.appendChild(listItem);
    });


    for (i in listItems) {
        storeItems.push(i);
    }

    localStorage.setItem(`data+${numberOfQuestionSum}+${numberOfQuestion}`, JSON.stringify(storeItems));

    // addEventListeners();
}


function loadList() {
    fromStore();

    [...storeItems]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', index);
        listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
        listItems.push(listItem);
        list.appendChild(listItem);
    });

    [...storeItems]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', index);
        listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
        listItems.push(listItem);
        list.appendChild(listItem);
    });
    // addEventListeners()
}


function toStore() {
    localStorage.setItem(`data+${numberOfQuestionSum}+${numberOfQuestion}`, JSON.stringify(storeItems));
}


function fromStore() {
    storeItems = JSON.parse(localStorage.getItem(`data+${numberOfQuestionSum}+${numberOfQuestion}`));
}


function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}


function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

    storeItems = []
    for (i of listItems) {
        
        storeItems.push(i.children[1].innerText);
    }
    localStorage.setItem(`data+${numberOfQuestionSum}+${numberOfQuestion}`, JSON.stringify(storeItems));
}

function getCurrentList() {
    
}


function checkAnwser() {
    listItems = document.getElementsByClassName("list");
    console.log(listItems[0]);

    let i = 0;

    for (item of listItems[0].children){
        itemText = item.getElementsByTagName('div')[0].innerText;
        let index = i;

        if (itemText !== anwserArr[index]) {
            item.classList.add('incorrect')
            localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
            checkAnwserButton.classList.add('disabled_button')
            reloadButton.classList.remove('disabled_button')
            nextButton.classList.remove('disabled_button')
        } else {
            localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
            item.classList.remove('incorrect')
            item.classList.add('correct')
            checkAnwserButton.classList.add('disabled_button')
            reloadButton.classList.remove('disabled_button')
            nextButton.classList.remove('disabled_button')
        }
        i++;
    }

    listItems.forEach((item, index) => {
        itemText = item.getElementsByTagName('div')[0].innerText;
        console.log(index);
        console.log(itemText);
        console.log("_________");



        
    });
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.item');
    const dragListItems = document.querySelectorAll('.list li');

    draggables.forEach((draggable) => {
        // draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
        // item.addEventListener('dragover', dragOver);
        // item.addEventListener('drop', dragDrop);
        // item.addEventListener('dragenter', dragEnter);
        // item.addEventListener('dragleave', dragLeave);
    });
}

function openPopUp(){
    let popUpWindow = document.querySelector('#popup1')
    popUpWindow.classList.remove('close')
}

function closePopUp(){
    let popUpWindow = document.querySelector('#popup1')
    popUpWindow.classList.add('close')
}



// var el = [el0,el1];
var el = document.getElementById('list');

var sortable = new Sortable(el, {
    swap: true,
    swapClass: "highlight",
    animation: 150,
});




