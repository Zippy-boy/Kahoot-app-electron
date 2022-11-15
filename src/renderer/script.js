
let url;
let kahoot_id = url;
let answers_url = `https://create.kahoot.it/rest/kahoots/` + kahoot_id + `/card/?includeKahoot=true`;

let numberOfPeople = 0;
let numberOfPeopleHTML = document.getElementById("numberOfPeople");
let questionHTML = document.getElementById("question");
let answerHTML = document.getElementById("awnser");
let placeHTML = document.getElementById("place");

let pages = [];
let question_number = 0;
let num = 0;
let count = 0;

const setHTML = (pages, question_number) => {
    numberOfPeopleHTML.innerHTML = question_number+1;
    questionHTML.innerHTML = pages[question_number].question;
    answerHTML.innerHTML = pages[question_number].answer;
    placeHTML.innerHTML = pages[question_number].correct;
};

function increasePage() {
    if (numberOfPeople < pages.length - 1) {
        numberOfPeople = numberOfPeople + 1;
        // console.log(numberOfPeople);
        setHTML(pages, numberOfPeople);
    }
}

function decreasePage() {
    if (numberOfPeople >= 1) {
        numberOfPeople = numberOfPeople - 1;
        // console.log(numberOfPeople);
        setHTML(pages, numberOfPeople);
    }
}

function enter() {
    url = document.getElementById("IdInput").value
    answers_url = `https://create.kahoot.it/rest/kahoots/` + url + `/card/?includeKahoot=true`;
    fetch(answers_url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            try {
                for(let q in data.kahoot.questions) {
                    count = 0;
                    try {
                        //console.log(data.kahoot.questions[q].question);
                        for(let choice in data.kahoot.questions[q].choices) {
                            count++;
                            if(data.kahoot.questions[q].choices[choice].correct == true) {
                                break;
                            }
                        }
                        num = count; count = 0;
                        question_number++;
                        console.log(num);
                        pages.push({
                            question: (data.kahoot.questions[q].question),
                            answer: (data.kahoot.questions[q].choices[num-1].answer),
                            correct: num
                        });
                    } catch(error) {console.log(error);}
                }
                setHTML(pages, 0);
            } catch (error) {questionHTML.innerHTML = error}
        }
    );
}

