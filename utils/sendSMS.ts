import axios from 'axios' 
export function sendSMS(tel,code){ 

    const data = {
        cv : (code*3)+9,
        celular : tel
    }


    axios.request({
        method: "POST",
        url: "https://www.intermedicina.com.br/api/enviarSms.php",
        data:JSON.parse(JSON.stringify(data))
      })
}
    