/**
 * Class for handling events for quiz buttons and creates new instaces of each quizclass when button is pressed
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class Main {

    /**
     * Constructor method with property for list of movies and eventlisteners for quiz buttons
     * 
     * @return {undefined}
     */
    constructor() {
        this.imdbTop100 = new Array();
        this.init();
        this.activeQuiz = null;
        document.querySelector('#title').addEventListener('click', () => {location.reload()});
        document.querySelector("#img-btn").addEventListener("click", e => {this.startQuiz(ImgQuiz);});
        document.querySelector("#qts-btn").addEventListener("click", e => {this.startQuiz(QuotesQuiz);});
        document.querySelector("#tl-btn").addEventListener("click", e => {this.startQuiz(TaglinesQuiz)});
        document.querySelector("#tc-btn").addEventListener("click", e => {this.startQuiz(TopCastQuiz)});
    }
    
    /**
     * Starts two different functions within class
     * 
     * @return {undefined}
     */
    init () {
        document.body.onselectstart = function(){ return false };
        document.body.onmousedown = function(){ return false };
    
        document.querySelector('#background-video').playbackRate = 0.7;
        this.setBtnsEnabled(false);
        this.getMovieIds();
        this.getLatestGames();
    };
    
    /**
     * Gets results from localstorage and prints
     * 
     * @return {undefined}
     */
    getLatestGames() {        
        const latestGamesList = document.querySelector('#latest-games ul');

        if (localStorage.getItem('latestScores')) {
            document.querySelector('#latest-games').style.display = 'block';

            let savedScores = JSON.parse(localStorage.getItem('latestScores')); // get the score
            latestGamesList.innerHTML = '';
            savedScores = savedScores.reverse();

            for (const elem of savedScores) {
                const listElem = document.createElement('li');
                listElem.textContent = elem.typeOfQuiz + ' - Score: ' + elem.score + '/' + elem.nrOfQuestions + ' - Time: ' + elem.time + ' - ' + elem.date;
                latestGamesList.appendChild(listElem);
            }
        }
        else {
            const listElem = document.createElement('li');
            const listElemText = document.createElement('h2');
            listElemText.textContent = 'There are no previous games';
            listElem.appendChild(listElemText);
            latestGamesList.appendChild(listElem);

        }
    }

    /**
     * Creates new instance of the clicked quiz
     * 
     * @param {quizClass} Class of a quiz
     * 
     * @return {undefined}
     */
    startQuiz(quizClass) {
        if (this.activeQuiz) {
            this.activeQuiz.stopClock();
        }
        this.activeQuiz = new quizClass(this.imdbTop100);
    };

    /**
     * Fetches top 100 movies from api and puts into property for class
     * 
     * @return {undefined}
     */
    async getMovieIds () {
        const fetcher = new DataFetcher();
        this.imdbTop100 = await fetcher.getImdbTop100();

        // Activate menubtns
        this.setBtnsEnabled(true);
    };

    /**
     * Changes disabled state for each quiz button
     * 
     * @param {enabled} Boolean, eitehr true or false for disabled state for button 
     * 
     * @return {undefined}
     */
    setBtnsEnabled(enabled) {
        for (const menuBtn of document.querySelectorAll('#typeBtns li')) {
            menuBtn.children[0].disabled = !enabled;
        }
    }
}
window.addEventListener("load", e => {new Main();});