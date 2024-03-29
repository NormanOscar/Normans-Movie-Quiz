/**
 * Class to execute fetches towards apis and return response
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class DataFetcher {

    /**
     * Constructor method with properties for api key, baseurl for requests and host string for requestheaders
     * 
     * @return {undefined}
     */
    constructor() {
        this.API_key = "your_API_key";
        this.baseURL = "https://imdb8.p.rapidapi.com/";
        this.host = 'imdb8.p.rapidapi.com';
        this.errorMsg = 'Could not fetch question data from API.  Reload the application and try again.';
    }
    
    /**
     * Makes request to api from specified host and url
     * 
     * @returns {response} Response object
     */
    async sendRequest() {
        this.showLoader();
        try {
            const response = await fetch(
                this.baseURL, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': this.API_key,
                        'X-RapidAPI-Host': this.host
                    }
                }
            )
            return await response.json();
            
        } catch (error) {
            this.showErrorMsg();
        } finally {
            this.hideLoader();
        }
        
    }
    
    /**
     * Show gif of loader
     * 
     * @return {undefined}
     */
    showLoader() {
        document.querySelector('#loader-wrapper').style.display = 'block';
        document.querySelector('#start-wrapper').style.display = 'none';
    }
    
    /**
     * Hide gif of loader
     * 
     * @return {undefined}
     */
    hideLoader() {
        document.querySelector('#loader-wrapper').style.display = 'none';
    }
    
    /**
     * Show error message if API request fails
     * 
     * @return {undefined}
     */
    showErrorMsg() {
        const errorArr = this.errorMsg.split('  ');
        document.querySelector('#quiz-window').style.display = 'none';
        document.querySelector('#error-window').style.display = 'block';

        document.querySelector('#error-msg1').textContent = errorArr[0];
        document.querySelector('#error-msg2').textContent = errorArr[1];
    }

    /**
     * Fetches top 100 movies from api
     * 
     * @returns {response} Response object
     */
    async getImdbTop100() {
        this.errorMsg = 'Could not load list of top 100 movies from IMDB.  Reload the application and try again.';
        this.host = 'imdb-top-100-movies.p.rapidapi.com';
        this.baseURL = 'https://imdb-top-100-movies.p.rapidapi.com/';
        return this.sendRequest();
    }

    /**
     * Fetches different data from api specified by the path parameter
     * 
     * @param {path} Path to correct endpoint in api
     * 
     * @returns {response} Response object
     */
    async getQuestions(path) {
        this.baseURL += path;
        return this.sendRequest();
    }
    
    /**
     * Fetches different data from api specified by the movieId parameter
     * 
     * @param {movieId} ID for movie in api
     * 
     * @returns {response} Response object
     */
    async getMovie(movieId) {
        this.errorMsg = 'Could not fetch data for correct answers for questions.  Reload the application and try again.';
        this.host = 'movie-database-alternative.p.rapidapi.com';
        this.baseURL = 'https://movie-database-alternative.p.rapidapi.com/?r=json&i=' + movieId;
        return this.sendRequest();
    }
}
