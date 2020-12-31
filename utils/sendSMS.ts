import axios from 'axios' 
export function sendSMS(tel,code){ 

    const data = {
        cv : (code*3)+9,
        celular : tel
    }


    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}contratar/enviarSMS.php`, 
        data:JSON.parse(JSON.stringify(data))
      })
}
    