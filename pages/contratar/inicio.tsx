 
import React, { useRef, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input'; 
import InputMask from '../../components/InputMask'; 

import {ContratarStore} from '../../store/contratar'

import {FormHandles} from '@unform/core'  
import getValidationErrors from '../../utils/getValidationErrors'; 
import { useRouter } from 'next/router';
import { inicioCadastro } from '../../utils/inicioCadastro';
 
import { CarregarDados, SalvarDados } from '../../utils/LocalStorage';

interface SignInFormData {
  nome: string;
  celular: string;
  email:string;
}

interface iResult {
  id: number ;
  MerchantOrderId: string; 
}

const Inicio: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter() 

  const ContratarStoreRead = ContratarStore.useState(s => s);

    useEffect(()=>{
      ContratarStore.update(s=> CarregarDados())
     
    },[])

    useEffect(()=>{ 
      SalvarDados(ContratarStoreRead)  
    },[ContratarStoreRead]) 

    useEffect(()=>{ 
      formRef.current.setFieldValue("nome", ContratarStoreRead.nome) 
      formRef.current.setFieldValue("email", ContratarStoreRead.email) 
      formRef.current.setFieldValue("celular", ContratarStoreRead.tel)

     

     },[formRef])


  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('*É necessário preechimento')
            .email('*Digite  um e-mail válido'),
          nome: Yup.string().required('*É necessário preechimento'),
          celular: Yup.string()
            .test("len", "Número de celular inválido.", (val) => {
              const val_length_without_dashes = val.replace(/-|_/g, "").length;
              return val_length_without_dashes === 13;
            })
            .required('*É necessário preechimento'),
         });

        await schema.validate(data, {
          abortEarly: false,
        });

        ContratarStore.update( s => {
            s.nome = data.nome
            s.tel = data.celular
            s.email = data.email
          });
        
        var dados = {
          codtipo: ContratarStoreRead.CodigoTipoContrato,
          nome: data.nome,
          tel: data.celular,
          email: data.email,
          pplink: ContratarStoreRead.LinkPoliticaDePrivacidade
        }
         
        inicioCadastro(dados).then(result=> {
            ContratarStore.update(s => {
                //@ts-ignore
                s.idCadastro = Number(result.id)
                //@ts-ignore
                s.MerchantOrderId =  result.MerchantOrderId 
              })  
            })

        router.push('/contratar/cadastro');

       
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
    <HeaderVoltarAzul voltar="/contratar"/> 
    <HeaderContratar page={1}/>

    <div className="flex mt-4 flex-col w-full items-center px-4 "> 
     
     
      <span className="text-xs mb-2 montserrat-medium text-center text-cinza">ASSINATURA SELECIONADA:</span>

      <div className="flex flex-col w-full bg-cinza bg-opacity-5 border border-cinza border-opacity-20 rounded-md">

        <div className=" flex w-full mb-2 bg-white">
          <div className="w-6 bg-verde rounded-l-md"></div>
          <div className="rounded-r-md bg-azul p-4 ml-0.5 relative flex flex-col items-start w-full text-white">
            <div className="absolute -ml-7 mt-2">
              <Image src="/assets/logo_icon.svg" width={25} height={30} />
            </div>
            <div className=" ml-1 -mt-2 w-full " ><Image  src="/assets/estrelas.svg" width={56} height={12} /></div>
            <span className="ml-1 -mt-1 text-lg montserrat-regular">Intermedicina <span className="montserrat-bold">{ContratarStoreRead.contratoSelecionadoTitulo}</span> <Image src="/assets/check.svg" width={15} height={15} /> </span>
            <span className="ml-1 mt-1 text-xs montserrat-regular ">Sua família com acesso <br/>aos melhores especialistas! </span> 
          </div>
        </div>

        <span className="text-xs mt-5 montserrat-bold text-center w-full text-cinza">INFORME SEUS DADOS</span>

        <Form  className="p-2 -mt-2" ref={formRef} onSubmit={handleSubmit}> 

              <Input name="nome" placeholder="Nome" />
              <InputMask inputMode="numeric"  mask="(99)99999-9999" maskplaceholder="_"  name="celular" placeholder="Celular" />
              <Input name="email" placeholder="E-mail" />  
              <button className="bg-verde rounded-md mt-2 mb-2 flex justify-between items-center text-xs  text-white w-full p-4" type="submit">Continuar<Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 

        </Form>

      </div> 

      <Footer/>
      
    </div>
 
    </>   );
};
export default Inicio
