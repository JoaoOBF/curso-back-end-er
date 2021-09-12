const ICrud = require('./interfaces/InterfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
       console.log("PostGres create")
    }

}

module.exports = Postgres;