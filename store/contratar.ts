import { Store } from "pullstate"; 

interface iContratar {
  contratoSelecionado: string;
  CodigoTipoContrato:number,
  LinkPoliticaDePrivacidade:string,
  etapa:string;
  precoContrato:number;
  contratoSelecionadoTitulo:string;
  cv:number;
  metodo:string;

 meses:Array<any>;
 anos:Array<any>;
  
  fileNameUploadIdentificacao:Array<any>;
  fileNameUploadResidencia:Array<any>;
  fileNameUploadTalao:Array<any>;

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
    CodigoTipoContrato:0,
    LinkPoliticaDePrivacidade:"",
    precoContrato:0,
    etapa:"",
    contratoSelecionadoTitulo:"",
    cv:Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
    nome:"",
    cpf:"",
    datanasc:"",
    tel:"",
    email:"",
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
    fileNameUploadTalao:[],
    metodo:"cartao",

    meses:["01","02","03","04","05","06","06","07","08","09","10","11","12"],
    anos:[]
});