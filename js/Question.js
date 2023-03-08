/**
 * Class for one question
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class Question {
    /**
     * Constructor method with properties for one question
     * 
     * @param {question} String representing quesiton 
     * @param {title} Title for correct movie 
     * @param {director} String with name of director 
     * @param {released} String with release date 
     * @param {genre} String with movie genres
     * @param {actors} String of top 3 actors
     * 
     * @return {undefined}
     */
    constructor(question, title, director, released, genre, actors) {
        this.question = question;
        this.title = title;
        this.movieInfo = {
            'Director' : director,
            'Release Date' : released,
            'Genre' : genre,
            'Actors' : actors
        };
        this.options = new Array();
    }

    /**
     * Create new option object
     * 
     * @param {title} String with option title 
     * @param {correct} Boolean to show if option is correct answer
     * @param {chosen} Boolean to show if option is chosen 
     * @param {movies} Array with all movies from API 
     * 
     * @return {undefined}
     */
    createOption(title, correct, chosen, movies) {
        const option = new Option(title, correct, chosen);

        this.options.push(option);

        this.addOptions(movies);
    }

    /**
     * Adds three randomized options to question
     * 
     * @param {question} Question object 
     * 
     * @return {undefined}
     */
     addOptions(movies) {
        while (this.options.length < 4) {
            const r = Math.floor(Math.random() * movies.length);
            const randomTitle = movies[r].title;

            // Checks if option doesn't already exists, if so add option to question
            if (!this.options.some(elem => elem.title == randomTitle)) {
                const option = new Option(randomTitle, false, false);
                this.options.push(option);
            }
        }
        this.shuffleOptions();
    }
    
    /**
     * Shuffles options
     * 
     * @return {undefined}
     */
     shuffleOptions() {
        for (let i = 0; i < this.options.length; i++) {
            const options = this.options;
            let index = this.options.length;
            while (index != 0) {
                var rand = Math.floor(Math.random() * index);
                index--;

                [options[index], options[rand]] = [options[rand], options[index]];
            }
        }
    }
}