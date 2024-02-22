const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

/*
    - Query params => meu.site.com/users?nome=evandro&age=31     // FILTROS
    - Route Params => /users/2      //BUSCAR, DELETAR ou ATUALIZAR ALGO ESPECIFICO
    - Request Body => { 'name':'Evandro', 'age':}

    - GET           => Buscar informação no back-end
    - POST          => Criar informações no back-end
    - PUT / PATCH   => Alterar/Atualizar informação no back-end
    - DELETE        => Deletar informações no back-end   

    - Middleware => INTERCEPTADOR => Tem o poder e parar ou alterar dados da requisição
*/

const users = []

const check_user_id = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }

    request.user_index = index
    request.user_id = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', check_user_id, (request, response) => {
    const { name, age } = request.body
    const index = request.user_index
    const id = request.user_id

    const update_user = { id, name, age }

    users[index] = update_user

    return response.json(update_user)
})


app.delete('/users/:id', check_user_id, (request, response) => {
    const index = request.user_index

    users.splice(index, 1)

    return response.status(204).json()
})









app.listen(port, () => {
    console.log(`Server started on port ${port}👌`)
})