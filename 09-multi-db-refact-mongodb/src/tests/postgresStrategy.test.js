const assert = require('assert')
const Postgres = require('../db/strategies/postgress')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { nome: 'Joao', poder: 'força', }
const MOCK_HEROI_ATUALIZAR = { nome: 'batman', poder: 'Ser RICO', }
//const nock = require('nock')


describe('Postgres test', function () {
    /*this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('Postgres connect', async () => {
        const result = await context.isConnect()
        assert.strictEqual(result, true)
    })

    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const [item] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: "Mulher-maravilha"
        }
        const [result] = await context.update(item.id, novoItem)
        assert.deepStrictEqual(result, 1)
    })
    it('remover por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    })*/
})