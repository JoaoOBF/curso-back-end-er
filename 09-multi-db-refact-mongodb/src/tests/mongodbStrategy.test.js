const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())
const MOCK_HEROI_CADASTRAR = { nome: 'Joao', poder: 'força', }
const MOCK_HEROI_DEFAULT = { nome: `batman-${Date.now()}`, poder: 'Ser RICO', }
const MOCK_HEROI_ATUALIZAR = { nome: `homem-aranha-${Date.now()}`, poder: 'teia', }
let MOCK_HEROI_ID = '';
//const nock = require('nock')


describe('Mongo db test', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const id = await context.create(MOCK_HEROI_ATUALIZAR)
        console.log(id)
        MOCK_HEROI_ID = id._id;
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