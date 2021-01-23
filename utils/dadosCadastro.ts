import axios from 'axios' 

interface iDados{
    datanasc: string;
    cpf: string;
    estadocivil: string;
    genero: string;
    cep: string;  
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string; 
    ibge: string;
    codmunicipio: string;
    estado: string;
    anexo1: string;
    anexo2: string;  
    id: string;    
} 

export async function dadosCadastro(dados: iDados){ 
 
return new Promise((resolve, reject) => {

    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/contratar/cadastro.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
})

}
    