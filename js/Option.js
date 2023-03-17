/**
 * Class for one option
 * 
 * @since Mar 04, 2023
 * @author Oscar Norman <on222gf@student.lnu.se>
 */
class Option {
    /**
     * 
     * @param {title} String with movie title 
     * @param {correct} Boolean for correct answer or not 
     * @param {chosen} Boolean if option is chosen or not
     */
    constructor(title, correct, chosen) {
        this.title = title;
        this.correct = correct;
        this.chosen = chosen;
    }
}