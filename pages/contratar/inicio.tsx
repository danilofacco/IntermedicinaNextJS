 
import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import {CenteredText, Container,Information, ContratoSelecionado, BoxAssinatura} from '../../styles/_styles'
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input';
import InputMaskCelular from '../../components/Input/inputMaskCelular';

import {ContratarStore} from '../../store/contratar'

import {FormHandles} from '@unform/core'  
import getValidationErrors from '../../utils/getValidationErrors'; 
import { useRouter } from 'next/router';

interface SignInFormData {
  nome: string;
  celular: string;
  email:string;
}

const Inicio: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter()

  const {contratoSelecionadoTitulo} = ContratarStore.useState(s => s);

  //const { signIn } = useAuth();
  //const { addToast } = useToast();
  //const history = useHistory();

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
          .required('*É necessário preechimento')
          ,

        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await ContratarStore.update(s=> 
          { s.nome = data.nome
            s.tel = data.celular
            s.email = data.email
          });

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
    <HeaderVoltarAzul/> 
    <HeaderContratar page={1}/>
    <Container> 
    
     
      <span className="Titulo">ASSINATURA SELECIONADA:</span>

      <BoxAssinatura>

        <ContratoSelecionado>
          <div className="left"></div>
          <div className="right">
            <div className="absolute">
              <Image src="/assets/logo_icon.svg" width={25} height={30} />
            </div>
            <Image src="/assets/estrelas.svg" width={56} height={12} />
            <span className="title">Intermedicina <strong>{contratoSelecionadoTitulo}</strong> <Image src="/assets/check.svg" width={15} height={15} /> </span>
            <span className="subtitle">Sua família com acesso <br/>aos melhores especialistas! </span> 
          </div>
        </ContratoSelecionado>

        <span className="informe">INFORME SEUS DADOS</span>

        <Form ref={formRef} onSubmit={handleSubmit}> 

              <Input name="nome" placeholder="Nome" />
              <InputMaskCelular name="celular" placeholder="Celular" />
              <Input name="email" placeholder="E-mail" />  
              <button className="button" type="submit">Continuar<Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 

        </Form>

      </BoxAssinatura> 

      <Footer/>
      
    </Container>
 
    </>   );
};
export default Inicio
