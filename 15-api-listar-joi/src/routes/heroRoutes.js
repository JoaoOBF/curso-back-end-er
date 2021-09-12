const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100).default('')
                    }
                }
            },
            handler: (request, head) => {
                try {
                    const { skip, nome, limit } = request.query
                    let query = {}
                    if (nome) {
                        query.nome = {$regex: `.*${nome}*.`}
                    }
                    return this.db.read(nome ? query: {}, parseInt(skip), parseInt(limit))
                } catch (error) {
                    return error
                }

            }
        }
    }
}

module.exports = HeroRoutes