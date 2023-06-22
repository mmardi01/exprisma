const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma  = new PrismaClient();
const app = express();

app.use(express.json());



app.get('/', async (req,res)=> {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
})

app.post('/',async(req,res) => {
    try{
        const newUser = await prisma.user.create({data: req.body})
        res.json(newUser)
    }
    catch(e){
        console.log('error', e);
        throw e;
    }
})


app.put('/:id', async (req,res)=> {
    const id = parseInt(req.params.id);
    const newAge = req.body.age;
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            age: newAge
        }

    })

    res.json(user);
})

app.delete('/:id', async (req,res)=> {
    const id = parseInt(req.params.id);
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    })
    res.json(user)
})

app.listen(3002,()=> console.log('hello from port',3002)); 