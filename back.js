const fs = require('fs')
const http = require('http')
require('dotenv').config()

async function requestHandler(req, res) {
  const url = req.url
  if (url === '/data') {
    (async () => {
      const data = await fetch(`https://jellyfin.erudi.fr/Persons?apikey=${process.env.API_KEY}&personTypes=Director`)
      const directors = await data.json()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ directors: directors.Items, DOMAIN_JELLYFIN: process.env.DOMAIN_JELLYFIN }))
    })()
  }
  else if (url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Internal Server Error')
        return
      }
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}
const server = http.createServer(requestHandler)
server.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`)
})
