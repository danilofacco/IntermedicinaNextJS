import axios from 'axios' 

interface iDados{
    codtipo: number;
    nome: string;
    tel: string;
    email: string;
    pplink: string;   
} 

export function inicioCadastro(dados: iDados){ 

/* ##DADOS DE EXEMPLO
data = {
codtipo: 7,
nome: "Danilo Gujansky Facco",
tel: "(27)99999-999",
email: "faccodanilo@gmail.com",
pplink: "https://khkfhakfhdaskjhfaksfda.com"
}
*/

    axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}contratar/cadastro.php`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then(
          response=> {return response}
      )
}
    