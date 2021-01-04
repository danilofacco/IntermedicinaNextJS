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
    MerchantOrderId: string;   
    id: string;    
} 

export async function dadosCadastro(dados: iDados){ 

/* ##DADOS DE EXEMPLO
data = {
codtipo: 7,
nome: "Danilo Gujansky Facco",
tel: "(27)99999-999",
email: "faccodanilo@gmail.com",
pplink: "https://khkfhakfhdaskjhfaksfda.com"
}
*/
return new Promise((resolve, reject) => {

    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}contratar/dados.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
})

}
    