/**
 * Class to handling loading questions for the top cast quiz
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class TopCastQuiz extends Quiz {

    /**
     * Constructor method with properties for movielist, quizbuttons and array of questions
     * 
     * @param {imdbTop100} List of top 100 movies 
     * 
     * @return {undefined}
     */
    constructor(imdbTop100) {
        super();
        this.typeOfQuiz = 'Top Cast Quiz';
        this.movies = imdbTop100;
        this.quizTypeBtn = document.querySelector("#tc-btn");
        this.questions = new Array();
    }

    /**
     * Fetches actors and general information from api and inserts them and the correct option into list of questions
     * 
     * @return {undefined}
     */
    async loadQuestions() {
        while (this.questions.length < this.nrOfQuestions) {
            const r = Math.floor(Math.random() * this.movies.length);

            const fetcher = new DataFetcher();
            let questionsData = await fetcher.getMovie(this.movies[r].imdbid);

            const actorsArr = questionsData.Actors.split(',');
            const randomTitle = this.movies[r].title;
                
            if (!this.questions.some(elem => elem.Title == randomTitle)) {
                const questionObj = new Question(actorsArr, this.movies[r].title, questionsData.Director, questionsData.Released, questionsData.Genre, questionsData.Actors);
                questionObj.createOption(this.movies[r].title, true, false, this.movies);
                this.questions.push(questionObj);
            }
        }
    }

    /**
     * Returns the url for the start image for top cast quiz
     * 
     * @returns {string} String for url for start image
     */
    getImgURL() {
        return './img/topCast-quiz.jpg';
    }

    /**
     * Creates list of actors for current question
     * 
     * @param {nr} Question number 
     * 
     * @returns {quoteElem} Element list of actors
     */
    createQuestion(nr) {
        let actorsList = document.createElement('ul');
        actorsList.setAttribute('id', 'actorsList');
        
        for (let i = 0; i < this.questions[nr].question.length; i++) {
            let listItem = document.createElement('li');
            let textNode = document.createElement('h2');
            textNode.textContent = this.questions[nr].question[i];
            listItem.appendChild(textNode);
            actorsList.appendChild(listItem);
        }

        return actorsList;
    }
}