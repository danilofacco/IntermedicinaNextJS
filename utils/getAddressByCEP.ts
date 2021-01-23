import {ContratarStore} from '../store/contratar'
import axios from 'axios'
export async function getAddressByCEP(cep){ 
    var url = "https://viacep.com.br/ws/"+cep+"/json/"
    axios.request({
      method: "GET",
      url: url, 
    }).then(response => {
        if(!response.data.erro){
        ContratarStore.update(s =>{
            s.endereco.rua = response.data.logradouro
            s.endereco.complemento = response.data.complemento 
            s.endereco.cidade = response.data.localidade 
            s.endereco.estado = response.data.uf
            s.endereco.ibge = response.data.ibge
            s.endereco.cep = response.data.cep 
        })
        

      }
    })
  }