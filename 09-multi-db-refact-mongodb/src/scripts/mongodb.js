docker ps
docker exec -it a6bfc8bc7edd mongo -u admin -p admin --authenticationDatabase herois

docker exec -it 0174e63c7eed bash
mongo 192.168.99.100:27017 -u admin -p admin --authenticationDatabase herois

db.admin.insert({
    nome:'Flash',poder: 'Velocidade',dataNascimento:'1997-03-01'
})

for(let i = 0; i< 1000; i++){
    db.admin.insert({
        nome:`heroi-${i}`,poder: `poder-${i}`,dataNascimento:'1997-03-01'
    })
}