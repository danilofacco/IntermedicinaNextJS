import axios from 'axios'  

interface iDados{
    MerchantOrderID: string;
    Name: string;
    Amount: string;
    CardNumber: string;
    Holder: string;
    ExpirationDate : string;
    SecurityCode: string;
    Brand:string
} 

export async function pagamentoCartao(dados: iDados){  
 
return new Promise((resolve, reject) => { 
    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/contratar/pagamentoCartao.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
  }) 
}
    