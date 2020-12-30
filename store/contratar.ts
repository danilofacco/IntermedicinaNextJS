import { Store } from "pullstate"; 

interface iContratar {
  contratoSelecionado: string;
  etapa:string;
  precoContrato:number;
  contratoSelecionadoTitulo:string;
  cv:number;
  metodo:string;

  fileNameUploadIdentificacao:Array<any>;
  fileNameUploadResidencia:Array<any>;

  nome:string;
  cpf:string;
  datanasc:string;
  tel:string;
  email:string;

  cartao:{
    bandeira:string;
    numero: number;
    nome: string;
    mes: number;
    ano: number;
    cvv: number;
  }
  endereco:{
    rua: string;
    numero:string;
    cidade:string;
    bairro:string;
    complemento:string;
    estado:string;
    cep:string;
    ibge:string;
    codmunicipio:string;
  },

  bairros:any[];

}

export const ContratarStore = new Store<iContratar>({
    contratoSelecionado: "",
    precoContrato:0,
    etapa:"",
    contratoSelecionadoTitulo:"",
    cv:Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
    nome:"",
    cpf:"",
    datanasc:"",
    tel:"",
    email:"faccodanilo@gmail.com",
    cartao:{
      bandeira:"",
      numero: 0,
      nome: "",
      mes: 0,
      ano: 0,
      cvv: 0,
    },
    endereco:{
      rua: '',
      numero:'',
      cidade:'',
      bairro:'',
      estado:'',
      complemento:'',
      cep:'',
      ibge:'',
      codmunicipio:'',
    },
    bairros:[],
    fileNameUploadIdentificacao:[],
    fileNameUploadResidencia:[],
    metodo:"cartao"
});