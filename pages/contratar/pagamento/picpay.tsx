import Head from 'next/head' 
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../../components/HeaderContratar'
import Footer from '../../../components/Footer'
import HeaderVoltarAzul from '../../../components/HeaderVoltarAzul'  
import Image from 'next/image' 
import { Form } from '@unform/web'; 
import {ContratarStore} from '../../../store/contratar'   
import Select from '../../../components/Select'

import getValidationErrors from '../../../utils/getValidationErrors';  
import { useRouter } from 'next/router';


import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';


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
    <div className="p-4"> 
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
          <Select name="metodo" className="text-cinza" defaultValue="picpay" onChange={ChangeMetodo}   legend="" small> 
                    <option value="cartao">CARTAO DE CRÉDITO</option>
                    <option value="picpay">PICPAY</option>
                    <option value="energia">CONTA DE ENERGIA</option>
          </Select>
        </div> 
        
        <div className="p-4">
          <div className="text-xs text-cinza montserrat-regular">
          <strong className="text-verde montserrat-bold">INFORMAÇÃO IMPORTANTE:</strong><br/>
            Vamos finalizar a sua assinatura <br/>
            dentro do aplicativo PicPay.<br/>
            Clique no botão para abrir o PicPay<br/>
            e siga as orientações.<br/>
          </div>
        </div>
        <div className="mx-2">
        <button  className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"  type="button"><span><strong>Abrir</strong> Picpay</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
        </div>
      </Form>

      <div className="text-xxs montserrat-regular p-4 leading-3 text-gray-500 uppercase">
        • Ao concluir sua ASSINATURA no aplicativo picpay, você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.<br/>
        • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ 49,00/mês) da sua forma de pagamento mensalmente, até você cancelar.<br/>
        • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.<br/>
        • Não emitimos reembolsos nem créditos por meses parciais.<br/>
        </div>

      </div> 

      <Footer/>

    </div>
    </> )
    
    }

    export default Pagamento