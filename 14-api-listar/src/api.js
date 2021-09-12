'use strict'

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroSchema')
const HeroRoute = require('./routes/heroRoutes')
const app = new Hapi.Server({ port: 5000 })

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    app.route([
       ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])
    await app.start()
    console.log('Server running on %s', app.info.uri);
    return app
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
module.exports = main()