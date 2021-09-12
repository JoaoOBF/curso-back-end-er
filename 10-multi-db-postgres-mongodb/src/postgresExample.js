const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const Herois = driver.define('herois', {
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

    await Herois.sync()
   

    const result = await Herois.findAll({raw: true})
    console.log(result)
}

main()