const assert = require('assert')
const api = require('../api')
let app = {}

describe.only('api test', function () {
    this.beforeAll(async () => {
        app = await api;
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
})