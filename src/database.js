import mongoose from "mongoose";

class Database {
    constructor() {
        this.init();
    }

    init(){
        mongoose.connect('mongodb://root:MongoDB2019!@localhost:27017/mydb?authSource=admin');
    }
}

export default new Database();
