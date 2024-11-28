import express, { request } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient()
app.use(express.json())
app.use(cors())
app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    });

    res.status(201).json({ message: 'Usuario Criado com sucesso' });
})

app.get('/users', async (req, res) => {
    let users = [];
    if (req.query) {
         users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else { 
        const users = await prisma.user.findMany()
    }
    res.status(201).json(users);
});

app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    });
    res.status(201).json({ message: 'Usuario editado com sucesso' });
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    }
    )
    res.status(201).json({ message: 'Usuario deletado com sucesso' });
})



app.listen(3000);

// Ususario: leonardo
// Senha: JEYkmvzmCbR1VkF4