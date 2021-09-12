class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

class ICrud {

    create(item) {
        throw new NotImplementedException()
    }
    update(id, item) {
        throw new NotImplementedException()
    }
    read(item) {
        throw new NotImplementedException()
    }
    delete(id) {
        throw new NotImplementedException()
    }
}

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
       console.log("mongo create")
    }

}

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
       console.log("PostGres create")
    }

}

class ContextStrategy extends ICrud {
    constructor(strategy) {
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
}