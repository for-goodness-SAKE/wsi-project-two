const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Test Run')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
<<<<<<< HEAD
=======

>>>>>>> 784837308ee68f19c2d16df7f6c6fb57ceb3be9f
