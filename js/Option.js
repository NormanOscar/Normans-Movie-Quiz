/**
 * Class for one option
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class Option {
    /**
     * Constructor method with properties for one option
     * 
     * @param {imdbTop100} List of top 100 movies 
     * 
     * @return {undefined}
     */
    constructor(title, correct, chosen) {
        this.title = title;
        this.correct = correct;
        this.chosen = chosen;
    }
}