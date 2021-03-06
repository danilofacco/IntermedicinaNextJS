import axios from 'axios' 

interface iDados{
    codtipo: number;
    nome: string;
    tel: string;
    email: string;
    pplink: string; 
} 

export async function inicioCadastro(dados: iDados){  
 
return new Promise((resolve, reject) => { 
    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/contratar/inicio.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
  }) 
}
    