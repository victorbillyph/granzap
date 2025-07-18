import express from 'express'
import path from 'path'
import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode'
import cors from 'cors'


let qrdata = ""



const client = new Client({
    authStrategy: new LocalAuth
})
client.on('loading_screen', (percent, message) => {
    console.log('Carregando WhatsApp:', percent, message)
})
client.on('authenticated', () => {
    console.log('Autenticado com sucesso')
})
client.on('auth_failure', () => {
    console.log('Falha na autenticação')
})

client.on("qr", (qr) => {
    qrdata = qr
    console.log("QR CODE Altualizado!")
})

client.on("ready", () => {
    console.log("Whatsapp Conectado")
})

client.initialize()

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.get("/qrcode", (request: any, response: any) => {
    if (!qrdata) {
        response.status(404).send("QR NÃO GERADO!")
    } else {
    response.setHeader('Content-Type', 'image/png')
    qrcode.toFileStream(response, qrdata)
    }
})

app.post("/enviar", (req: any, res: any) => {
    console.log(req.body)
    const { tempnum, mensagem } = req.body
    console.log("/enviar recebido POST:" + req.body)
    if (tempnum) {
        client.sendMessage(tempnum, mensagem)
    } else {
        console.log("erro, cliente enviou dados de envio errados")
        res.status(400).send("Incorrect data to send, try filling number field")
    }
    
})

app.listen(port, () => {
    console.log(`CONECTADO, ${port}`)
})