
import {ContratarStore} from '../store/contratar'
import axios from 'axios'
export function getBairrosByIBGE(ibge){
    var url = `${process.env.NEXT_PUBLIC_API_URL}contratar/getBairros.php?ibge=${ibge}`
        axios.request({
          method: "GET",
          url: url
        }).then(response => {
            ContratarStore.update(s =>{
                s.bairros = response.data
                s.endereco.codmunicipio = response.data[0].codigomunicipio
            })
        })
}