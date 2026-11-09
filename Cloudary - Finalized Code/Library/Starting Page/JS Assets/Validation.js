class Validation extends Error {
    constructor(message) {
        super(message);
        this.name = "Validation Error! : ";
    }
}