const questions = [
    {
        question: "Откуда же эта кошечка?",
        answers: ["Кладбище домашних животных", "Чужой", "Гарри Поттер", "Крёстный отец"],
        correct: 3,
        images: ["harrypotter"]
    },

    {
        question: "А в каком мультфильме был такой котик?",
        answers: ["Тайная жизнь домашних животных", "Душа", "Тайная жизнь домашних животных 2", "Остров собак"],
        correct: 2,
        images: ["soul"]
    },

    {
        question: "А в каком же фильме с Брюсом Уиллисом была такая котейка?",
        answers: ["Шестое чувтво", "Крепкий орешек 3", "Пятый элемент", "Криминальное чтиво"],
        correct: 3,
        images: ["five"]
    },

    {
        question: "Возможно это покажется сложным, но многие сразу определят откуда эта кошечка",
        answers: ["Уличный кот по кличке Боб", "Девять жизней", "Капитан марвел", "Город кошек"],
        correct: 3,
        images: ["marvel"]
    },

    {
        question: "Возможно по актёру на заднем плане ты догадаешься...",
        answers: ["Мумия", "Месть пушистых", "Путешествие к центру земли", "Внутри Льюиса Дэвиса"],
        correct: 1,
        images: ["mummy"]
    },
    {
        question: "Ну тут можно на кошку сильно и не смотреть, чтобы отгадать фильм",
        answers: ["Славные парни", "Джентльмены", "Крёстный отец", "Крёстный отец 2"],
        correct: 3,
        images: ["godfather"]
    },

    {
        question: "А вот тут довольно сложно",
        answers: ["Собачье сердце", "Преступление и наказание", "Война и мир", "Мастер и Маргарита"],
        correct: 4,
        images: ["cat"]
    },

    {
        question: "Возвращаемся к милым котикам...",
        answers: ["Охотники за привидениями", "Чужой", "Кошачий глаз", "Женщина-кошка"],
        correct: 2,
        images: ["alien"]
    },

    {
        question: "И снова лицезреем мы каких-то жутких котиков",
        answers: ["Кошачий глаз", "Кладбище домашних животных", "Лучший друг человека", "Куджо"],
        correct: 2,
        images: ["death"]
    },
];


let score = 0;
let questionIndex = -1;

// Основные элементы
const quizTitle = document.querySelector('.quiz_title');
const questionsList = document.querySelector('.questions');
const submitButton = document.querySelector('#submit');
const images = document.querySelector('.images');
images.style.display = 'flex';

// Очистка страницы
function clearPage() {
    quizTitle.innerHTML = '';
    questionsList.innerHTML = '';
    images.innerHTML = '';
}

// Отображение вопроса
function generateQuestion() {
    const titleTemplate = `<h2 class="title">%title%</h2>`;
    const replacedTitle = titleTemplate.replace('%title%', questions[questionIndex]['question']);
    quizTitle.innerHTML = replacedTitle;

    for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
        const answerTemplate = `
                <li>
                    <label>
                        <input value="%number%" type="radio" class="answer" name="answer">
                        <span>%answer%</span>
                    </label>
                </li>`;

        const replacedAnswer = answerTemplate
            .replace('%answer%', answerText)
            .replace('%number%', index + 1);

        questionsList.innerHTML += replacedAnswer;
    }

    const imageTemplate = `<img src="images/%imgtmp%.png" class="top_image">`;
    for ([Iindex, imageTitle] of questions[questionIndex]['images'].entries()) {
        const replaceImage = imageTemplate.replace("%imgtmp%", imageTitle);
        images.innerHTML += replaceImage
    }

 }

// Проверка выбранного пользователем варианта ответа
function checkAnswer() {

    if (questionIndex === -1) { // Если тест не начался
        questionIndex++;
        clearPage();
        generateQuestion();
        submitButton.innerHTML = 'Ответить'
        images.style.display = 'flex';

    } else { // Тест начался
        console.log('СТАРТ');
        const checkedRadio = questionsList.querySelector('input[type="radio"]:checked');
        const chosenAnswer = parseInt(checkedRadio.value);

        if (!checkedRadio) { // Если ни одна радиометка не активна
            submitButton.blur();
            return;
        }

        if (chosenAnswer === questions[questionIndex]['correct']) { score++; } // Если ответ верный

        if (questionIndex !== questions.length - 1) { // Если вопрос не последний
            questionIndex++
            clearPage();
            generateQuestion();
            return;

        } else { // Если вопрос последний
            clearPage();
            generateResults();
            images.style.display = 'flex';
            }
        }
    }

function generateResults() {
    let img = document.createElement('img');
	img.classList.add('gif');
    img.src = ['images/bye.gif'];
	document.querySelector('.images').appendChild(img);
    
    console.log('Your score is ' + score);

    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <h2 class="result">Твой результат: %result%</h2>
    `;

    let title, message;
    if (score === questions.length) {
        title = "Поздравляю!";
        message = "Ты полностью прошёл тест и правильно ответил на все вопросы. Умничка! Заслужил печеньку :D";
    } else if ((score * 100) / questions.length >= 75) {
        title = "Молодчина!";
        message = "Ты ответил правильно почти на все вопросы! Я тобой горжусь, ты молодец :D";
    } else if ((score * 100) / questions.length >= 50) {
        title = "Неплохо!";
        message = "Ты ответил правильно более чем на половину вопросов! Это неплохой результат, но советую посмотреть почти все представленные фильмы и обратить внимание на кошечек :D";
    } else {
        title = 'Не отчаивайся!';
        message = "Ты ответил правильно менее чем на половину вопросов, но это не повод расстраиваться! Твоя жизнь определяется не результатами тестов, а твоими поступками в настоящий момент, так что у тебя всё ещё впереди! :D";
    }

    let result = `${score} из ${questions.length}`;

    const endingMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result)

    quizTitle.innerHTML = endingMessage;
    submitButton.blur();
    submitButton.innerText = 'Пройти тест ещё раз';
    submitButton.onclick = () => { history.go() };
}