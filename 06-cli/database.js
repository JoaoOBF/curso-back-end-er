/* 
*/

const { writeFile, readFile } = require('fs');
const { promisify } = require('util');
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
];

class Database {
  constructor() {
    this.FILENAME = 'herois.json';
  }

  async obterArquivo() {
    const arquivo = await readFileAsync(this.FILENAME);
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.FILENAME, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterArquivo();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      ...heroi,
      id,
    };
    console.log(heroi)
    return await this.escreverArquivo([...dados, heroiComId]);
  }

  async listar(id) {
    const dados = await this.obterArquivo();
    return dados.filter(item => (id ? item.id == id : true));
  }

  async atualizar(id, atualizacoes) {
    const dados = await this.obterArquivo();
    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error('heroi não existe!');
    }

    const atual = dados[indice];
    dados.splice(indice, 1);

    const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    const dadoAtualizado = Object.assign({}, atual, objAtualizado);

    return await this.escreverArquivo([...dados, dadoAtualizado]);
  }

  async remover(id) {
    if (!id) {
      await this.escreverArquivo([]);
      return true;
    }

    const dados = await this.obterArquivo();

    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error('heroi não existe!');
    }
    const atual = dados[indice];
    dados.splice(indice, 1);
    await this.escreverArquivo(dados);
    return true;
  }
}

module.exports = new Database();
