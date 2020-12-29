import axios from 'axios' 
export function sendEmailCV(ClientEmail,code,Nome){ 
    const data = {
        cv : (code*3)+9,
        email : ClientEmail,
        nome : Nome
    }


    axios.request({
        method: "POST",
        url: "https://www.intermedicina.com.br/api/enviarEmailCV.php",
        data:JSON.parse(JSON.stringify(data))
      })
}
    