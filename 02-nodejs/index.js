/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir do seu Id
3 Obter o endereço do usuario pelo Id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Joao',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1234234',
            ddd: 79
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'estrada da cabrita',
            numero: 3434
        })
    }, 2000);
}

obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) {
        console.log('deu erro', erro)
        return;
    }
    obterEndereco(usuario.id, function resolverTelefone(erro1, endereco) {
        if (erro1) {
            console.log('deu erro', erro1)
            return;
        }

        obterTelefone(usuario.id, function resolverEndereco(erro2, telefone) {
            if (erro2) {
                console.log('deu erro', erro2)
                return;
            }
    
            console.log(`
              Nome: ${usuario.nome},
              Endereco: ${endereco.rua}, ${endereco.numero},
              Telefone: ${telefone.ddd}, ${telefone.telefone},
            `)
        })
    })

    
})
//const telefone = obterTelefone(usuario.id)

