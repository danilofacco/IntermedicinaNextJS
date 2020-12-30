import Head from 'next/head' 
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'
import TitleWithLogo from '../../components/TitleWithLogo'
import InputMaskCartao from '../../components/Input/inputMaskCartao'
import {CenteredText, Container,Information, ContratoSelecionadoAlt, BoxAssinatura,Separator, TextoInformativoAbaixo} from '../../styles/_styles'
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input';
import {ContratarStore} from '../../store/contratar'

import {BsFillPersonFill as PersonIcon} from 'react-icons/bs'
import {HiOutlineMail as EmailIcon} from 'react-icons/hi'
import {BiPhone as PhoneIcon} from 'react-icons/bi'


import getValidationErrors from '../../utils/getValidationErrors';
import { Column, Row } from '../../components/LinhasColunas';
import Select from '../../components/Input/select';


const Pagamento : React.FC = () => {

  const [metodo,setMetodo] = useState("cartao");
  const ContratarStoreRead = ContratarStore.useState(s => s)

  useEffect(()=>{
    ContratarStore.update(s=>{
      s.metodo = metodo
    })
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

  function SelectFlag(opcao){
    ContratarStore.update(s =>{
      s.cartao.bandeira=opcao;
    })

  }

  interface SignInFormData {
    email: string;
    nome: string;
    celular: string;
  }

  const formRef = useRef(null);
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
        
        
        <TextoInformativoAbaixo>
          • Ao clicar no botão "INICIAR ASSINATURA", você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.
          • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ 49,00/mês) da sua forma de pagamento mensalmente, até você cancelar.
          • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.
          • Não emitimos reembolsos nem créditos por meses parciais.
        </TextoInformativoAbaixo>
         

        
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
        
        <TextoInformativoAbaixo>
        • Ao concluir sua ASSINATURA no aplicativo picpay, você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.
        • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ 49,00/mês) da sua forma de pagamento mensalmente, até você cancelar.
        • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.
        •Não emitimos reembolsos nem créditos por meses parciais.
        </TextoInformativoAbaixo>


        </>
      }

            </Form>
      </BoxAssinatura> 

      <Footer/>

    </Container>
    </> )
    
    }

    export default Pagamento