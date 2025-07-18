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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💬 Granzap - Whatsapp Manager</h1>

      <input
        type="text"
        placeholder="Mensagem"
        value={mensagem}
        onChange={e => setMensagem(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Número (ex: 5599999999999)"
        value={numero}
        onChange={e => setNumero(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={enviarMensagem}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Enviar Mensagem
      </button>

      <div className="mt-6">
        {qrUrl ? (
              <img
                src={qrUrl}
                alt="QR CODE WHATSAPP"
                width={300}
                height={300}
                className="mx-auto border rounded-xl"
              />
            ) : (
              <p className="text-gray-500 text-lg">⌛ Carregando QR Code...</p>
            )}
          </div>
        </div>
      </div>
    );

        
    
}
