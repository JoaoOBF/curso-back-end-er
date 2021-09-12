const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                try {
                    const { skip, nome, limit } = request.query
                    let query = {}
                    if (nome) {
                        query.nome = nome
                    }
                    if (isNaN(skip) || isNaN(limit)) {
                        throw Error(' tipo incorreto')
                    }
                    console.log()
                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    return error
                }

            }
        }
    }
}

module.exports = HeroRoutes