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
 

import { CarregarDados, SalvarDados } from '../../../utils/LocalStorage';
 
import { useRouter } from 'next/router';
import InputMask from '../../../components/InputMask';
import InvisibleCheck from '../../../components/InvisibleCheck';
import { FormHandles } from '@unform/core'; 
import OptionsAnos from '../../../components/OptionsAnos';
import OptionsMeses from '../../../components/OptionsMeses';
import { pagamentoCartao } from '../../../utils/pagamentoCartao';
import { SpinnerCircularFixed } from 'spinners-react';


const Pagamento: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const router = useRouter()
  const [metodo,setMetodo] = useState("cartao")
  const ContratarStoreRead = ContratarStore.useState(s => s)  
  const [refresh,setRefresh] = useState(Math.random()) 
  const [loadingPage, setLoadingPage] = useState(false) 

  const [maskCartao, setMaskCartao] = useState("9999 9999 9999 9999") 
  const [maskCVV, setMaskCVV] = useState("999") 

  useEffect(()=>{
    InputMaskCartao()
    InputMaskCVV()
  },[ContratarStoreRead.cartao.bandeira])


  useEffect(()=>{
    ContratarStore.update(s=> CarregarDados()) 
    setRefresh(Math.random()) 
  },[])

  useEffect(()=>{ 
    SalvarDados(ContratarStoreRead)    
  },[ContratarStoreRead])  
 
   
  useEffect(()=>{
    metodo &&  
      ContratarStore.update(s=>{
        s.metodo = metodo
      })   
  },[metodo])

  useEffect(()=>{
    var mesAtual = ""
    ContratarStoreRead.cartao.mes < 10 ?
    mesAtual = "0" + ContratarStoreRead.cartao.mes :
    mesAtual = String(ContratarStoreRead.cartao.mes)

    formRef.current.setFieldValue("nome", ContratarStoreRead.cartao.nome) 
    formRef.current.setFieldValue("numero", ContratarStoreRead.cartao.numero != 0 ? String(ContratarStoreRead.cartao.numero) :"") 
    formRef.current.setFieldValue("mes", ContratarStoreRead.cartao.mes != 0 ? mesAtual :"") 
    formRef.current.setFieldValue("ano", ContratarStoreRead.cartao.ano != 0 ? String(ContratarStoreRead.cartao.ano) :"") 
    formRef.current.setFieldValue("bandeira", ContratarStoreRead.cartao.bandeira)
    formRef.current.setFieldValue("cvv", ContratarStoreRead.cartao.cvv != 0 ? String(ContratarStoreRead.cartao.cvv) : "")
    
  },[refresh])  

  function validateNumeroCartao(val){
    var leng = 16
    var r = false
    //identifica a quantidade de digitos necessaria.
    ContratarStoreRead.cartao.bandeira == "amex" ? leng = 15 : ""
    ContratarStoreRead.cartao.bandeira == "diner" ? leng = 14 : ""
    //remove toda mascara e testa se tem a quantidade correta de digitos.
    
    val && returnOnlyNumbers(val).length == leng ? r = true : ""
    return r 
  }

  function validateCVV(val){
    var leng = 3
    var r = false
    //identifica a quantidade de digitos necessaria.
    ContratarStoreRead.cartao.bandeira == "amex" ? leng = 4 : ""
    //remove toda mascara e testa se tem a quantidade correta de digitos.
    val &&  returnOnlyNumbers(val).length == leng ? r = true : ""
    return r 
  }

  function InputMaskCartao(){
    var val = ""
    ContratarStoreRead.cartao.bandeira ? val = ContratarStoreRead.cartao.bandeira : null
    //Define o tipo de mascara a ser utilizado no Numero do Cartao
    var v = "9999 9999 9999 9999" //padrao
    val == 'diner'? v = "999 999999 99999" : ""
    val == 'amex'? v = "999 999999 999999" : ""  
    setMaskCartao(v)
  }

  function InputMaskCVV(){
    var val = ""
    ContratarStoreRead.cartao.bandeira ? val = ContratarStoreRead.cartao.bandeira : null
    //Define o tipo de mascara a ser utilizado no CVV
    var v = "999" //padrao
    val == 'amex' ? v = "9999" : ""
    setMaskCVV(v)
  }

  function returnOnlyNumbers(val){
    //remove qualquer mascara e retorna somente numeros
    var numberPattern = /\d+/g
    return val.match(numberPattern).join('')
  }



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
    formRef.current.setFieldValue("bandeira", opcao)
    formRef.current.setFieldError("bandeira","")
  } 
  
  interface SignInFormData {
    nome: string;
    numero: string;
    mes: string;
    ano: string; 
    cvv: string;
    bandeira: string;
  }



  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('*É necessário preechimento'),
          numero: Yup.string().test("len", "Número Inválido.", (val) => {
            return validateNumeroCartao(val);
          }) .required('*É necessário preechimento'),
          mes: Yup.string().required('Mês de Validade Obrigatório'), 
          ano: Yup.string().required('Ano de Validade Obrigatório'), 
          cvv: Yup.string().test("len", "Número CVV Inválido.", (val) => {
            return validateCVV(val);
          }) .required('*É necessário preechimento'), 
          bandeira: Yup.string().required('Selecione a Bandeira do Cartão'),
        });

        ContratarStore.update(s=>  
          { s.cartao.nome = data.nome
            s.cartao.numero =   Number(data.numero.replace(' ','').replace(' ','').replace(' ','').replace(' ',''))
            s.cartao.mes =  Number(data.mes)
            s.cartao.ano = Number(data.ano)
            s.cartao.cvv =  Number(data.cvv)
            s.cartao.bandeira = data.bandeira
          }); 

        await schema.validate(data, {
          abortEarly: false,
        }); 
        
        setLoadingPage(true)
        var dados = {
          Name: String(ContratarStoreRead.nome), //
          Holder:String(data.nome),  
          Amount:Number(ContratarStoreRead.precoContrato + "00"), //
          CardNumber: String(data.numero.replace(' ','').replace(' ','').replace(' ','').replace(' ','')),
          Brand: String(data.bandeira),
          ExpirationDate: String(data.mes +"/"+ data.ano), 
          SecurityCode: String(data.cvv),
          MerchantOrderId: String(ContratarStoreRead.MerchantOrderId)
        } 
        
        pagamentoCartao(dados).then(result => {
          setLoadingPage(true)
          //@ts-ignore
          result.success == true ? router.push('/contratar/concluido') : router.push('/contratar/nao-autorizado');
           
        })  
        

        //history.push('/dashboard'); 
       
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
        <Select name="metodo" className="text-cinza-escuro text-center w-full" defaultValue="cartao" onChange={ChangeMetodo}   legend="" small> 
                  <option value="cartao">CARTAO DE CRÉDITO</option>
                  <option value="picpay">PICPAY</option>
                  <option value="energia">CONTA DE ENERGIA</option>
        </Select>
        </div> 
        
    
          <span className="text-xs flex w-full justify-center my-3 text-center montserrat-medium text-gray-500">SELECIONE A BANDEIRA</span>

        <div className="flex justify-between w-full "> 
         
          <Image onClick={()=>SelectFlag("Visa")} height={35} width={57} src={`/assets/buttons/${Flag('Visa')}`}/>

          <Image onClick={()=>SelectFlag("Master")}  height={35} width={57} src={`/assets/buttons/${Flag('Master')}`}/>

          <Image onClick={()=>SelectFlag("Elo")} height={35} width={57} src={`/assets/buttons/${Flag('Elo')}`}/>

          <Image onClick={()=>SelectFlag("Diners")} height={35} width={57} src={`/assets/buttons/${Flag('Diners')}`}/>

          <Image onClick={()=>SelectFlag("Amex")} height={35} width={57} src={`/assets/buttons/${Flag('Amex')}`}/>

        </div>
        <InvisibleCheck name="bandeira" />

 

              <Input name="nome" legend="NOME IMPRESSO NO CARTÃO" />
              <InputMask mask={maskCartao} maskplaceholder="_"  name="numero"  legend="NÚMERO DO CARTÃO" />  
              
              <div className="flex justify-between mt-4 text-xxs text-cinza montserrat-medium w-full"> 
                 <span className="w-1/3 ml-1 text-left">DATA DE VALIDADE DO CARTÃO</span>
                <span className="w-1/3 pl-2 text-left">CÓDIGO DE SEGURANÇA</span>
              </div>
          
              <div className="flex gap-2 -mt-2 justify-between w-full">  

              <div className="w-full  mr-1"> 
                <Select  defaultValue=""   name="mes"  legend="" > 
                  <OptionsMeses/> 
                </Select> 
                </div>

                <div className="w-full  mr-1 ml-1">
                <Select   defaultValue=""  name="ano"  legend="">  
                  <OptionsAnos/> 
                </Select>
                
                </div>
                <div className="w-full  ml-1">

                <InputMask mask={maskCVV} maskplaceholder="_" name="cvv"  placeholder="CVV"     />
                  </div>  
                </div>

              <button className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"  type="submit"><span><strong>Iniciar</strong> Assinatura</span> 
              {loadingPage ? <SpinnerCircularFixed className="pr-1" size={19} thickness={140} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                : <Image src="/assets/arrowRight.svg" width={19} height={13}/>
                }
              </button> 
         </div>
      </Form>

      <div className="text-xxs montserrat-regular p-4 leading-3 text-gray-500 uppercase">
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

    export default Pagamento