const assert = require('assert')
const MongoDb = require('./../src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./../src/db/strategies/mongodb/schemas/heroSchema')
const Context = require('./../src/db/strategies/base/contextStrategy')


const context = new Context(new MongoDB())
const MOCK_HEROI_CADASTRAR = { nome: 'Joao', poder: 'força', }
const MOCK_HEROI_DEFAULT = { nome: `batman-${Date.now()}`, poder: 'Ser RICO', }
const MOCK_HEROI_ATUALIZAR = { nome: `homem-aranha-${Date.now()}`, poder: 'teia', }
let MOCK_HEROI_ID = '';
let context = {}


describe('Mongo db test', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroSchema))

        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })

    it('Mongo connect', async () => {
        const result = await context.isConnect()
        assert.strictEqual(result, 'Conectado')
    })
    it('Cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepStrictEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('Listar', async () => {
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })

        assert.deepStrictEqual({nome, poder}, MOCK_HEROI_DEFAULT)
    })
    it('atualizar', async () => {
        const novoItem = {
            nome: "Mulher-maravilha"
        }
        const result = await context.update(MOCK_HEROI_ID, novoItem)
        assert.deepStrictEqual(result.nModified, 1)
    })
    it('remover por id', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepStrictEqual(result.n, 1)
    })
   /* 

    it('remover por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    })*/
})