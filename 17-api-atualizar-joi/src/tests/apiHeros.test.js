const assert = require('assert')
const api = require('../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: "heroi faake",
    poder: "poder fake"
}

const MOCK_HEROI_INICIAL = {
    nome: "fLASH",
    poder: "a velocidade"
}
const MOCK_ID = '';

describe.only('api test', function () {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id;
    })

    it('listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        const status = result.statusCode
        assert.deepStrictEqual(status, 200)
        assert.ok(Array.isArray(dados))
    })
    it('lista herois deve ter 10 registros', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const status = result.statusCode
        assert.deepStrictEqual(status, 200)
        assert.ok(dados.length === 10)
    })
    it('lista herois deve ter 10 registros', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const status = result.statusCode
        assert.deepStrictEqual(status, 200)
        assert.ok(dados.length === 10)
    })
    it('cadastrar herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_CADASTRAR
        })

        const status = result.statusCode
        assert.deepStrictEqual(status, 200)
        assert.ok(dados.length === 10)
    })
    it('atualizar herois', async () => {
        const _id = MOCK_ID
        const expect = {
            poder: 'Super hyper mega velocidade'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `{/herois/${_id}`,
            payload: JSON.stringify(expect)
        })

        const status = result.statusCode
        assert.deepStrictEqual(status, 200)
    })
})