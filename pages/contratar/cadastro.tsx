 
import React, { useCallback, ChangeEvent, useEffect, useRef ,useState} from 'react';
import * as Yup from 'yup';
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import {CenteredText, Container,Information,TextoLegenda, ContratoSelecionadoAlt, BoxAssinatura,Separator, AnexoButton, Chips, ErrorText, BlueButton, SendCode, CodigoEnviado, TermoDeUso} from '../../styles/_styles'
import Image from 'next/image' 
import { Form } from '@unform/web';
import Input from '../../components/Input';
import InputMaskDate from '../../components/Input/inputMaskDate'
import File from '../../components/Input/file'
import {Row, Column} from '../../components/LinhasColunas'

import {ContratarStore} from '../../store/contratar' 

import getValidationErrors from '../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import InputMaskCPF from '../../components/Input/inputMaskCPF'
import InputMaskCEP from '../../components/Input/inputMaskCEP'
import { useRouter } from 'next/router'
import Select from '../../components/Input/select'

import {getAddressByCEP} from '../../utils/getAddressByCEP'
import {getBairrosByIBGE} from '../../utils/getBairrosByIBGE'
import {checkAge} from '../../utils/checkAge'
import {CPFValidation} from '../../utils/CPFValidation'
import {sendSMS} from '../../utils/sendSMS'
import {sendEmailCV} from '../../utils/sendEmailCV'
import { uploadFile } from '../../utils/uploadFile'
import { checkIfFileExists } from '../../utils/checkIfFileExists' 
import { removeFile } from '../../utils/removeFile'
import { SpinnerCircularFixed } from 'spinners-react';
import InvisibleCheck from '../../components/Input/InvisibleCheck';


  interface SignInFormData {
    email: string;
    nome: string;
    celular: string;
  } 


  const  Cadastro: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const router = useRouter()

    var ContratarStoreRead = ContratarStore.useState(s => s)
    const [sendMessage, setSendMessage] = useState("")
    const [sendMessageStrong,setSendMessageStrong] = useState("")
    const [loadingUploadIdentificacao,setLoadingUploadIdentificacao] = useState(false)
    const [loadingUploadResidencia,setLoadingUploadResidencia] = useState(false)
    const [fileNameUploadIdentificacao, setFileNameUploadIdentificacao] = useState([])
    const [fileNameUploadResidencia, setFileNameUploadResidencia] = useState([])



  
  useEffect(()=>{
    //localStorage.setItem('Intermedicina@ContratarStore', JSON.stringify(ContratarStoreRead));
  },[ContratarStoreRead])


  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])


    function HandleOnSendSMS(){
       sendSMS(ContratarStoreRead.tel,ContratarStoreRead.cv)
       setSendMessage("Código enviado por sms para:")
       setSendMessageStrong(ContratarStoreRead.tel)
    }

    function HandleOnSendEmail(){
      sendEmailCV(ContratarStoreRead.email,ContratarStoreRead.cv,ContratarStoreRead.nome)
      setSendMessage("Código enviado por e-mail para:")
      setSendMessageStrong(ContratarStoreRead.email)
   }

    function onChangeDateNasc(){
      checkAge(formRef.current.getFieldValue("datanasc"))
    }

    function onChangeCPF(){
      CPFValidation(formRef.current.getFieldValue("cpf"))
    }

    function reduceName(varString){
      if (varString.length > 26){
        return `${varString.substr(0,22)}...`
      }
      else{
        return `${varString}` 
      }
    }
   
    //* UPLOAD IDENTIFICACAO - INICIO
    function handleClickIdentificacao(){
      const uploadButton = formRef.current.getFieldRef("uploadIdentificacao")//*
      uploadButton.click()
    }

    function removeFileIdentificacao(filename){
      var newArr=[]
      ContratarStoreRead.fileNameUploadIdentificacao.map(s => {
        if ( s != filename) { 
          newArr.push(s) 
        }
      })
    
      ContratarStore.update(s => {
        s.fileNameUploadIdentificacao = newArr
      })

      formRef.current.setFieldValue("anexoIdentificacao",String(newArr))
      removeFile(filename) 
    }

    const handleUploadIdentificacao = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {}
      else{
        setLoadingUploadIdentificacao(true) //*
        uploadFile(e).then(result => {
          setLoadingUploadIdentificacao(false) //*
            var newArr=[]
            ContratarStoreRead.fileNameUploadIdentificacao.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result)
            }
            ContratarStore.update(s => {
              s.fileNameUploadIdentificacao = newArr
            })
            formRef.current.setFieldValue("anexoIdentificacao",String(newArr))

          checkIfFileExists(result).then(result => {
              if (result == false){
                ContratarStore.update(s => {
                  s.fileNameUploadIdentificacao = []
                })

                formRef.current.setFieldValue("anexoIdentificacao","")
                alert("Erro ao fazer envio do arquivo, tente novamente.")
              }
          })
        })
      }
    }, [ContratarStoreRead.fileNameUploadIdentificacao]);

   //* UPLOAD IDENTIFICACAO - FIM



    //* UPLOAD RESIDENCIA - INICIO
    function handleClickResidencia(){
      const uploadButton = formRef.current.getFieldRef("uploadResidencia")//*
      uploadButton.click()
    }

    function removeFileResidencia(filename){
      var newArr=[]
      ContratarStoreRead.fileNameUploadResidencia.map(s => {
        if ( s != filename) { 
          newArr.push(s) 
        }
      })
    
      ContratarStore.update(s => {
        s.fileNameUploadResidencia= newArr
      })
      formRef.current.setFieldValue("anexoResidencia",String(newArr))
      removeFile(filename) 
    }

    const handleUploadResidencia = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {}
      else{
        setLoadingUploadResidencia(true) //*
        uploadFile(e).then(result => {
          setLoadingUploadResidencia(false) //*
            var newArr=[]
            ContratarStoreRead.fileNameUploadResidencia.map(s => newArr.push(s))
            if(result != undefined && result != "" ){
              newArr.push(result)
            }
            ContratarStore.update(s => {
              s.fileNameUploadResidencia = newArr
            })
            formRef.current.setFieldValue("anexoResidencia",String(newArr))

          checkIfFileExists(result).then(result => {
              if (result == false){
                ContratarStore.update(s => {
                  s.fileNameUploadResidencia= []
                })

                formRef.current.setFieldValue("anexoResidencia","")
                alert("Erro ao fazer envio do arquivo, tente novamente.")
              }
          })
        })
      }
    }, [ContratarStoreRead.fileNameUploadResidencia]);

   //* UPLOAD RESIDENCIA - FIM

    useEffect(()=>{
      formRef.current.setFieldValue("datanasc",ContratarStoreRead.datanasc)
    },[ContratarStoreRead.datanasc])

    useEffect(()=>{
      formRef.current.setFieldValue("cpf",ContratarStoreRead.cpf)
    },[ContratarStoreRead.cpf])

    useEffect(()=>{
      formRef.current.setFieldValue("nome",ContratarStoreRead.nome)
      formRef.current.setFieldValue("celular",ContratarStoreRead.tel)
      formRef.current.setFieldValue("email",ContratarStoreRead.email)
    },[ContratarStoreRead.nome])

    useEffect(()=>{ 
      formRef.current.setFieldValue('cidade', ContratarStoreRead.endereco.cidade);
      formRef.current.setFieldValue('rua', ContratarStoreRead.endereco.rua);
      formRef.current.setFieldValue('estado', ContratarStoreRead.endereco.estado);
      
      if(ContratarStoreRead.endereco.ibge.length > 4){
        getBairrosByIBGE(ContratarStoreRead.endereco.ibge)
        }
    },[ContratarStoreRead.endereco])

    

 

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
            datanasc: Yup.string().required('*É necessário preechimento'),
            cpf: Yup.string().required('*É necessário preechimento'),
            estadocivil: Yup.string().required('*É necessário preechimento'),
            genero: Yup.string().required('*É necessário preechimento'),
            cep: Yup.string().required('*É necessário preechimento'),
            rua: Yup.string().required('*É@ necessário preechimento'),
            numero: Yup.string().required('*É necessário preechimento'),
            bairro: Yup.string().required('*É necessário preechimento'),
            cidade: Yup.string().required('*É necessário preechimento'),

            estado: Yup.string().required('*É necessário preechimento'),

            validacao: Yup.string().required('*Código de verificação inválido'),
            politicaprivacidade: Yup.string().required('*É necessário aceitar os termos de uso e política de privacidade'),

            anexoResidencia: Yup.string().required("*É necessario anexar ao menos um arquivo."),
            anexoIdentificacao: Yup.string().required("*É necessario anexar ao menos um arquivo.")
          });
  
          await schema.validate(data, {
            abortEarly: false,
          });
  
          //await signIn({ email: data.email, password: data.password });
  
          router.push('/contratar/pagamento');
  
        //  addToast({
          //  type: 'success',
            //title: 'Autenticado com sucesso!',
          //});
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
  
            formRef.current?.setErrors(errors);
  
            return;
          }
  
         // addToast({
          //  type: 'error',
          //  title: 'Erro na autenticação',
          //  description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
         // });
        }
      },
      [ ],
    );
  

    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/inicio"/> 
    <HeaderContratar page={2}/>
    <Container> 
      <BoxAssinatura>

        <ContratoSelecionadoAlt> 
          <div className="topo">  
            <span className="textoCinza">ASSINATURA SELECIONADA</span>
            <span className="textoAzul">Intermedicina <strong>{ContratarStoreRead.contratoSelecionadoTitulo}</strong> <Image src="/assets/checkverde.svg" width={15} height={15}/> </span> 
          </div>
        </ContratoSelecionadoAlt>

        <Separator><div></div></Separator> 

        <Form ref={formRef} onSubmit={handleSubmit}>  

        <span className="informe"><strong>DADOS PESSOAIS</strong></span>

              <Input name="nome" legend="NOME COMPLETO"  small disabled />
              <Row>
                <Column mr={4} size={60}>
                  <Input name="celular"  legend="CELULAR" small disabled  />
                </Column> 

                <Column  ml={4}>
                  <Input name="email"  legend="EMAIL" small disabled   /> 
                </Column> 
              </Row>

              <Row>
                <Column mr={4} >
                  <InputMaskDate name="datanasc" onBlur={onChangeDateNasc} legend="DATA DE NASCIMENTO" small />
                </Column> 

                <Column  ml={4}>
                  <InputMaskCPF name="cpf"  legend="CPF" onBlur={onChangeCPF}  small   /> 
                </Column> 
              </Row>

              <Row>
                <Column mr={4} size={68}>
                  <Select name="estadocivil" defaultValue="" legend="ESTADO CIVIL" small>
                  <option value="" disabled>Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Separado">Separado</option>
                  <option value="Viúvo">Viúvo</option>
                  </Select>
                </Column> 

                <Column  ml={4}>
                  <Select name="genero" defaultValue="" legend="GÊNERO" small> 
                  <option value="" disabled>Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  </Select>
                </Column> 
              </Row> 

              <Row> 
                <TextoLegenda>
                  <span>Cópia do seu <strong>documento pessoal</strong><br/>
                  pode ser RG (frete e verso) ou CNH.</span>
               </TextoLegenda> 
              </Row>

              <Row> 
              <Column mr={4}>

              <File name="uploadIdentificacao" onInput={handleUploadIdentificacao}/>
              { !loadingUploadIdentificacao 
              ? 
                <AnexoButton onClick={handleClickIdentificacao}>
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

                { ContratarStoreRead.fileNameUploadIdentificacao && ContratarStoreRead.fileNameUploadIdentificacao.map( filename => 
                  <Chips key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileIdentificacao(filename)}} src="/assets/remove.svg" width={12} height={12}/></Chips> 
                )}
                </Column>  
              </Row>

              <InvisibleCheck  name="anexoIdentificacao"></InvisibleCheck> 

               <Row mb={16} mt={16}><Separator><div></div></Separator></Row>
 
                
               <span className="informe"><strong>ENDEREÇO</strong></span>

               <InputMaskCEP name="cep" onChange={OnChangeCEP} legend="CEP" small />

               <Input name="rua"  legend="RUA" small   />

               <Row>
                <Column mr={4} size={50}>
                  <Input name="numero"  legend="NÚMERO" small   />
                </Column> 

                <Column  ml={4} mr={4}>
                  <Input name="complemento"  legend="COMPLEMENTO" small   /> 
                </Column> 

                <Column  ml={4}>
                <Select name="bairro"  legend="BAIRRO" small> 
                {ContratarStoreRead.bairros.map(bairro=>
                   <option value={bairro.codigo}>{bairro.nome}</option> 
                  )}
                 
                  </Select> 
                </Column> 
              </Row>

              <Row>
                <Column mr={4} >
                  <Input name="cidade"  legend="CIDADE" small />
                </Column> 
  
                <Column  ml={4}>
                  <Input name="estado"  legend="ESTADO" small   /> 
                </Column> 
              </Row>


              <Row> 
                <TextoLegenda>
                  Cópia do seu comprovante de residência,<br/>
                  luz, água, telefone, banco ou similares.
               </TextoLegenda> 
              </Row>

              <Row> 
              <Column mr={4}>
              <File name="uploadResidencia" onInput={handleUploadResidencia}/>
              { !loadingUploadResidencia
              ? 
                <AnexoButton onClick={handleClickResidencia}>
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
              { ContratarStoreRead.fileNameUploadResidencia && ContratarStoreRead.fileNameUploadResidencia.map( filename => 
                  <Chips key={filename}> <span>{reduceName(filename)}</span> <Image onClick={()=>{removeFileResidencia(filename)}} src="/assets/remove.svg" width={12} height={12}/></Chips> 
                )}</Column>               
              </Row>

              <InvisibleCheck  name="anexoResidencia"></InvisibleCheck> 


              <Row mb={16} mt={16}><Separator><div></div></Separator></Row>

              
              <span className="informe"><strong>CÓDIGO ASSINATURA DIGITAL</strong><br/>Como você prefere receber o código?</span> 
              <Row mt={8}>
                 <SendCode>
                <BlueButton onClick={HandleOnSendSMS}><span>POR </span><strong>SMS</strong></BlueButton>
                <BlueButton onClick={HandleOnSendEmail}><span>POR </span><strong>E-MAIL</strong></BlueButton>
                </SendCode>
              </Row>

              <Row>
                <CenteredText>
                  { sendMessage &&
                    <CodigoEnviado>
                    {sendMessage}<br/>
                    <strong>{sendMessageStrong}</strong>
                  </CodigoEnviado>
                  }
                  
                </CenteredText>
              </Row>

              <Row>
                <CenteredText>
                  <Column size={60}>
                    <Input name="cv" small legend="Código de Validação" /> 
                  </Column>
                  <InvisibleCheck  name="validacao"></InvisibleCheck> 

                </CenteredText>
              </Row>
             

              <TermoDeUso>
                <span>
                TERMO DE USO E POLÍTICA DE PRIVACIDADE – CONTRATO INTERMEDICINA INDIVIDUAL
                Pelo presente instrumento particular, que representa este contrato entre as seguintes partes, de um lado, INTERMEDICINA MULTI PRIVILÉGIOS LTDA. EPP, com sede na Rua das Azaléias, 275, sala 1, Jardim da Montanha, Santa Teresa-ES, CEP: 29650-000, inscrita no CNPJ sob o nº 03.742.085/0001-71, denominado doravante CONTRATADA, e de outro lado o proponente do presente contrato, denominado CONTRATANTE. Por meio destes Termos de Uso e Política de Privacidade, apresenta as condições essenciais para o uso dos serviços oferecidos pela contratada.
                
                Pelo presente instrumento particular, que representa este contrato entre as seguintes partes, de um lado, INTERMEDICINA MULTI PRIVILÉGIOS LTDA. EPP, com sede na Rua das Azaléias, 275, sala 1, Jardim da Montanha, Santa Teresa-ES, CEP: 29650-000, inscrita no CNPJ sob o nº 03.742.085/0001-71, denominado doravante CONTRATADA, e de outro lado o proponente do presente contrato, denominado CONTRATANTE. Por meio destes Termos de Uso e Política de Privacidade, apresenta as condições essenciais para o uso dos serviços oferecidos pela contratada.
                </span>
              </TermoDeUso>

              <Row>  
                  <Column > 
                    <TextoLegenda> 
                      <span><strong>Li</strong> e <strong>Concordo</strong> com os Termos de Uso<br/>
                      e Política de Privacidade.</span>
                    </TextoLegenda>  
                  </Column> 
              </Row>
              <InvisibleCheck  name="politicaprivacidade"></InvisibleCheck> 



              <button className="button" type="submit">Continuar<Image src="/assets/arrowRight.svg" width={19} height={13}/></button> 
        </Form>

      </BoxAssinatura> 

      <Footer/>

    </Container>
    </> )
    
    } 
    export default Cadastro