/**
 * Class to handling loading questions for the taglines quiz
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class TaglinesQuiz extends Quiz {
    /**
     * Constructor method with properties for movielist, quizbuttons and array of questions
     * 
     * @param {imdbTop100} List of top 100 movies 
     * 
     * @return {undefined}
     */
    constructor(imdbTop100) {
        super();
        this.typeOfQuiz = 'Taglines Quiz';
        this.movies = imdbTop100;
        this.quizTypeBtn = document.querySelector("#tl-btn");
        this.questions = new Array();
    }

    /**
     * Fetches taglines from api and inserts them and the correct option into list of questions
     * 
     * @return {undefined}
     */
    async loadQuestions() {
        while (this.questions.length < this.nrOfQuestions) {
            this.updateProgress(this.questions.length);
            const r = Math.floor(Math.random() * this.movies.length);

            const path = 'title/get-taglines?tconst=' + this.movies[r].imdbid;
            const fetcher = new DataFetcher();
            let questionsData = await fetcher.getQuestions(path);
    
            const randomTitle = this.movies[r].title;
            let hintData = await fetcher.getMovie(this.movies[r].imdbid);
    
            if (!this.questions.some(elem => elem.title == randomTitle)) {
                const questionObj = new Question(questionsData.taglines[0], this.movies[r].title, hintData.Director, hintData.Released, hintData.Genre, hintData.Actors);
                questionObj.createOption(this.movies[r].title, true, false, this.movies);
                this.questions.push(questionObj);
            }
        }
    }

    /**
     * Returns the url for the start image for taglines quiz
     * 
     * @returns {string} String for url for start image
     */
    getImgURL() {
        return './img/taglines-quiz.jpg';
    }

    /**
     * Creates header element for current question
     * 
     * @param {nr} Question number 
     * 
     * @returns {quoteElem} Element for question text
     */
    createQuestion(nr) {
        let taglineElem = document.createElement('h2');
        taglineElem.setAttribute('id', 'taglineElem');
        taglineElem.textContent = this.questions[nr].question;

        return taglineElem;
    }
}