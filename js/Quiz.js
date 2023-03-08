/**
 * Superclass that builds and controlls quizes
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class Quiz {
    /**
     * Constructor method with properties for quiz score and amount of questions per quiz
     * 
     * @return {undefined}
     */
    constructor() {
        this.showStart();
        this.score = 0;
        this.nrOfQuestions = null;
        this.clock = new Date();
        this.interval = null;
    }
    
    /**
     * Shows start wrapper element in html and created startbutton for quiz
     * 
     * @return {undefined}
     */
    showStart() {
        document.querySelector('#window-content').style.paddingTop = 10 + 'px';
        for (const button of document.querySelectorAll('#radio-btns input')) {
            button.checked = false;
        }
        document.querySelector('#ten').checked = true;
        document.querySelector('#latest-games').style.display = 'none';
        this.hideWrapper(document.querySelector('#quiz-wrapper'));
        this.hideWrapper(document.querySelector('#score-wrapper'));

        document.querySelector('#start-wrapper').style.display = 'block';
        document.querySelector('#start-img').src = this.getImgURL();

        this.createStartBtn();
    }
    
    /**
     * Create start button and adds event listener to start quiz
     * 
     * @return {undefined}
     */
    createStartBtn() {
        document.querySelector('#start-btn-wrapper').innerHTML = "";
        const startBtn = document.createElement('button');
        startBtn.setAttribute('id', 'start-btn');
        startBtn.textContent = 'Start';

        startBtn.addEventListener('click', e => {
            this.startQuiz();
        });

        document.querySelector('#start-btn-wrapper').appendChild(startBtn);
    }

    /**
     * Hide wrapper by changing display property
     * 
     * @param {elem} Element to hide
     * 
     * @return {undefined}
     */
    hideWrapper(elem) {
        if (elem.style.display == 'block') {
            elem.style.display = 'none';
        }
    }

     /**
     * Starts quiz by loading and showing question and quiz wrapper
     * 
     * @return {undefined}
     */
      async startQuiz() {
        
        for (const radioBtn of document.querySelectorAll('#radio-btns > input')) {
            if (radioBtn.checked) {
                this.nrOfQuestions = radioBtn.value;
            }
        }
        
        await this.loadQuestions();

        this.clock.setMinutes(0);
        this.clock.setSeconds(0);

        this.showClock(this.clock);
        if (!this.interval == null) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => { this.updateClock(this) }, 1000);

        document.querySelector('#start-wrapper').style.display = 'none';
        document.querySelector('#quiz-wrapper').style.display = 'block';

        this.showQuestion(0);
    }

    /**
     * Updates clock every second
     * 
     * @param {self} Referens to current instance of quiz object
     * 
     * @return {undefined}
     */
    updateClock(self) {
        self.clock.setSeconds(self.clock.getSeconds() + 1);
        self.showClock(self.clock);
    }

    /**
     * Show clock element with elapsed time
     * 
     * @param {clock} Timestamp with elapsed time 
     * 
     * @return {undefined}
     */
    showClock(clock) {
        const timeStr = clock.toString().split(" ")[4].substring(3);
        document.querySelector('#clock').innerHTML = timeStr;
    }

    /**
     * Stops clock of elapsed time
     * 
     * @return {undefined}
     */
    stopClock() {
        clearInterval(this.interval);
    }

    /**
     * 
     * 
     * @param {nr} Number of current question 
     * 
     * @returns {undefined}
     */
    showQuestion(nr) {
        const question = this.questions[nr];
        if (!question) {
            this.stopClock();
            this.showResult();
            return;
        }

        document.querySelector('#question-header').textContent = 'Question ' + (nr + 1) + '/' + this.nrOfQuestions;

        const questionWrapper = document.querySelector('#question-wrapper');
        questionWrapper.innerHTML = '';
        const questionElem = this.createQuestion(nr);
        questionWrapper.appendChild(questionElem);

        this.createOptions(nr, question);
        this.createHints(question);
    }

    /**
     * Creates option buttons for current question
     * 
     * @param {nr} Number of current question 
     * @param {question} Current question object
     * 
     * @return {undefined}
     */
     createOptions(nr, question) {
        const optionWrapper = document.querySelector('#option-wrapper');
        optionWrapper.innerHTML = '';
        for (const option of question.options) {
            const optionBtn = document.createElement('button');
            optionBtn.textContent = option.title;
            optionBtn.id = option.correct;
            optionBtn.addEventListener('click', e => {
                this.addToScore(e, nr);
                this.showQuestion(nr + 1);
            });
            optionWrapper.appendChild(optionBtn);
        }
    }

    /**
     * Adds to score if answer is correct
     * 
     * @param {e} Event from eventlistener 
     */
    addToScore(e, nr) {
        for (const option of this.questions[nr].options) {
            if (option.title == e.target.textContent) {
                option.chosen = true;
            }
        }
        if (e.target.id == "true") {
            this.score++;
        }
    }

    /**
     * Creates hint popup with hints for question
     * 
     * @param {question} Current question
     * 
     * @return {undefined}
     */
    createHints(question) {
        document.querySelector('#hint-popup').style.display = 'none';
        document.querySelector('#hint-overlay').style.display = 'none';

        const hintWrapper = document.querySelector('#hint-wrapper');
        hintWrapper.innerHTML = "";

        document.querySelector('#hint-overlay').addEventListener('click', this.changePopdownVisibility);
        document.querySelector('#hint-btn').addEventListener('click', this.changePopdownVisibility);
        document.querySelector('.fa-solid').addEventListener('click', this.changePopdownVisibility);

        for (const [key, value] of Object.entries(question.movieInfo)) {
            const singularHint = this.createSingularHint(key, value);
            hintWrapper.appendChild(singularHint);
        }
    }
    
    /**
     * Creates one hint
     * 
     * @param {key} Key of all properties of question
     * @param {value} Value of all properties of question
     * 
     * @return {Element} Div element for one hint
     */
    createSingularHint(key, value) {
        const singularHintWrapper = document.createElement('div');
        singularHintWrapper.setAttribute('class', 'singular-hint-wrapper');
        const hintKey = document.createElement('h3');
        hintKey.setAttribute('class', 'hint-key');
        hintKey.textContent = key;
        singularHintWrapper.appendChild(hintKey);
        
        const hintValue = document.createElement('p');
        hintValue.setAttribute('class', 'hint-value');
        hintValue.textContent = value;
        singularHintWrapper.appendChild(hintValue);
        
        hintKey.addEventListener('mouseenter', e => { hintValue.style.visibility = 'visible'; });
        hintKey.addEventListener('mouseleave', e => { hintValue.style.visibility = 'hidden'; });
        
        return singularHintWrapper;
    }

    /**
     * Show or hide popup window
     * 
     * @return {undefined}
     */
    changePopdownVisibility() {
        const hintPopup = document.querySelector('#hint-popup');
        const hintOverlay = document.querySelector('#hint-overlay');

        if (hintPopup.style.display == 'none') {
            hintPopup.style.display = 'block';
            hintOverlay.style.display = 'block';
        }
        else {
            hintPopup.style.display = 'none';
            hintOverlay.style.display = 'none';
        }
    }

    /**
     * Shows score srapper and prints score
     * 
     * @return {undefined}
     */
    showResult() {
        document.querySelector('#quiz-wrapper').style.display = 'none';
        document.querySelector('#score-wrapper').style.display = 'block';

        const finalScore = this.score + " / " + this.questions.length;
        document.querySelector('#score-wrapper #score').innerHTML = finalScore;

        const timeStr = this.clock.toString().split(" ")[4].substring(3);
        document.querySelector('#time').innerHTML = timeStr;

        const dateFormat = new Date().toDateString();
        const result = { time: timeStr, score: this.score, nrOfQuestions: this.nrOfQuestions, date: dateFormat, typeOfQuiz: this.typeOfQuiz};
        this.saveScores(result);
        this.showAnswers();
    }

    /**
     * Shows correct answers
     * 
     * @return {undefined}
     */
    showAnswers() {
        const answersWrapper = document.querySelector('#answers-wrapper');
        answersWrapper.innerHTML = "";

        const self = this;
        for (let i = 0; i < this.questions.length; i++) {
            const questionWrapper = document.createElement('div');
            questionWrapper.setAttribute('class', 'answer-question-wrapper');

            const answerHeader = document.createElement('h1');
            answerHeader.textContent = 'Question ' + (i + 1);
            questionWrapper.appendChild(answerHeader);

            const questionHeader = self.createQuestion(i);
            questionWrapper.appendChild(questionHeader);

            let answerOptionsWrapper = self.createAnswerOptions(i);
            questionWrapper.appendChild(answerOptionsWrapper);
            answersWrapper.appendChild(questionWrapper);
        }

    }

    /**
     * Creates all options for one questions
     * 
     * @param {i} Index for question in list of questions
     * 
     * @return {Element} Div with all answer options
     */
    createAnswerOptions(i) {
        const answerOptionsWrapper = document.createElement('div');
        answerOptionsWrapper.setAttribute('id', 'answer-options-wrapper');
        for (const option of this.questions[i].options) {
            const optionElem = document.createElement('p');
            optionElem.setAttribute('class', 'optionElem');
            optionElem.textContent = option.title;

            if (option.correct) {
                optionElem.style.backgroundColor = 'rgb(50, 205, 50)';
            }

            if (option.chosen && !option.correct) {
                optionElem.style.backgroundColor = 'rgb(255, 77, 77)';
            }

            answerOptionsWrapper.appendChild(optionElem);
        }
        return answerOptionsWrapper;
    }

    /**
     * Saves result in localstorage
     * 
     * @param {result} Object with results from quiz 
     * 
     * @return {undefined}
     */
    saveScores(result) {
        const savedScores = JSON.parse(localStorage.getItem('latestScores')) || []; // get the score, or the initial value if empty
        savedScores.push(result); // add the result
        
        if (savedScores.length > 5) {
            savedScores.splice(0,1);
        }

        localStorage.setItem('latestScores', JSON.stringify(savedScores));
    }
}