const ICrud = require('./interfaces/InterfaceCrud')
const mongoose = require('mongoose');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null;
    }

    async isConnect() {
        try {
            const state = STATUS[this._driver.readyState]
            if (state === 'Conectado') return state
            if (state !== 'Conectando') return state
            await new Promise(resolve => setTimeout(resolve, 1000))
            return STATUS[this._driver.readyState]
        } catch (error) {
            console.log('erro', error)
            return 'Desconectado';
        }
    }

    async create(item) {
        return this._herois.create(item);
    }

    async read(item = {}, skip = 0, limit = 10) {
        const result = await this._herois.find(item).skip(skip).limit(limit)
        return result
    }

    async update(id, item) {
        const result = await this._herois.updateOne({ _id: id }, { $set:  item })
        return result
    }

    async delete(id) {
        const result = await this._herois.deleteOne({ _id: id })
        return result
    }

    async defineModel() {

        const shecma = new mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertAt: {
                type: Date,
                default: new Date()
            },
        });

        this._herois = mongoose.model('herois', shecma)
    }

    async connect() {
        mongoose.connect('mongodb://admin:admin@localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
        });
        this.defineModel()
        this._driver = db;
    }

}
module.exports = MongoDB;