import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { readFile, readdir, writeFile } from 'node:fs/promises'

const PORT = process.env.PORT
const app = express()

const logFormat = `
time    :date[web]
method  :method 
type    :req[content-type] 
url     :url 
status  :status 
--------------------------------------------------`

app.set('view engine', 'ejs')

app.use(
    express.json(),
    express.urlencoded({ extended: false }),
    express.static('public'),
    morgan(logFormat),
    // helmet()
)



app.post('/cars/:id', async (req, res) => {
    const path = req.path.split('/')
    const id = path[path.length - 1]
    const body = req.body
    body.id = id

    await writeFile('cars/' + id, JSON.stringify(body, null, 2))

    // res.status(201).location(`/cars/${id}`).end()
    res.send({"id": id})
})

app.get('/cars/:id', async (req, res) => {
    const path = req.path.split('/')
    const id = path[path.length - 1]
    const info = await readFile('cars/'+id, {encoding: 'utf-8'})
    const carInfo = JSON.parse(info)
    const carsI = Object.entries(carInfo)

    res.render('car', { carsI })
})


app.get('/cars', async (req, res) => {

    const files = await readdir('cars/')

    res.render('cars', { files })
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

