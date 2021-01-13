import { Store } from "pullstate"; 

interface iContratar {
  idCadastro:number;
  contratoSelecionado: string;
  CodigoTipoContrato:number,
  LinkPoliticaDePrivacidade:string,
  etapa:string;
  precoContrato:number;
  contratoSelecionadoTitulo:string;
  cv:number;
  metodo:string;

  MerchantOrderId:string;
  id:string;


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
  estadocivil:string;
  genero:string;


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
    idCadastro:0,
    contratoSelecionado: "",
    CodigoTipoContrato:0,
    LinkPoliticaDePrivacidade:"",
    precoContrato:0,
    etapa:"",
    contratoSelecionadoTitulo:"",
    cv:0,
    nome:"",
    cpf:"",
    datanasc:"",
    tel:"",
    email:"",
    estadocivil:"",
    genero:"",
    MerchantOrderId:"",
    id:"",
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