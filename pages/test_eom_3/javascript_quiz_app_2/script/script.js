// dran&drop 2
const anwserArr2 = ['мембранные разрывные устройства', 'задвижка', 'клапаны регулирующие', 'дроссели', 'кран', 'вентиль', 'клапаны предохранительные', 'клапаны перепускные']; //Ответы
const countCol = 3; //Колличесвто колонн
const correctAnwser1 = ['кран', 'вентиль' , 'задвижка'] //Правильные варианты. Кол-во масивов в соотвествиие с кол-ом колонн
const correctAnwser2 = ['клапаны регулирующие', 'дроссели',] //correctAnwser1 - 1 колонна и т.д.
const correctAnwser3 = ['клапаны предохранительные', 'мембранные разрывные устройства', 'клапаны перепускные']
const correctAnwsers = [
    correctAnwser1, 
    correctAnwser2,
    correctAnwser3
] //Сюда надо тоже добавить







const collumns = document.getElementById('columns')
const row = document.getElementById('row')


let areaIndex;
let startIndex;
let dragElem = null;
let rowArr = []

let data = {}

init2()

function init2() {
    createColumns();
    localStorage.getItem('data3') ? loadList2() : createList2()
}

let numberOfQuestion = 2; 
let numberOfQuestionSum = 10;

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

let popUpWindow = document.querySelector('#popup1')
let closePopUpButton = document.querySelector('#close_popup_button_1')
let openPopUpButton = document.querySelector('#number_marker_img_1');
openPopUpButton.addEventListener('click', function(){
    popUpWindow.classList.remove('close')
})
closePopUpButton.addEventListener('click', function(){
    popUpWindow.classList.add('close')
})




let questionText = 'Установите соответствие между названиями трубопроводной арматуры и признаками классификации';

let stepPlaceDescription = document.querySelector('#description_place_1');
stepPlaceDescription.innerHTML = numberOfQuestion + '/' + numberOfQuestionSum;

let questionPlace = document.querySelector('#question_place_1')
questionPlace.innerHTML = '<span>' + numberOfQuestion + '. ' + '</span>' + questionText;

let descriptionPlace = document.querySelector('#description_place_1');
descriptionPlace.innerHTML = '<strong>' + numberOfQuestion + '/' + numberOfQuestionSum + '</strong>';

function createColumns() {
    let columnDiv = document.querySelector('.drag2')
    let columnHeaderDiv = document.createElement('div')
    columnHeaderDiv.classList.add('column_headerd_div')
    let columnHeader = document.createElement('span')
    let columnHeader2 = document.createElement('span')
    let columnHeader3 = document.createElement('span')
    columnHeader.innerHTML = 'Запорная'
    columnHeader2.innerHTML = 'Регулирующая'
    columnHeader3.innerHTML = 'Предохранительная'
    columnHeaderDiv.appendChild(columnHeader) 
    columnHeaderDiv.appendChild(columnHeader2) 
    columnHeaderDiv.appendChild(columnHeader3) 
    columnDiv.appendChild(columnHeaderDiv)


    for(let i = 0; i < countCol; i++)  {
        const col = document.createElement('div')

        col.classList.add('col')
        col.innerHTML = `
        <ul class='col-ul' index='${i}'></ul>
        `;
        col.id = 'col_ul_' + i;
        data[i] = []
        collumns.appendChild(col)
    }
    areaIndex = document.querySelectorAll('.col-ul').length
    data[areaIndex] = []
    row.setAttribute('index', areaIndex)
}

function createList2() {
    anwserArr2.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item2');
        listItem.draggable = 'true';
        listItem.innerText = item

        data[areaIndex].push(listItem.innerText)
        row.appendChild(listItem)
    })
    localStorage.setItem('data3', JSON.stringify(data))

    addEventListeners2();
}

function loadList2() {
    fromStore2();

    const tempArr = []

    anwserArr2.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item2');
        listItem.draggable = 'true';
        listItem.innerText = item

        tempArr.push(listItem)
    })

    for (let key in data) {
        data[key].map(key2 => {
            tempArr.map(key3 => {
                document.querySelectorAll('.col-ul').forEach((item, index) => {
                    
                    if (key == index && key2 === key3.innerText) {
                        item.appendChild(key3)
                    }
                })
            })
        })
    }

    let keyLast = Object.keys(data)
    let rowData = data[keyLast[keyLast.length - 1]]

    rowData.forEach((item, index) => {
        tempArr.map(item2 => {
            if (item == item2.innerText) {
                row.appendChild(item2)
            }
        })
    })

    addEventListeners2();   
}

function fromStore2() {
    data = JSON.parse(localStorage.getItem('data3'))
}


function startDragBlock() {
    dragElem = this;
    this.classList.add('hide');
    if (this.closest('div').getAttribute('index') === null) {
        startIndex = this.closest('ul').getAttribute('index')
    } else  {
        startIndex = this.closest('div').getAttribute('index')
    }
}
function endDragBlock() {
    dragElem = null;
    this.classList.remove('hide');
}
function dragColOver(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColEnter(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColLeave() {
    this.classList.remove('hover');
}
function dropColBox() {
    this.append(dragElem);
    this.classList.remove('hover');
    let endIndex = this.getAttribute('index');

    refreshData(startIndex, endIndex);
}

function refreshData(s, e) {
    data[e].push(dragElem.innerText)
    data[s] = data[s].filter((i) => i !== dragElem.innerText)

    localStorage.setItem('data3', JSON.stringify(data))
}

let nextBtn = document.querySelector('#check_button_3')
let ansBtn = document.querySelector('#check_button_1')
let refreshBtn = document.querySelector('#check_button_4')

function checkAnwser2() {
    fromStore2();

    const convertedArr = Object.entries(data)

    convertedArr.map((item, index) => {
        item.splice(0, 1)
        item.map((item2, index2) => {
            const tempArr = item2.sort()
            correctAnwsers.map((item3, index3) => {
                const tempArr2 = item3.sort()
                const resCol = document.querySelectorAll(`.col-ul[index="${index3}"]`)
                resCol.forEach((el) => {
                    if (index === index3 && JSON.stringify(tempArr) === JSON.stringify(tempArr2)) {
                        localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
                        el.parentElement.classList.remove('incorrect')
                        el.parentElement.classList.add('correct')
                        refreshBtn.classList.remove('disabled_button')
                        nextBtn.classList.remove('disabled_button')
                        ansBtn.classList.add('disabled_button')
                    } else if (index === index3 && JSON.stringify(tempArr) !== JSON.stringify(tempArr2)) {
                        localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
                        el.parentElement.classList.add('incorrect')
                        refreshBtn.classList.remove('disabled_button')
                        nextBtn.classList.remove('disabled_button')
                        ansBtn.classList.add('disabled_button')
                    }
                })
            })
        })
    })
}

function refreshAnwser2() {
    const columns = document.querySelectorAll('.col-ul')
    const items = document.querySelectorAll('.item2')
    let lastKey;
    window.location.reload();
    Array.prototype.diff = function(a) {
        return this.filter(function(i){return a.indexOf(i) < 0;});
    };

    
    for (key in data) {
        if (!data.hasOwnProperty(Number(key) + 1)) {
            lastKey = key
        } else {
            data[key] = []
        }
    }

    anwserArr2.diff(data[`${lastKey}`]).map((item) => {
        data[`${lastKey}`].push(item)
    })

    items.forEach((item, index) => {
        row.append(item)
    })

    localStorage.setItem('data3', JSON.stringify(data))
}

function addEventListeners2() {
    const items2 = document.querySelectorAll('.item2');
    const colms = document.querySelectorAll('.col-ul');

    items2.forEach((item) => {
        item.draggable = true;
        item.addEventListener('dragstart', startDragBlock);
        item.addEventListener('dragend', endDragBlock);
    });
    colms.forEach((col) => {
        col.addEventListener('dragover', dragColOver);
        col.addEventListener('dragenter', dragColEnter);
        col.addEventListener('dragleave', dragColLeave);
        col.addEventListener('drop', dropColBox);
    });
}


let colHeader1 = document.querySelector('#col_ul_0')
let colHeader2 = document.querySelector('#col_ul_1')
let colHeader3 = document.querySelector('#col_ul_2')

