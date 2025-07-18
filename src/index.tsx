import { useEffect, useState } from 'react'
export function App() {
    const [numero, setNumero] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [resultado, setResultado] = useState('')

    const [qrUrl, setQrUrl] = useState('')

    useEffect(() => {
    // Atualiza a URL do QR a cada 5 segundos para evitar cache
        const interval = setInterval(() => {
            setQrUrl(`http://localhost:3000/qrcode?t=${Date.now()}`)
        }, 5000)
        setQrUrl(`http://localhost:3000/qrcode?t=${Date.now()}`)

    return () => clearInterval(interval)
    }, [])


    const enviarMensagem = async () => {
        let tempnum = numero + "@c.us"
        const res = await fetch("http://localhost:3000/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tempnum, mensagem })
        })
        const data = (await res).json()
        setResultado((await data).message)
    }
    return (
        <div>
            <h1>Granzap - Whatsapp Manager</h1>
            <input type="text" placeholder="Mensagem" value={mensagem} onChange={e => setMensagem(e.target.value)}></input>
            <input type="number" placeholder="Número" value={numero} onChange={e => setNumero(e.target.value)}></input>
            <button onClick={enviarMensagem}>Enviar</button>

            { qrUrl ? (
                <img src={qrUrl} alt="QR CODE WHATSAPP" width={300} height={300}></img>
            ) : (
                <h1>CARREGANDO QRCODE...</h1>
            )}
        </div>
    )
        
    
}