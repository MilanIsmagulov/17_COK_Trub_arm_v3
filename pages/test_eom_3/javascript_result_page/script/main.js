let resultPlaceTrue = document.querySelector('#result_place_1');
let resultPlaceFalse = document.querySelector('#result_place_2');
let questionNumberPlace = document.querySelector('#place_question_number');
let questionPercentPlace = document.querySelector('#place_question_percent');
let answerDiagram = document.querySelector('#answer_diagram_1');
let trueAnswers = 0;
let falseAnswers = 0;
// localStorage.setItem('answer_3', JSON.stringify({questionPlace: false}));

let sixZero = JSON.parse(localStorage.getItem('answer_0_6'))
let sixOne = JSON.parse(localStorage.getItem('answer_1_6'))
let sixTwo = JSON.parse(localStorage.getItem('answer_2_6'))

let sevenZero = JSON.parse(localStorage.getItem('answer_0_7'))
let sevenOne = JSON.parse(localStorage.getItem('answer_2_7'))
let sevenTwo = JSON.parse(localStorage.getItem('answer_4_7'))

let sevenBoolean;
let sixBoolean;

if (sixZero.questionPlace === true && sixOne.questionPlace === true && sixOne.questionPlace === true){
    sixBoolean = true
    
} else {
    sixBoolean = false

} 

if (sevenZero.questionPlace === true && sevenOne.questionPlace === true && sevenTwo.questionPlace === true){
    sevenBoolean = true
    
} else {
    sevenBoolean = false

} 





let resultData = [
    JSON.parse(localStorage.getItem('answer_1')),
    JSON.parse(localStorage.getItem('answer_2')),
    JSON.parse(localStorage.getItem('answer_3')),
    JSON.parse(localStorage.getItem('answer_4')),
    JSON.parse(localStorage.getItem('answer_5')),
    {"questionPlace":sixBoolean},
    {"questionPlace":sevenBoolean},
    JSON.parse(localStorage.getItem('answer_8')),
    JSON.parse(localStorage.getItem('answer_9')),
    JSON.parse(localStorage.getItem('answer_10')),
];



questionNumberPlace.innerHTML = resultData.length;


for (let i = 0; i < resultData.length; i++){
    
    if (resultData[i].questionPlace === true){
        trueAnswers++;

    } else {
        falseAnswers++;
        
    }
    
} 

resultPlaceTrue.innerHTML = trueAnswers;
resultPlaceFalse.innerHTML = falseAnswers;

let percentOfAnswers =  Math.floor((trueAnswers/resultData.length)*100)

questionPercentPlace.innerHTML = percentOfAnswers + '<strong>%</strong>';
// answerDiagram.innerHTML = percentOfAnswers + '%';
answerDiagram.setAttribute('style', '--p:' + percentOfAnswers + ';' + '--c:rgb(0, 114, 192);');
