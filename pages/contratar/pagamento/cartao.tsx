import Head from 'next/head' 
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../../components/HeaderContratar'
import Footer from '../../../components/Footer'
import HeaderVoltarAzul from '../../../components/HeaderVoltarAzul'   
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import {ContratarStore} from '../../../store/contratar' 
import getValidationErrors from '../../../utils/getValidationErrors'; 
import Select from '../../../components/Select';
 
import { useRouter } from 'next/router';


const Pagamento : React.FC = () => {

  const formRef = useRef(null)
  const router = useRouter()
  const [metodo,setMetodo] = useState("cartao")
  const ContratarStoreRead = ContratarStore.useState(s => s)

  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])

  const [anos,setAnos] = useState([])
  const [meses,setMeses] = useState()

  function gerarAnos(){
    var newAnos = []
    //cria um array com os proximos 10 anos para usar como data de expiração
    for (let i = new Date().getFullYear(); i < new Date().getFullYear()+10; i++) {
      newAnos.push(i)
    }
    setAnos(newAnos)
  } 
   
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
    router.push(`/contratar/pagamento/${m}`)
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
    <div className="px-4"> 
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

        <div className="px-2">

        <div className="px-14"> 
        <Select name="metodo" className="text-cinza-escuro w-full" defaultValue="cartao" onChange={ChangeMetodo}   legend="" small> 
                  <option value="cartao">CARTAO DE CRÉDITO</option>
                  <option value="picpay">PICPAY</option>
                  <option value="energia">CONTA DE ENERGIA</option>
        </Select>
        </div> 
        
    
          <span className="text-xs flex w-full justify-center my-3 text-center montserrat-medium text-gray-500">SELECIONE A BANDEIRA</span>

        <div className="flex justify-between w-full "> 
         
          <Image onClick={()=>SelectFlag("visa")} height={35} width={57} src={`/assets/buttons/${Flag('visa')}`}/>

          <Image onClick={()=>SelectFlag("master")}  height={35} width={57} src={`/assets/buttons/${Flag('master')}`}/>

          <Image onClick={()=>SelectFlag("elo")} height={35} width={57} src={`/assets/buttons/${Flag('elo')}`}/>

          <Image onClick={()=>SelectFlag("diner")} height={35} width={57} src={`/assets/buttons/${Flag('diner')}`}/>

          <Image onClick={()=>SelectFlag("amex")} height={35} width={57} src={`/assets/buttons/${Flag('amex')}`}/>

        </div>

       

              <Input name="nome" legend="NOME IMPRESSO NO CARTÃO" />
              <Input mask="9999 9999 9999 9999" maskplaceholder="_"  name="numeroDoCartao"   legend="NÚMERO DO CARTÃO" /> 

              <div className="flex justify-between mt-4 text-xxs text-cinza montserrat-medium w-full"> 
                 <span className="w-1/3 ml-1 text-left">DATA DE VALIDADE DO CARTÃO</span>
                <span className="w-1/3 pl-2 text-left">CÓDIGO DE SEGURANÇA</span>
              </div>
          
              <div className="flex gap-2 -mt-2 justify-between w-full"> 
                
                <Select  name="mes"  legend="" >
                  <option>MÊS</option>
                  {ContratarStoreRead.meses.map(mes=>{
                    <option value={mes} key={mes}>{mes}</option>
                  })}  
                </Select> 

                <Select   name="mes"  legend="" > 
                  <option>ANO</option>
                  {ContratarStoreRead.anos.map(ano=>{
                    <option value={ano} key={ano}>{ano}</option>
                  })}  
                </Select> 
                  <Input name="cvv"  placeholder="CVV"     />  
                </div>

              <button  className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"  type="submit"><span><strong>Iniciar</strong> Assinatura</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
         </div>
      </Form>

      <div className="text-xxs montserrat-regular p-4 leading-3 text-gray-500 uppercase">
        • Ao concluir sua ASSINATURA no aplicativo picpay, você concorda com os "Termos de Uso e Política de Privacidade" e confirma ter mais de 18 anos.
        • A Intermedicina renovará automaticamente sua assinatura e cobrará o preço da assinatura (atualmente R$ 49,00/mês) da sua forma de pagamento mensalmente, até você cancelar.
        • Para cancelar acesse a seção "Minha Conta" no Portal do Cliente pelo site ou aplicativo da Intermedicina.
        • Não emitimos reembolsos nem créditos por meses parciais.
        </div>

      </div> 

      <Footer/>

    </div>
    </> )
    
    }

    export default Pagamento