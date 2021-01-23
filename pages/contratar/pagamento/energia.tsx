 
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../../components/HeaderContratar'
import Footer from '../../../components/Footer'
import HeaderVoltarAzul from '../../../components/HeaderVoltarAzul'  
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import {ContratarStore} from '../../../store/contratar' 
   
import File from '../../../components/FileInput' 

import getValidationErrors from '../../../utils/getValidationErrors'; 
import Select from '../../../components/Select';
import { CPFValidation } from '../../../utils/CPFValidation';
import { removeFile } from '../../../utils/removeFile';
import { SpinnerCircularFixed } from 'spinners-react';
import { useRouter } from 'next/router';
import InputMask from '../../../components/InputMask';
import { uploadFilePost } from '../../../utils/uploadFilePost'; 

import { CarregarDados, SalvarDados } from '../../../utils/LocalStorage';  
import { FormHandles } from '@unform/core';
import InvisibleCheck from '../../../components/InvisibleCheck';
import { pagamentoEnergia } from '../../../utils/pagamentoEnergia';

const Energia: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const uploadTalaoRef = useRef<FormHandles>(null);
  const router = useRouter()
  const [metodo,setMetodo] = useState("cartao");
  const ContratarStoreRead = ContratarStore.useState(s => s)
  const [simOuNao , setSimOuNao] = useState(null)
  const [refresh,setRefresh] = useState(Math.random())  
  const [loadingPage, setLoadingPage] = useState(false)

  useEffect(()=>{
    ContratarStore.update(s=> CarregarDados()) 
    setRefresh(Math.random()) 
  },[])

  useEffect(()=>{ 
    SalvarDados(ContratarStoreRead)    
  },[ContratarStoreRead])  

  useEffect(()=>{
    ContratarStore.update(s=>{
      s.metodo = metodo
    }) 
  },[metodo]) 


  useEffect(()=>{ 
    formRef.current.setFieldValue("nome_energia", ContratarStoreRead.energia.nome) 
    formRef.current.setFieldValue("cpf_energia", ContratarStoreRead.energia.cpf) 
    formRef.current.setFieldValue("instalacao_energia", ContratarStoreRead.energia.instalacao) 
    formRef.current.setFieldValue("anexo_energia", ContratarStoreRead.fileNameUploadTalao && String(ContratarStoreRead.fileNameUploadTalao))
  },[refresh])


  function ChangeMetodo(){
    var m = formRef.current.getFieldValue("metodo")
    setMetodo(m) 
    router.push(`/contratar/pagamento/${m}`)
  }

  function onChangeCPF(){
    !CPFValidation(formRef.current.getFieldValue("cpf_energia")) ? formRef.current.clearField("cpf_energia") : null
  }
  
  function mesmoTitular(resposta){
    setSimOuNao(resposta)
    resposta ?  formRef.current.setFieldValue("nome_energia",ContratarStoreRead.nome): formRef.current.setFieldValue("nome_energia","")
    resposta ?  formRef.current.setFieldValue("cpf_energia",ContratarStoreRead.cpf): formRef.current.setFieldValue("cpf_energia","")    
  }


  function reduceName(varString){
    if (varString.length > 26){
      return `${varString.substr(0,22)}...`
    }
    else{
      return `${varString}` 
    }
  } 

    const [loadingUploadTalao,setLoadingUploadTalao] = useState(false) 

    function handleClickUpload(type){
      var uploadButton = null
      switch (type) {
        //case "identificacao":   uploadButton = uploadIdentificacaoRef.current.getFieldRef("file"); break;
        //case "residencia":   uploadButton = uploadResidenciaRef.current.getFieldRef("file"); break;
        case "talao":   uploadButton = uploadTalaoRef.current.getFieldRef("file"); break; 
      } 
      uploadButton.click()
    } 


    function setLoadingUpload(value,type){ 
      switch (type) {
        //case "identificacao":   setLoadingUploadIdentificacao(value); break;
        //case "residencia":   setLoadingUploadResidencia(value); break;
         case "talao":   setLoadingUploadTalao(value); break; 
      }  
    } 

    function removeFileStore(filename,type){
      var newArr=[]
      switch (type) {
        case "identificacao":   
        //ContratarStoreRead.fileNameUploadIdentificacao.map(s => { s != filename &&  newArr.push(s) })
        //ContratarStore.update(s => { s.fileNameUploadIdentificacao = newArr })
        //formRef.current.setFieldValue("anexoIdentificacao",String(newArr))
        
        break;
        case "residencia":   
        //ContratarStoreRead.fileNameUploadResidencia.map(s => { s != filename &&  newArr.push(s) })
        //ContratarStore.update(s => { s.fileNameUploadResidencia = newArr })
        //formRef.current.setFieldValue("anexoResidencia",String(newArr))
        break;

        case "talao":   
        ContratarStoreRead.fileNameUploadTalao.map(s => { s != filename &&  newArr.push(s) })
        ContratarStore.update(s => { s.fileNameUploadTalao = newArr })
        formRef.current.setFieldValue("anexo_energia",String(newArr))

        break; 
      } 
      removeFile(filename) 
    }
 
 

    const handleUploadTalao = useCallback((e: ChangeEvent<HTMLInputElement>) => { 
      const files = uploadTalaoRef.current.getFieldRef("file").files
      if(files.length > 0 ){
        setLoadingUpload(true,'talao') 
        //@ts-ignore
        var filename = e.file  
        var formData = new FormData()
        formData.append("file", files[0])
        uploadFilePost(formData,filename).then(result =>{
          setLoadingUpload(false,'talao')
          var newArr=[]
            ContratarStoreRead.fileNameUploadTalao.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result) 
            }
            ContratarStore.update(s => {
              s.fileNameUploadTalao = newArr
            }) 
            formRef.current.setFieldValue("anexo_energia",String(newArr))
            formRef.current.setFieldError("anexo_energia","")
        })
      } 
    }, [ContratarStoreRead.fileNameUploadTalao]);

    
  interface PagamentoEnergiaData {
    nome_energia: string;
    cpf_energia: string;
    instalacao_energia: string; 
    anexo_energia: string;
  }

  const handleSubmit = useCallback(
    async (data: PagamentoEnergiaData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome_energia: Yup.string().required('*É necessário preechimento'),
          cpf_energia: Yup.string().test("len", "CPF Inválido.", (val) => {
            return CPFValidation(val);
          })
            .required('*É necessário preechimento'),
          instalacao_energia: Yup.string().required('*É necessário preechimento'),
          anexo_energia: Yup.string().required('*É Necessario anexar ao menos um arquivo'),
        });


        ContratarStore.update(s=>  
          { s.energia.nome = data.nome_energia
            s.energia.cpf = data.cpf_energia
            s.energia.instalacao = data.instalacao_energia
            s.energia.anexo = data.anexo_energia  
          });  

        await schema.validate(data, {
          abortEarly: false,
        }); 
        setLoadingPage(true)
        var dados = {
          nome_energia: data.nome_energia,
          cpf_energia: data.cpf_energia,
          instalacao_energia: data.instalacao_energia,
          anexo_energia: data.anexo_energia,
          metodo: ContratarStoreRead.metodo,
          id: ContratarStoreRead.idCadastro,
          valorcontrato:String(ContratarStoreRead.precoContrato)
        } 
       
        pagamentoEnergia(dados).then(result => { 
          setLoadingPage(false)
          router.push('/contratar/concluido-energia');
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
    <HeaderVoltarAzul voltar="/contratar/cadastro"/> 
    <HeaderContratar page={3}/>
    
    <div className="flex flex-col items-center px-4"> 

    <div className="flex flex-col w-full bg-cinza bg-opacity-5 border border-verde rounded-md" >

    <div className="flex flex-col w-full p-4"> 
          <div className="flex flex-col w-full">  
          <span className="text-xs montserrat-medium text-cinza pb-1">ASSINATURA SELECIONADA:</span>
          <span className="text-sm montserrat-regular text-azul pb-2">Intermedicina <strong className="montserrat-bold">{ContratarStoreRead.contratoSelecionadoTitulo}</strong> <Image src="/assets/checkverde.svg" width={15} height={15}/> </span> 
     </div> 
          <div className="flex w-full justify-between items-end"> 
            <div className="flex flex-col">
              <span className="text-xs montserrat-medium text-cinza pb-1">VALOR</span>
              <span className="text-sm montserrat-regular text-azul pb-2">R$ {ContratarStoreRead.precoContrato},00/mês <Image src="/assets/checkverde.svg" width={15} height={15}/> </span>
            </div>
            <div className="mb-1">
              <Image src="/assets/conexao100segura.svg" width={76} height={17}/>
            </div>
          </div>
    </div> 

    <div className="text-center w-80 h-0.5 bg-gray-200 border-white"></div>

        

        <Form ref={formRef} onSubmit={handleSubmit}>  

        <div className="px-14"> 
          <Select name="metodo" className="text-cinza" defaultValue="energia" onChange={ChangeMetodo} legend="" small> 
                    <option value="cartao">CARTAO DE CRÉDITO</option>
                    <option value="picpay">PICPAY</option>
                    <option value="energia">CONTA DE ENERGIA</option>
          </Select>
        </div> 
        
        
      <span className="text-xs flex w-full justify-center my-3 text-center montserrat-medium text-gray-500">
        O TITULAR DA CONTA DE ENERGIA<br/>
        É O MESMO TITULAR DO CONTRATO?
      </span>

      <div className="flex w-full justify-center gap-2 text-white text-xs montserrat-regular"> 
          <a className={`${  (simOuNao && simOuNao != null) ? "bg-azul" : "bg-cinza"} cursor-pointer rounded-md flex py-1 px-4 mr-1`} onClick={()=>mesmoTitular(true)}><span></span><strong> SIM </strong></a>
          <a className={`${ (!simOuNao && simOuNao != null) ? "bg-azul" : "bg-cinza"} cursor-pointer rounded-md flex py-1 px-4 ml-1`} onClick={()=>mesmoTitular(false)}><span></span><strong> NÃO </strong></a>
       
       </div>

       <div className="mx-2">
          <Input name="nome_energia" legend="TITULAR DA CONTA DE ENERGIA"    />
      
          <InputMask mask="999.999.999-99" maskplaceholder="_" name="cpf_energia"  legend="CPF DO TITULAR DA CONTA DE ENERGIA" onBlur={onChangeCPF}   />
       
          <Input  name="instalacao_energia" legend="INSTALAÇÃO OU IDENTIFICAÇÃO DO TALÃO"   />  
         
          <span className="text-xs montserrat-regular text-cinza">Cópia do <strong>talão de energia.</strong></span>
             
                <a className="bg-laranja rounded-md text-xxs  w-2/4 text-white montserrat-bold px-1.5 py-2 flex items-center text-center" onClick={()=>handleClickUpload("talao")}>
                { !loadingUploadTalao
              ? <>
                  <Image className="pr-1 w-3 h-3"  src="/assets/file.svg" width={12} height={12}/>
                  <span>ANEXAR TALÃO</span>
                  </>
                  : 
                <>
                  <SpinnerCircularFixed className="pr-1" size={12} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                  <span>ENVIANDO ARQUIVO...</span>
                </>
                }
                </a> 
              
                

                { ContratarStoreRead.fileNameUploadTalao && ContratarStoreRead.fileNameUploadTalao.map( filename => 
                  <a  className="bg-cinza bg-opacity-20 rounded-md flex justify-between w-full montserrat-regular text-cinza items-center p-2 mt-2 text-xs" key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileStore(filename,'talao')}} src="/assets/remove.svg" width={12} height={12}/></a> 
                )}
                 <InvisibleCheck  name="anexo_energia"></InvisibleCheck>  

              
                  
              <div className="w-full h-0.5 my-3 bg-gray-200 border-white"></div>

              <div className="text-xs montserrat-regular text-red-600">
              <strong>INFORMAÇÃO IMPORTANTE:</strong><br/>
                Ao iniciar assinatura, a central de atendimento da Intermedicina entrará em contato por telefone, para formalizar a <strong>AUTORIZAÇÃO DE DÉBITO</strong> em seu talão de energia, conforme exigência das concessionárias elétricas.
              </div>

              <button  className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"  type="submit"><span><strong>Iniciar</strong> Assinatura</span>
                {loadingPage ? <SpinnerCircularFixed className="pr-1" size={19} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                : <Image src="/assets/arrowRight.svg" width={19} height={13}/>
                }
           </button> 
       
              </div>
 

      </Form>
      
      <Form ref={uploadTalaoRef} encType="multipart/form-data"  onSubmit={handleUploadTalao}>  
          <File name="file" onInput={()=> (uploadTalaoRef.current.submitForm())}/>
        </Form>


      <div className="text-xxs montserrat-regular p-2 leading-3 text-gray-500 uppercase">
        • Ao concluir sua ASSINATURA no aplicativo picpay, você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.<br/>
        • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ {ContratarStoreRead.precoContrato},00/mês) da sua forma de pagamento mensalmente, até você cancelar.<br/>
        • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.<br/>
        • Não emitimos reembolsos nem créditos por meses parciais.<br/>
        </div>

      </div> 

      <Footer/>

    </div>
    </> )
    
    }

    export default Energia