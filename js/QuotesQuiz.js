/**
 * Class to handling loading questions for the quotes quiz
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class QuotesQuiz extends Quiz {
    /**
     * Constructor method with properties for movielist, quizbuttons and array of questions
     * 
     * @param {imdbTop100} List of top 100 movies 
     * 
     * @return {undefined}
     */
    constructor(imdbTop100) {
        super();
        this.typeOfQuiz = 'Quotes Quiz';
        this.movies = imdbTop100;
        this.quizTypeBtn = document.querySelector("#qts-btn");
        this.questions = new Array();
    }

    /**
     * Fetches quotes from api and inserts them and the correct option into list of questions
     * 
     * @return {undefined}
     */
    async loadQuestions() {
        while (this.questions.length < this.nrOfQuestions) {
            this.updateProgress(this.questions.length);
            const r = Math.floor(Math.random() * this.movies.length);

            const path = 'title/get-quotes?tconst=' + this.movies[r].imdbid;
            const fetcher = new DataFetcher();
            let questionsData = await fetcher.getQuestions(path);

            // Assume the first quote has at least one line with a text property holding the quote text
            let quote = questionsData.quotes[0].lines.find(line => line.text).text;
            quote = this.truncateString(quote, 300);
            quote = '"' + quote + '"';

            const randomTitle = this.movies[r].title;
            
            let hintData = await fetcher.getMovie(this.movies[r].imdbid);
    
            if (!this.questions.some(elem => elem.title == randomTitle)) {
                const questionObj = new Question(quote, this.movies[r].title, hintData.Director, hintData.Released, hintData.Genre, hintData.Actors);
                questionObj.createOption(this.movies[r].title, true, false, this.movies);
                this.questions.push(questionObj);
            }
        }
    }

    /**
     * Truncates quote if it's too long
     * 
     * @param {str} String of quote 
     * @param {limit} Max length of truncated quote 
     * 
     * @returns {str} Truncated version of quote
     */
    truncateString(str, limit) {
        if (str.length > limit) {
            return str.substring(0, limit) + "...";
          } else {
            return str;
          }
    }

    /**
     * Returns the url for the start image for quotes quiz
     * 
     * @returns {string} String for url for start image
     */
    getImgURL() {
        return './img/quotes-quiz.jpg';
    }

    /**
     * Creates header element for current question
     * 
     * @param {nr} Question number 
     * 
     * @returns {quoteElem} Element for question text
     */
    createQuestion(nr) {
        let quoteElem = document.createElement('h2');
        quoteElem.setAttribute('id', 'quotesQuestion')
        quoteElem.textContent = this.questions[nr].question;

        return quoteElem;
    }
}