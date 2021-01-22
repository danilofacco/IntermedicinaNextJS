import React, { useCallback, ChangeEvent, useEffect, useRef ,useState} from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input'
import InputMask from  '../../components/InputMask'
import File from '../../components/FileInput' 

import {ContratarStore} from '../../store/contratar' 

import getValidationErrors from '../../utils/getValidationErrors'
import { FormHandles } from '@unform/core' 
import { useRouter } from 'next/router'
import Select from '../../components/Select'

import {getAddressByCEP} from '../../utils/getAddressByCEP'
import {getBairrosByIBGE} from '../../utils/getBairrosByIBGE'
import {checkAge} from '../../utils/checkAge'
import {CPFValidation} from '../../utils/CPFValidation'
import {sendSMS} from '../../utils/sendSMS'
import {sendEmailCV} from '../../utils/sendEmailCV'
import { removeFile } from '../../utils/removeFile'
import { SpinnerCircularFixed } from 'spinners-react';
import InvisibleCheck from '../../components/InvisibleCheck'; 
import axios from 'axios';

import { uploadFilePost } from '../../utils/uploadFilePost';
import { CarregarDados, SalvarDados } from '../../utils/LocalStorage';
import { dadosCadastro } from '../../utils/dadosCadastro';

interface SignInFormData {
    cv: number;
    email: string;
    nome: string;
    celular: string;
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
    anexoIdentificacao: string;
    anexoResidencia: string;    
    id: string;   
  } 


  const  Cadastro: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const uploadIdentificacaoRef = useRef<FormHandles>(null);
    const uploadResidenciaRef = useRef<FormHandles>(null);
    const router = useRouter()
    

    const [refresh,setRefresh] = useState(Math.random())
    const ContratarStoreRead = ContratarStore.useState(s => s)
    const [sendMessage, setSendMessage] = useState("")
    const [sendMessageStrong,setSendMessageStrong] = useState("")
    const [loadingUploadIdentificacao,setLoadingUploadIdentificacao] = useState(false)
    const [loadingUploadResidencia,setLoadingUploadResidencia] = useState(false)
    const [cvRandom, setCvRandom] = useState(Math.floor(Math.random() * (99999 - 10000 + 1) + 10000))
    const [checkIcon, setCheckIcon] = useState("/assets/check.svg")
    const [checkedPoliticaPrivacidade, setCheckedPoliticaPrivacidade] = useState(false)
    const [textoPoliticaDePrivacidade, setTextoPoliticaDePrivacidade] = useState("Carregando ...")
  
    useEffect(()=>{
      ContratarStore.update(s=> CarregarDados())  
      
      setRefresh(Math.random())
    },[])
  
    useEffect(()=>{ 
      SalvarDados(ContratarStoreRead)  
    },[ContratarStoreRead])
  

    useEffect(()=>{ 
      formRef.current.setFieldValue("nome", ContratarStoreRead.nome) 
      formRef.current.setFieldValue("email", ContratarStoreRead.email) 
      formRef.current.setFieldValue("celular", ContratarStoreRead.tel)
      formRef.current.setFieldValue("cpf", ContratarStoreRead.cpf)
      formRef.current.setFieldValue("datanasc", ContratarStoreRead.datanasc)
      formRef.current.setFieldValue("estadocivil", ContratarStoreRead.estadocivil)
      formRef.current.setFieldValue("genero", ContratarStoreRead.genero)
      formRef.current.setFieldValue("cep", ContratarStoreRead.endereco.cep)
      formRef.current.setFieldValue("rua", ContratarStoreRead.endereco.rua)
      formRef.current.setFieldValue("numero", ContratarStoreRead.endereco.numero)
      formRef.current.setFieldValue("complemento", ContratarStoreRead.endereco.complemento)
      formRef.current.setFieldValue("bairro", ContratarStoreRead.endereco.bairro)
      formRef.current.setFieldValue("cidade", ContratarStoreRead.endereco.cidade)
      formRef.current.setFieldValue("ibge", ContratarStoreRead.endereco.ibge)
      formRef.current.setFieldValue("codmunicipio", ContratarStoreRead.endereco.codmunicipio)
      formRef.current.setFieldValue("estado", ContratarStoreRead.endereco.estado)
      formRef.current.setFieldValue("anexoIdentificacao",  ContratarStoreRead.fileNameUploadIdentificacao && String(ContratarStoreRead.fileNameUploadIdentificacao))
      formRef.current.setFieldValue("anexoResidencia", ContratarStoreRead.fileNameUploadResidencia && String(ContratarStoreRead.fileNameUploadResidencia))

         axios.get(ContratarStoreRead.LinkPoliticaDePrivacidade).then( (response) => {
          if(response.data && response.data.content){ 
           setTextoPoliticaDePrivacidade(response.data.content.rendered)
          }
       })   
      },[refresh])


    useEffect(()=>{ 
      if(checkedPoliticaPrivacidade){
       setCheckIcon("/assets/check_icon_fill.svg")
      } 
      else{
        setCheckIcon("/assets/check_icon_empty.svg") 
      }   
    } ,[checkedPoliticaPrivacidade]) 
  

    function handleClickTermosDeUso(){
      setCheckedPoliticaPrivacidade(!checkedPoliticaPrivacidade)
      !checkedPoliticaPrivacidade ? formRef.current.setFieldValue("politicaprivacidade","ok") : formRef.current.setFieldValue("politicaprivacidade","") 
    }

    function HandleOnSendSMS(){
      sendSMS(ContratarStoreRead.tel,cvRandom)
      setSendMessage("Código enviado por sms para:")
      setSendMessageStrong(ContratarStoreRead.tel)
   }
    function HandleOnSendEmail(){
      sendEmailCV(ContratarStoreRead.email,cvRandom,ContratarStoreRead.nome)
      setSendMessage("Código enviado por e-mail para:")
      setSendMessageStrong(ContratarStoreRead.email)
   } 
    function reduceName(varString){
      if (varString.length > 26){
        return `${varString.substr(0,22)}...`
      }
      else{
        return `${varString}` 
      }
    }
     
    function handleClickUpload(type){
      var uploadButton = null
      switch (type) {
        case "identificacao":   uploadButton = uploadIdentificacaoRef.current.getFieldRef("file"); break;
        case "residencia":   uploadButton = uploadResidenciaRef.current.getFieldRef("file"); break;
        //case "energia":   uploadButton = uploadEnergiaRef.current.getFieldRef("file"); break; 
      } 
      uploadButton.click()
    } 


    function setLoadingUpload(value,type){ 
      switch (type) {
        case "identificacao":   setLoadingUploadIdentificacao(value); break;
        case "residencia":   setLoadingUploadResidencia(value); break;
        //case "energia":   setLoadingUploadEnergia(value); break; 
      }  
    } 

    function removeFileStore(filename,type){
      var newArr=[]
      switch (type) {
        case "identificacao":   
        ContratarStoreRead.fileNameUploadIdentificacao.map(s => { s != filename &&  newArr.push(s) })
        ContratarStore.update(s => { s.fileNameUploadIdentificacao = newArr })
        formRef.current.setFieldValue("anexoIdentificacao",String(newArr))
        
        break;
        case "residencia":   
        ContratarStoreRead.fileNameUploadResidencia.map(s => { s != filename &&  newArr.push(s) })
        ContratarStore.update(s => { s.fileNameUploadResidencia = newArr })
        formRef.current.setFieldValue("anexoResidencia",String(newArr))
        break;

        case "energia":   
        //ContratarStoreRead.fileNameUploadEnergia.map(s => { s != filename &&  newArr.push(s) })
        //ContratarStore.update(s => { s.fileNameUploadEnergia = newArr })
        //formRef.current.setFieldValue("anexoEnergia",String(newArr))

        break; 
      } 
      removeFile(filename) 
    }
 
 

    const handleUploadIdentificacao = useCallback((e: ChangeEvent<HTMLInputElement>) => { 
      const files = uploadIdentificacaoRef.current.getFieldRef("file").files
      if(files.length > 0 ){
        setLoadingUpload(true,'identificacao') //*
        //@ts-ignore
        var filename = e.file  
        var formData = new FormData()
        formData.append("file", files[0])
        uploadFilePost(formData,filename).then(result =>{
          setLoadingUpload(false,'identificacao')
          var newArr=[]
            ContratarStoreRead.fileNameUploadIdentificacao.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result) 
            }
            ContratarStore.update(s => {
              s.fileNameUploadIdentificacao = newArr
            })
            formRef.current.setFieldValue("anexoIdentificacao",String(newArr))
        }
        )
      } 
 

    }, [ContratarStoreRead.fileNameUploadIdentificacao]);
 

 
    const handleUploadResidencia = useCallback((e: ChangeEvent<HTMLInputElement>) => { 
      const files = uploadResidenciaRef.current.getFieldRef("file").files
      if(files.length > 0 ){
        setLoadingUpload(true,'residencia') 
        //@ts-ignore
        var filename = e.file  
        var formData = new FormData()
        formData.append("file", files[0])
        uploadFilePost(formData,filename).then(result =>{
          setLoadingUpload(false,'residencia')
          var newArr=[]
            ContratarStoreRead.fileNameUploadResidencia.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result) 
            }
            ContratarStore.update(s => {
              s.fileNameUploadResidencia = newArr
            })
            formRef.current.setFieldValue("anexoResidencia",String(newArr))
        })
      }
      setRefresh(Math.random())
    }, [ContratarStoreRead.fileNameUploadResidencia]);
   

    useEffect(()=>{ 
      formRef.current.setFieldValue('cidade', ContratarStoreRead.endereco.cidade);
      formRef.current.setFieldValue('rua', ContratarStoreRead.endereco.rua);
      formRef.current.setFieldValue('estado', ContratarStoreRead.endereco.estado);
      formRef.current.setFieldValue('ibge', ContratarStoreRead.endereco.ibge);
      formRef.current.setFieldValue('codmunicipio', ContratarStoreRead.endereco.codmunicipio);
      
      if(ContratarStoreRead.endereco.ibge != undefined && ContratarStoreRead.endereco.ibge.length > 4){
        getBairrosByIBGE(ContratarStoreRead.endereco.ibge)
        } 
    },[ContratarStoreRead.endereco.cep])

    
    async function OnChangeCEP() {
      var regex = new RegExp('_', 'g');
      var cep = formRef.current.getFieldValue('cep')
      cep = cep.replace(regex, '');
      if(cep.length == 9 ){
        getAddressByCEP(cep)
      }
    }

    const handleSubmit = useCallback(
      async (data: SignInFormData) => {
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string()
              .required('*É necessário preechimento')
              .email('*Digite  um e-mail válido'), 
             nome: Yup.string().required('*É necessário preechimento'),
            celular: Yup.string().required('*É necessário preechimento'), 
            datanasc: Yup.string().test("len", "Data de Nascimento Inválida.", (val) => {
              //return true
              return checkAge(val);
            }).required('*É necessário preechimento'),
            cpf: Yup.string().test("len", "CPF Inválido.", (val) => {
              return CPFValidation(val);
            })
              .required('*É necessário preechimento'),
            estadocivil: Yup.string().required('*É necessário preechimento'),
            genero: Yup.string().required('*É necessário preechimento'),
            cep: Yup.string().required('*É necessário preechimento'),
            rua: Yup.string().required('*É necessário preechimento'),
            numero: Yup.string().required('*É necessário preechimento'),
            bairro: Yup.string().required('*É necessário preechimento'),
            cidade: Yup.string().required('*É necessário preechimento'), 
            estado: Yup.string().required('*É necessário preechimento'), 
            cv: Yup.string().test("len", "Código de verificação inválido.", (val) => {
              console.log("val:"+ cvRandom)
              return Number(val) == cvRandom;
            }).required('*É necessário preechimento'), 
            politicaprivacidade: Yup.string().required('*É necessário aceitar os termos de uso e política de privacidade'), 
            anexoResidencia: Yup.string().required("*É necessário anexar ao menos um arquivo."),
            anexoIdentificacao: Yup.string().required("*É necessário anexar ao menos um arquivo.")  
         });


         ContratarStore.update(s=>  
          { s.datanasc = data.datanasc
            s.cpf = data.cpf
            s.email = data.email
            s.estadocivil = data.estadocivil
            s.genero = data.genero
            s.endereco.cep = data.cep
            s.endereco.rua = data.rua
            s.endereco.numero = data.numero
            s.endereco.complemento = data.complemento
            s.endereco.bairro = data.bairro
            s.endereco.cidade = data.cidade  
            s.endereco.estado = data.estado
            s.cv = data.cv
          });  

          await schema.validate(data, {
            abortEarly: false,
          }); 
        
           
          var dados = {
            datanasc: data.datanasc,
            cpf: data.cpf,
            estadocivil: data.estadocivil,
            genero: data.genero,
            cep: data.cep,  
            rua: data.rua,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade, 
            ibge: data.ibge,
            codmunicipio: ContratarStoreRead.endereco.codmunicipio,
            estado: data.estado,
            anexo1: data.anexoIdentificacao,
            anexo2: data.anexoResidencia,  
            id: String(ContratarStoreRead.idCadastro)
          } 
         
          dadosCadastro(dados).then(result => { 
            router.push('/contratar/pagamento');
          }) 

        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            return;
          }
        }
      },
      [ ],
    ); 
    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/inicio"/> 
    <HeaderContratar page={2}/>
    <div className="p-4"> 
    <div className="flex flex-col w-full bg-cinza bg-opacity-5 border border-cinza border-opacity-10 rounded-md">
      <div className="flex flex-col w-full p-4"> 
          <div className="flex flex-col w-full">  
            <span className="text-xs montserrat-medium text-cinza pb-1">ASSINATURA SELECIONADA:</span>
            <span className="text-sm montserrat-regular text-azul pb-2">Intermedicina <strong className="montserrat-bold">{ContratarStoreRead.contratoSelecionadoTitulo}</strong> <Image src="/assets/checkverde.svg" width={15} height={15}/> </span> 
          </div>
        </div> 

        <Form className="p-2 -mt-5 w-full flex flex-col" autoComplete="off" aria-autocomplete="none" ref={formRef} onSubmit={handleSubmit}>  
      
        <div className="w-full h-0.5 bg-gray-200 border-white"></div>

        <span className="text-xs mt-3 montserrat-bold text-center w-full justify-center text-cinza"><strong>DADOS PESSOAIS</strong></span>

         <Input name="nome" legend="NOME COMPLETO" small disabled />
          
          <div className="flex  ">
            <div className="w-1/3 mr-1">
            <Input  name="celular"  inputMode="numeric" legend="CELULAR" small disabled  />
            </div>
            <div className="w-2/3 ml-1">
            <Input   name="email"  legend="EMAIL" small disabled   /> 
            </div>
          </div> 

           <div className="flex "> 
           <div className="w-full mr-1">
              <InputMask mask="99/99/9999" inputMode="numeric"  maskplaceholder="_"  name="datanasc" legend="DATA DE NASCIMENTO" small />
          </div>  
          <div className="w-full ml-1">
              <InputMask mask="999.999.999-99"  inputMode="numeric" maskplaceholder="_"  name="cpf"  legend="CPF" small />
              </div>
            </div>
              
            <div className="flex  ">   
            <div className="w-full  mr-1">
                  <Select name="estadocivil" defaultValue="" legend="ESTADO CIVIL" small>
                  <option value="" disabled>Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Separado">Separado</option>
                  <option value="Viúvo">Viúvo</option>
                  </Select>
                  </div>
                  <div className="w-full ml-1">
                  <Select name="genero" defaultValue="" legend="GÊNERO" small> 
                  <option value="" disabled>Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  </Select>
                  </div>

            </div> 
                <div className="text-xs text-cinza montserrat-regular my-2">
                  <span>Cópia do seu <strong>documento pessoal</strong><br/>
                  pode ser RG (frete e verso) ou CNH.</span>
               </div> 
               
 
              {/*<File name="uploadIdentificacao" onInput={handleUploadIdentificacao}/> */}

              <a className="bg-laranja rounded-md text-xxs  w-2/4 text-white montserrat-bold px-1.5 py-2 flex items-center text-center" onClick={()=> handleClickUpload("identificacao")}>
                { !loadingUploadIdentificacao
              ? <>
                  <Image className="pr-1 w-3 h-3"  src="/assets/file.svg" width={12} height={12}/>
                  <span>ANEXAR COMPROVANTE</span>
                  </>
                  : 
                <>
                  <SpinnerCircularFixed className="pr-1" size={12} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                  <span>ENVIANDO ARQUIVO...</span>
                </>
                }
                </a> 

                { ContratarStoreRead.fileNameUploadIdentificacao && ContratarStoreRead.fileNameUploadIdentificacao.map( filename => 
                  <a  className="bg-cinza bg-opacity-20 rounded-md flex justify-between w-full montserrat-regular text-cinza items-center p-2 mt-2 text-xs" key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileStore(filename,'identificacao')}} src="/assets/remove.svg" width={12} height={12}/></a> 
                )} 
               

              <InvisibleCheck  name="anexoIdentificacao"></InvisibleCheck> 

              
              <div className="w-full mt-2 h-0.5 bg-gray-200 border-white"></div>
 
                
               <span className="text-xs mt-3 montserrat-bold text-center w-full justify-center text-cinza"><strong>ENDEREÇO</strong></span>
               <InputMask inputMode="numeric"  mask="99999-999" maskplaceholder="_" name="cep" onChange={OnChangeCEP} legend="CEP" small />
               <InvisibleCheck  name="ibge"></InvisibleCheck> 
               <InvisibleCheck  name="codmunicipio"></InvisibleCheck> 
               <Input name="rua"  legend="RUA" small   />
 
                <div className="flex ">
                  
                <div className="w-full mr-1">
                <Input name="numero"  legend="NÚMERO" small   />
                </div>
                <div className="w-full ml-1 mr-1">
                <Input name="complemento"  legend="COMPLEMENTO" small   /> 
                </div>
                <div className="w-full ml-1">
                  <Select name="bairro"  legend="BAIRRO" small>
                  <option key="selecione" value="0">Selecione</option>
                {ContratarStoreRead.bairros.map(bairro=>
                   <option key={bairro.codigo} value={bairro.codigo}>{bairro.nome}</option> 
                  )}
                  <option key="outro" value="outro">Outro</option>  
                  </Select>
                  </div> 
                </div> 
                 
                <div className="flex"> 
                
                <div className="w-full mr-1">
                  <Input name="cidade"  legend="CIDADE" small /> 
                  </div>
                  <div className="w-full ml-1">
                  <Input name="estado"  legend="ESTADO" small   /> 
                  </div>
                </div>

 
              <div className="text-xs text-cinza montserrat-regular my-2">
                  Cópia do seu <strong>comprovante de residência</strong>,<br/>
                  luz, água, telefone, banco ou similares.
               </div>   

              <a className="bg-laranja rounded-md text-xxs  w-2/4 text-white montserrat-bold px-1.5 py-2 flex items-center text-center" onClick={()=> handleClickUpload("residencia")}>
                { !loadingUploadResidencia
              ? <>
                  <Image className="pr-1 w-3 h-3"  src="/assets/file.svg" width={12} height={12}/>
                  <span>ANEXAR COMPROVANTE</span>
                  </>
                  : 
                <>
                  <SpinnerCircularFixed className="pr-1" size={12} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                  <span>ENVIANDO ARQUIVO...</span>
                </>
                }
                </a> 

                { ContratarStoreRead.fileNameUploadResidencia && ContratarStoreRead.fileNameUploadResidencia.map( filename => 
                  <a  className="bg-cinza bg-opacity-20 rounded-md flex justify-between w-full montserrat-regular text-cinza items-center p-2 mt-2 text-xs" key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileStore(filename,'residencia')}} src="/assets/remove.svg" width={12} height={12}/></a> 
                )}    
              <InvisibleCheck  name="anexoResidencia"></InvisibleCheck> 


                
              <div className="w-full mt-2 h-0.5 bg-gray-200 border-white"></div>

              
              <span className="text-xs mt-3 montserrat-regular text-center w-full justify-center text-cinza">
                <strong>CÓDIGO ASSINATURA DIGITAL</strong>
                <br/>Como você prefere receber o código?
              </span> 

              <div className="flex w-full mt-3 justify-center  text-white text-xs montserrat-regular">
                <a className="bg-azul rounded-md flex py-1 px-4 mr-1 cursor-pointer" onClick={HandleOnSendSMS}><span>POR <strong> SMS</strong></span></a>
                <a className="bg-azul rounded-md flex py-1 px-4 ml-1 cursor-pointer" onClick={HandleOnSendEmail} ><span>POR <strong> E-MAIL</strong></span></a>
              </div> 

               <div className="flex flex-col items-center">
                  { sendMessage &&
                    <div className="p-2 mt-4 montserrat-regular text-center text-xs rounded-md w-3/4 bg-verde text-white">
                    {sendMessage}<br/>
                    <strong>{sendMessageStrong}</strong>
                  </div>
                  } 
                   <div className="w-3/4"> 
                    <Input name="cv" small legend="Código de Validação" /> 
                  </div>
                </div>

                 

              
                <span className="bg-quase-branco rounded-md p-4 mt-4  text-cinza-escuro montserrat-regular  h-52 text-xxs overflow-y-scroll" dangerouslySetInnerHTML={{
                    __html: textoPoliticaDePrivacidade
                  }}> 
                </span> 

                
                    <div className="flex cursor-pointer py-2 w-full montserrat-regular text-xs text-cinza" onClick={handleClickTermosDeUso}> 
                      <span><Image src={checkIcon} width={16} height={16}/><strong>  Li</strong> e <strong>Concordo</strong> com os Termos de Uso<br/>
                      e Política de Privacidade.</span>
                    </div>  
                
              <InvisibleCheck  name="politicaprivacidade"></InvisibleCheck> 
          <button className="mt-2 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4" type="submit">Continuar<Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
          
        </Form>

        <Form ref={uploadIdentificacaoRef} encType="multipart/form-data"  onSubmit={handleUploadIdentificacao}>  
          <File name="file" onInput={()=> (uploadIdentificacaoRef.current.submitForm())}/>
        </Form>

        <Form ref={uploadResidenciaRef} encType="multipart/form-data"  onSubmit={handleUploadResidencia}>  
          <File name="file" onInput={()=> (uploadResidenciaRef.current.submitForm())}/>
        </Form>

      </div> 

      <Footer/>

    </div>
    </> )
    
    } 
    export default Cadastro