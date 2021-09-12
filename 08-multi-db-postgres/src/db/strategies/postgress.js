const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null;
        this.connect()
    }

    async isConnect() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('erro', error)
            return false;
        }
    }

    async create(item) {
        const {
            dataValue
        } = await this._herois.create(item)
        return dataValue
    }

    async read(item = {}) {
        const result = await this._herois.findAll({ where: item, raw: true })
        return result
    }

    async update(id, item) {
        const result = await this._herois.update(item, { where: { id: id } })
        return result
    }

    async delete(id) {
        const query = id ? { id } : {}
        const result = await this._herois.destroy({where: query})
        return result
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true,

            },
            nome: {
                type: Sequelize.STRING,
                required: true,
            },
            poder: {
                type: Sequelize.STRING,
                required: true,
            },
        }, {
            tableName: 'tb_herois',
            freezeTableName: false,
            timestamps: false
        })

        await this._herois.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'jobf',
            '1717',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: 0
            }
        )
        await this.defineModel()
    }

}

module.exports = Postgres;