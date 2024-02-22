const express = require('express')
const port = 3000

const app = express()

/*
    - Query params => meu.site.com/users?nome=evandro&age=31     // FILTROS
    - Route Params => /users/2      //BUSCAR, DELETAR ou ATUALIZAR ALGO ESPECIFICO
*/


app.get('/users', (request, response) => {
    const name = request.query.name
    const age = request.query.age

    console.log(name, age)

    return response.send('Evandro Tomas da Silva Santos')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}👌`)
})
