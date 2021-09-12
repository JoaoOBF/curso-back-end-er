const ICrud = require('./interfaces/InterfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
       console.log("mongo create")
    }

}
module.exports = MongoDB;