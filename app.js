import { words } from './words.js';

const   lines = document.querySelectorAll('.line'),
        specialKeys = document.querySelectorAll('.key__special'),
        keys = document.querySelectorAll('.key'),
        playAgain = document.querySelector('.playAgain');

let     j = 0,
        currentIndex = 0,
        currentLine = 0,
        word = words[Math.floor(Math.random()*words.length)],
        arrayWord = word.split(''),
        winning = false;
console.log(word);
console.log(arrayWord);
document.addEventListener('DOMContentLoaded', blockLines)

keys.forEach(key => {
    key.addEventListener('click', e=>{
        writeLine(e.target);
    })
})

specialKeys.forEach(key => {
    key.addEventListener('click', e => {
        actionsKeys(e.currentTarget);
    })
})

playAgain.addEventListener('click', reset);

function writeLine(key){
    let letter = key.innerText;
    let currentLetter = lines[currentLine].querySelectorAll('.letter');
    if(currentIndex <= 4){
        console.log(currentLine)
        currentLetter[currentIndex].innerText = letter;
        currentIndex++;
    }
}

function blockLines(){
    for (let i = 0; i < 6; i++) {
        let currentLetters = lines[i].querySelectorAll('.letter');
        currentLetters.forEach(letter => {
            if(i === currentLine){
                letter.classList.remove('block');
            }else{
                letter.classList.add('block');
            }
        })
    }
}

function actionsKeys(key){
    let code = key.dataset.code;
    let currentLetter = lines[j].querySelectorAll('.letter');

    if(code == 13){
        if(currentIndex > 0 && currentIndex <= 4){
            currentLetter[currentIndex].innerText = '';
            currentIndex--;
            currentLetter[currentIndex].innerText = '';
        }
        if(currentIndex == 5){
            currentIndex--;
            currentLetter[currentIndex].innerText = '';
        }
    }

    if(code == 8){
        verifyWord();
    }
}

function verifyWord(){
    let letters = lines[currentLine].querySelectorAll('.letter');
    let filled = 0;
    let correct = 0;

    letters.forEach(letter => {
        if(letter.innerText !== ''){
            filled++;
        }
    });

    if(filled < 5){
        alert('Preencha todos os campos');
        return false;
    }

    letters.forEach((letter, i) => {
        let currentLetter = letter.innerText.toUpperCase();
        console.log(arrayWord[i], currentLetter)

        if(currentLetter === arrayWord[i]){
            letter.classList.add('correct');
            correct++;
        }else if(arrayWord.includes(currentLetter)){
            letter.classList.add('alert');
        }else{
            letter.classList.add('wrong');
        }
    })

    if(correct === 5){
        win();
        return true;
    }

    changeLine();
}

function changeLine(){
    if(currentLine < 5 && winning === false){
        currentLine++;
        currentIndex = 0;
        blockLines();
    }
}

// TODO: Funções de vitoria e derrota. Criar contagem de numero de jogos,
// numero de vitorias e derrotas. Montar a estatistica. Verificar, também,
// em que round o usuario ganhou. Salvar em Cookie no computador do user

function win(){
    winning = true;
    document.body.classList.add('win');
    
    if(localStorage.getItem('victories')){
        localStorage.setItem('victories', parseInt(localStorage.getItem('victories')) + 1)
    }else{
        localStorage.setItem('victories', 1)
    }

    document.querySelector('.numero-vitorias').innerText = localStorage.getItem('victories');
}

function reset(){
    location.reload();
    return false;
}