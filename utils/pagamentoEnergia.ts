import axios from 'axios' 

interface iDados{
    id: number;
    nome_energia: string;
    cpf_energia: string;
    instalacao_energia: string;
    anexo_energia: string;
    metodo : string ;
    valorcontrato: string
} 

export async function pagamentoEnergia(dados: iDados){  
 
return new Promise((resolve, reject) => { 
    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/contratar/pagamentoEnergia.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
  }) 
}
    