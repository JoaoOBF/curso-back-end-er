const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    main()
});

const heroiSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    },
});

const Model = mongoose.model('herois', heroiSchema)
const resultCadastrar = new Model({
    nome: 'batman',
    poder: 'Dinheiro'
});

async function main() {
    try {
        resultCadastrar.save(function (err, resultCadastrar) {
            if (err) return console.error(err);
            Model.find(function (err, kittens) {
                if (err) return console.error(err);
                console.log(kittens);
              })
          });


        
    } catch (e) {
        console.error.bind(e, 'connection error:')
    }

}
