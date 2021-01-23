 
import React, { useEffect } from 'react'
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image'   
import { useRouter } from 'next/router'

const NaoAutorizado: React.FC = () => {

  const router = useRouter()

  useEffect(()=>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },[]) 
  
    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/pagamento/cartao"/> 
    <HeaderContratar page={4} cor="laranja"/>
    <div className="flex flex-col items-center p-4">
      <Image src="/assets/i_laranja.svg" width={44} height={44}/>
      <span className="montserrat-bold text-laranja mb-6 text-center text-lg">Transação<br/>
      não autorizada</span>
      <span className="text-xs text-center text-gray-500 uppercase">
      Não foi possÍvel realizar o pagamento<br/>
      utilizando os dados informados.<br/><br/>
      <strong>Por favor verifique e tente novamente.</strong>

      </span> 
      
        <button type="button" onClick={()=>router.push('/contratar/pagamento/cartao')} className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"><span><strong>Tentar</strong> Novamente</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button>
  
      <Footer/>

      </div>
  
 
    </>   );
};
export default NaoAutorizado;
