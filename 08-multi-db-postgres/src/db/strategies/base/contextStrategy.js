const ICrud = require('../interfaces/InterfaceCrud')

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(id, item) {
        return this._database.update(id, item)
    }
    delete(id) {
        return this._database.delete(id)
    }
    isConnect() {
        return this._database.isConnect()
    }

     connect() {
       this._database.connect()
    }
}

module.exports = ContextStrategy