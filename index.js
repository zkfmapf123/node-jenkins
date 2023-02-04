import express from 'express'

const PORT = process.env.PORT
const app = express()
app.get('/', (_, res) => res.send(`---${process.env.NODE_ENV} Hello world---`))
app.listen(PORT, () => {
  console.log(`localhost:${PORT} is Connect`)
})
