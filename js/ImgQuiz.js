/**
 * Class to handling loading questions for the image quiz
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class ImgQuiz extends Quiz {
    /**
     * Constructor method with properties for movielist, quizbuttons and array of questions
     * 
     * @param {imdbTop100} List of top 100 movies 
     * 
     * @return {undefined}
     */
    constructor(imdbTop100) {
        super();
        this.typeOfQuiz = 'Image Quiz';
        this.movies = imdbTop100;
        this.quizTypeBtn = document.querySelector("#img-btn");
        this.questions = new Array();
    }

    /**
     * Fetches images from api and inserts them and the correct option into list of questions
     * 
     * @return {undefined}
     */
    async loadQuestions() {
        while (this.questions.length < this.nrOfQuestions) {
            const r = Math.floor(Math.random() * this.movies.length);
            let questionImgUrl = '';

            const path = 'title/get-images?tconst=' + this.movies[r].imdbid + '&limit=5';
            const fetcher = new DataFetcher();
            let questionsData = await fetcher.getQuestions(path);
            
            // Check if image is horizontal
            for (const image of questionsData.images) {
                if (image.width > image.height) {
                    questionImgUrl = image.url;
                }
            }
            const randomTitle = this.movies[r].title;            
            
            let hintData = await fetcher.getMovie(this.movies[r].imdbid);
            if (!this.questions.some(elem => elem.title == randomTitle)) {
                const questionObj = new Question(questionImgUrl, this.movies[r].title, hintData.Director, hintData.Released, hintData.Genre, hintData.Actors);
                questionObj.createOption(this.movies[r].title, true, false, this.movies);
                
                this.questions.push(questionObj);
            }
        }
    }

    /**
     * Returns the url for the start image for image quiz
     * 
     * @returns {string} String for url for start image
     */
    getImgURL() {
        return './img/img-quiz.jpg';
    }

    /**
     * Creates img element for current question
     * 
     * @param {nr} Question number 
     * 
     * @returns {questionImg} Element for question image
     */
    createQuestion(nr) {
        const questionImg = document.createElement('img');
        questionImg.setAttribute('id', 'questionImg');
        questionImg.src = this.questions[nr].question;

        return questionImg;
    }
}