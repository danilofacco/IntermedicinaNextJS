import Head from 'next/head' 
import React, { useEffect } from 'react' 
import ButtonContract from '../../components/ButtonContract'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'
import TitleWithLogo from '../../components/TitleWithLogo'
import {CenteredText, Container,Information} from '../../styles/_styles'
import Image from 'next/image'

import Carousel from 'react-elastic-carousel'
import { ContratarStore } from '../../store/contratar'

const Index: React.FC = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])

  return (
    <>
    <HeaderVoltarAzul/>
    <Container>  
      <TitleWithLogo>Assinatura</TitleWithLogo>
     

      <CenteredText> 
         
         <div className="carousel">
         <Carousel itemsToShow={1} showArrows={false}>
           <div>
              <span>Vamos <strong>Acompanhar, Intermediar e Facilitar</strong><br/>
              consultas com especialistas, exames e
              <br/>procedimentos com valores acessíveis!</span><br/>
              <a href="#">Seja Intermedicina!</a>
         </div>

         <div>
              <span>Intermedicina é: <strong>Uso imediato!</strong><br/>
              Você já pode marcar a sua consulta com especialista.</span> 
              <br/>
              <a href="#">Seja Intermedicina!</a>
         </div>

         <div>
              <span>Intermedicina é: <strong>Sem carência!</strong><br/>
              Não precisa esperar para marcar as suas consultas e exames.</span> 
              <br/>
              <a href="#">Seja Intermedicina!</a>
         </div>

         <div>
              <span>Intermedicina é: <strong>Sem fidelização!</strong><br/>
              Cancele quando quiser, queremos você aqui feliz conosco!.</span> 
              <br/>
              <a href="#">Seja Intermedicina!</a>
         </div>
         </Carousel>
         </div>
         

      
 
          <ButtonContract
          id="familia"
          code={4}
          title="Família"
          subtitle="TITULAR + 4 DEPENDENTES*"
          price="85"
          oldPrice="109,00"
          link="https://www.intermedicina.com.br/wp-json/wp/v2/pages/51087"
          description="São Médicos, Dentistas,
          Exames, Cirurgias,
          Laboratórios outros " 
          featured > <Image src="/assets/family.svg" width={16} height={15} /> </ButtonContract>

          <ButtonContract
          id="individual"
          code={7}
          title="Individual"
          subtitle="SOMENTE TITULAR"
          price="49"
          oldPrice="69,00"
          link="https://www.intermedicina.com.br/wp-json/wp/v2/pages/51095"
          description="São Médicos, Dentistas,
          Exames, Cirurgias,
          Laboratórios outros " 
          > <Image src="/assets/individual.svg" width={12} height={15} /> </ButtonContract>

          <ButtonContract
          id="odontomais" 
          code={5}
          title="OdontoMais"
          subtitle="SOMENTE TITULAR"
          price="40"
          oldPrice="59,00"
          link="https://www.intermedicina.com.br/wp-json/wp/v2/pages/51090"
          description="São Médicos, Dentistas,
          Exames, Cirurgias,
          Laboratórios outros " 
          > <Image src="/assets/odontomais.svg" width={16} height={16} /> </ButtonContract>


          <span className="formasdepagamento">FORMAS DE PAGAMENTO</span>
          
          <Image src="/assets/pagamentos.svg" width={230} height={23}></Image>
          
          <div className="separator"></div>
          
          <div className="empresarial"><span>Empresarial</span><a href="/">SOLICITAR PROPOSTA</a></div>
          
          <a className ="jatenho" href="/">Ja tenho! <strong>ACESSAR</strong> </a>

      </CenteredText> 
    </Container>
    <Footer/>
    <Information>*CARACTERIZA DEPENDENTE AQUELE QUE RESIDE JUNTO AO TITULAR.
A INTERMEDICINA NÃO OFERECE INTERMEDIAÇÃO OU CONTRATAÇÃO DE PLANO PRIVADO DE ASSISTÊNCIA MÉDICO-HOSPITALAR, BEM COMO QUALQUER OUTRA MODALIDADE DE ASSISTÊNCIA À SAÚDE
DE QUE TRATA A LEI FEDERAL Nº 9.656/98.
OS SERVIÇOS E BENEFÍCIOS INTERMEDIADOS PELA PLATAFORMA INTERMEDICINA NÃO ESTÃO SUJEITOS, PORTANTO, AO ROL DE PROCEDIMENTOS E EVENTOS EM SAÚDE OU QUALQUER OUTRA REGULAÇÃO ATUALMENTE ESTABELECIDA PELA AGÊNCIA NACIONAL DE SAÚDE SUPLEMENTAR (ANS).</Information>
    </>
  )
}

export default Index
