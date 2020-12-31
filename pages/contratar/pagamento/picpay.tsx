import Head from 'next/head' 
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../../components/HeaderContratar'
import Footer from '../../../components/Footer'
import HeaderVoltarAzul from '../../../components/HeaderVoltarAzul'
import TitleWithLogo from '../../../components/TitleWithLogo'
import InputMaskCartao from '../../../components/Input/inputMaskCartao'
import {CenteredText, Container,Information, ContratoSelecionadoAlt, BoxAssinatura,Separator, TextoInformativoAbaixo, SendCode, BlueButton, TextoLegenda, AnexoButton, Chips} from '../../../styles/_styles'
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import {ContratarStore} from '../../../store/contratar'

import InputMaskCPF from '../../../components/Input/inputMaskCPF'

import File from '../../../components/Input/file'

import {BsFillPersonFill as PersonIcon} from 'react-icons/bs'
import {HiOutlineMail as EmailIcon} from 'react-icons/hi'
import {BiPhone as PhoneIcon} from 'react-icons/bi'


import getValidationErrors from '../../../utils/getValidationErrors';
import { Column, Row } from '../../../components/LinhasColunas';
import Select from '../../../components/Input/select';
import { CPFValidation } from '../../../utils/CPFValidation';
import { checkIfFileExists } from '../../../utils/checkIfFileExists';
import { removeFile } from '../../../utils/removeFile';
import { uploadFile } from '../../../utils/uploadFile';
import { SpinnerCircularFixed } from 'spinners-react';
import { useRouter } from 'next/router';


const Pagamento : React.FC = () => {

  const formRef = useRef(null);

  const router = useRouter()
  const [metodo,setMetodo] = useState("cartao");
  const ContratarStoreRead = ContratarStore.useState(s => s)

  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])


  useEffect(()=>{
    ContratarStore.update(s=>{
      s.metodo = metodo
    }) 
  },[metodo])

 
  function ChangeMetodo(){
    var m = formRef.current.getFieldValue("metodo")
    setMetodo(m) 
    router.push(`/contratar/pagamento/${m}`)
  }


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
        <Select name="metodo" defaultValue="picpay" onChange={ChangeMetodo}   legend="" small>

                <option value="cartao">CARTAO DE CRÉDITO</option>
                <option  value="picpay">PICPAY</option>
                <option value="energia">CONTA DE ENERGIA</option>
        </Select>
        </Row> 
        
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