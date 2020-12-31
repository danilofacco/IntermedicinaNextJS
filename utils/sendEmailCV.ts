import axios from 'axios' 
export function sendEmailCV(ClientEmail,code,Nome){ 
    const data = {
        cv : (code*3)+9,
        email : ClientEmail,
        nome : Nome
    }


    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}contratar/enviarEmailCV.php`,
        data:JSON.parse(JSON.stringify(data))
      })
}
    