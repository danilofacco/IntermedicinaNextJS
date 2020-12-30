import Head from 'next/head' 
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'
import TitleWithLogo from '../../components/TitleWithLogo'
import InputMaskCartao from '../../components/Input/inputMaskCartao'
import {CenteredText, Container,Information, ContratoSelecionadoAlt, BoxAssinatura,Separator, TextoInformativoAbaixo, SendCode, BlueButton, TextoLegenda, AnexoButton, Chips} from '../../styles/_styles'
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input';
import {ContratarStore} from '../../store/contratar'

import InputMaskCPF from '../../components/Input/inputMaskCPF'

import File from '../../components/Input/file'

import {BsFillPersonFill as PersonIcon} from 'react-icons/bs'
import {HiOutlineMail as EmailIcon} from 'react-icons/hi'
import {BiPhone as PhoneIcon} from 'react-icons/bi'


import getValidationErrors from '../../utils/getValidationErrors';
import { Column, Row } from '../../components/LinhasColunas';
import Select from '../../components/Input/select';
import { CPFValidation } from '../../utils/CPFValidation';
import { checkIfFileExists } from '../../utils/checkIfFileExists';
import { removeFile } from '../../utils/removeFile';
import { uploadFile } from '../../utils/uploadFile';
import { SpinnerCircularFixed } from 'spinners-react';


const Pagamento : React.FC = () => {

  const formRef = useRef(null);
  const [metodo,setMetodo] = useState("cartao");
  const ContratarStoreRead = ContratarStore.useState(s => s)

  useEffect(()=>{
    ContratarStore.update(s=>{
      s.metodo = metodo
    })
    formRef.current.setFieldValue("metodo",metodo)
  },[metodo])

  function Flag(opcao){ 
   if (ContratarStoreRead.cartao.bandeira == opcao || ContratarStoreRead.cartao.bandeira == "" ){
    return `${opcao}_act.svg`
   }
    else{
      return `${opcao}_ina.svg`
    }
  }

  function ChangeMetodo(){
    var m = formRef.current.getFieldValue("metodo")
    setMetodo(m) 
  }

  function onChangeCPF(){
    CPFValidation(formRef.current.getFieldValue("cpf"))
  }
  
  function mesmoTitular(resposta){
    resposta ?  formRef.current.setFieldValue("nomeTitularEnergia",ContratarStoreRead.nome): formRef.current.setFieldValue("nomeTitularEnergia","")
    resposta ?  formRef.current.setFieldValue("cpfTitularEnergia",ContratarStoreRead.cpf): formRef.current.setFieldValue("cpfitularEnergia","")    
  }

  function SelectFlag(opcao){
    ContratarStore.update(s =>{
      s.cartao.bandeira=opcao;
    })

  }

  function reduceName(varString){
    if (varString.length > 26){
      return `${varString.substr(0,22)}...`
    }
    else{
      return `${varString}` 
    }
  }
 


    //* UPLOAD TALÃO - INICIO


    const [loadingUploadTalao,setLoadingUploadTalao] = useState(false)
    const [fileNameUploadTalao, setFileNameUploadTalao] = useState([])


    function handleClickTalao(){
      const uploadButton = formRef.current.getFieldRef("uploadTalao")//*
      uploadButton.click()
    }

    function removeFileTalao(filename){
      var newArr=[]
      ContratarStoreRead.fileNameUploadTalao.map(s => {
        if ( s != filename) { 
          newArr.push(s) 
        }
      })
    
      ContratarStore.update(s => {
        s.fileNameUploadTalao= newArr
      })
      removeFile(filename) 
    }

    const handleUploadTalao = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {}
      else{
        setLoadingUploadTalao(true) //*
        uploadFile(e).then(result => {
          setLoadingUploadTalao(false) //*
            var newArr=[]
            ContratarStoreRead.fileNameUploadTalao.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result)
            }
            ContratarStore.update(s => {
              s.fileNameUploadTalao = newArr
            })

          checkIfFileExists(result).then(result => {
              if (result == false){
                ContratarStore.update(s => {
                  s.fileNameUploadTalao= []
                })
                alert("Erro ao fazer envio do arquivo, tente novamente.")
              }
          })
        })
      }
    }, [ContratarStoreRead.fileNameUploadTalao]);

   //* UPLOAD TALÃO - FIM

  interface SignInFormData {
    email: string;
    nome: string;
    celular: string;
  }

  async function handleSubmit(data) {
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome Obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          celular: Yup.string().required('Celular Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        }); 
        //await signIn({ email: data.email, password: data.password }); 
        //history.push('/dashboard'); 
       
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          // error

          return;
        }

        
      }
  }
}


    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/cadastro"/> 
    <HeaderContratar page={3}/>
    <Container> 
      <BoxAssinatura style={{
        boxShadow:"0px 0px 0px 1px #34AF23 inset"}}>

        <ContratoSelecionadoAlt> 
          <div className="topo">  
            <span className="textoCinza">ASSINATURA SELECIONADA</span>
            <span className="textoAzul">Intermedicina <strong>Família</strong> <Image src="/assets/checkverde.svg" width={15} height={15}/> </span> 
          </div>

          <div className="bottom"> 
            <div className="esquerda">
              <span className="textoCinza">VALOR</span>
              <span className="textoAzul">R$40,00/mês <Image src="/assets/checkverde.svg" width={15} height={15}/> </span>
            </div>
            <div className="direita">
              <Image src="/assets/conexao100segura.svg" width={76} height={17}/>
            </div>
          </div>
        </ContratoSelecionadoAlt>

        <Separator><div></div></Separator>

        

        <Form ref={formRef} onSubmit={handleSubmit}>  

        <Row pl={80} pr={80}> 
        <Select name="metodo" onChange={ChangeMetodo}   legend="" small> 
                  <option value="cartao">CARTAO DE CRÉDITO</option>
                  <option value="picpay">PICPAY</option>
                  <option value="energia">CONTA DE ENERGIA</option>
        </Select>
        </Row> 
        
      {
        ContratarStoreRead.metodo == "cartao" &&
        <>
          <span className="informe">SELECIONE A BANDEIRA</span>

        <Row mt={8}>
    
         
          <Column><Image onClick={()=>SelectFlag("visa")} height={35} width={57} src={`/assets/buttons/${Flag('visa')}`}/></Column>

          <Column><Image onClick={()=>SelectFlag("master")}  height={35} width={57} src={`/assets/buttons/${Flag('master')}`}/></Column>

          <Column><Image onClick={()=>SelectFlag("elo")} height={35} width={57} src={`/assets/buttons/${Flag('elo')}`}/></Column>

          <Column><Image onClick={()=>SelectFlag("diner")} height={35} width={57} src={`/assets/buttons/${Flag('diner')}`}/></Column>

          <Column><Image onClick={()=>SelectFlag("amex")} height={35} width={57} src={`/assets/buttons/${Flag('amex')}`}/></Column>

        </Row>

              <Input name="nome" legend="NOME IMPRESSO NO CARTÃO" />
              <InputMaskCartao name="numeroDoCartao"   legend="NÚMERO DO CARTÃO" /> 

              <Row>
              <Column mr={4} >
                  <span className="informe_left">DATA DE VALIDADE DO CARTÃO</span>
                </Column>  
                <Column  ml={4} mr={4}>
                </Column> 

                <Column  ml={4}>
                  <span className="informe_left">CÓDIGO DE SEGURANÇA</span>
                  </Column>
              </Row>
          
              <Row>
                <Column mr={4}  >
                <Select name="mes"  legend="" >
                  <option>MÊS</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option> 
                  <option>4</option> 
                  <option>5</option> 
                  <option>6</option> 
                  <option>7</option> 
                  <option>8</option> 
                  <option>9</option> 
                  <option>10</option> 
                  <option>11</option> 
                  <option>12</option> 
                </Select>

                </Column> 

                <Column  ml={4} mr={4}>
                <Select name="mes"  legend="" > 
                  <option>ANO</option>
                  <option>2021</option>
                  <option>2022</option> 
                  <option>2023</option> 
                  <option>2024</option> 
                  <option>2025</option> 
                  <option>2026</option> 
                  <option>2027</option> 
                  <option>2028</option> 
                  <option>2029</option> 
                  <option>2030</option>  
                </Select> 
                </Column> 

                <Column  ml={4}>
                  <Input name="cvv"  placeholder="CVV"     /> 
                </Column>
                </Row>

              <button  className="button"  type="submit"><span><strong>Iniciar</strong> Assinatura</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
            
        </>
      }

      {

        ContratarStoreRead.metodo == "picpay" &&
        <>
        <div className="picpayInformation">
        <span>
        <strong>INFORMAÇÃO IMPORTANTE:</strong><br/>
          Vamos finalizar a sua assinatura <br/>
          dentro do aplicativo PicPay.<br/>
          Clique no botão para abrir o PicPay<br/>
          e siga as orientações.<br/>
        </span>
        </div>

        <button  className="button"  type="button"><span><strong>Abrir</strong> Picpay</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
         
        </>
      }

      {

      ContratarStoreRead.metodo == "energia" &&

     <>
      <span className="informe">
        O TITULAR DA CONTA DE ENERGIA<br/>
        É O MESMO TITULAR DO CONTRATO?
      </span>

      <Row mt={8}>
        <SendCode>
          <BlueButton onClick={()=>mesmoTitular(true)}><span></span><strong>SIM</strong></BlueButton>
          <BlueButton onClick={()=>mesmoTitular(false)}><span></span><strong>NÃO</strong></BlueButton>
        </SendCode>
       </Row>

       <Row mt={8}> 
          <Input name="nomeTitularEnergia" legend="TITULAR DA CONTA DE ENERGIA"    />
          </Row>
       <Row mt={8}> 
          <InputMaskCPF name="cpfTitularEnergia"  legend="CPF DO TITULAR DA CONTA DE ENERGIA" onBlur={onChangeCPF}   />
       </Row>
          
        <Row mt={8}> 
          <Input type="number" name="numeroInstalacaoEnergia" legend="INSTALAÇÃO OU IDENTIFICAÇÃO DO TALÃO"   />  
        </Row>


        <Row> 
                <TextoLegenda>
                  <span>Cópia do <strong>talão de energia</strong>
                  </span>
               </TextoLegenda> 
              </Row>

              <Row> 
              <Column mr={4}>

              <File name="uploadTalao" onInput={handleUploadTalao}/>
              { !loadingUploadTalao
              ? 
                <AnexoButton onClick={handleClickTalao}>
                  <Image src="/assets/file.svg" width={12} height={12}/>
                  <span>ANEXAR COMPROVANTE</span>
                </AnexoButton> 
              : 
                <AnexoButton >
                  <SpinnerCircularFixed size={24} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                  <span>ENVIANDO ARQUIVO...</span>
                </AnexoButton>
              }
              
              </Column>

                <Column ml={4}>

                { ContratarStoreRead.fileNameUploadTalao && ContratarStoreRead.fileNameUploadTalao.map( filename => 
                  <Chips key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileTalao(filename)}} src="/assets/remove.svg" width={12} height={12}/></Chips> 
                )}
                </Column>  
              </Row>


     </>

}

      </Form>

      <TextoInformativoAbaixo>
        • Ao concluir sua ASSINATURA no aplicativo picpay, você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.
        • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ 49,00/mês) da sua forma de pagamento mensalmente, até você cancelar.
        • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.
        • Não emitimos reembolsos nem créditos por meses parciais.
        </TextoInformativoAbaixo>

      </BoxAssinatura> 

      <Footer/>

    </Container>
    </> )
    
    }

    export default Pagamento