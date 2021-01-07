import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container,Left,Right } from './styles';
import {ContratarStore} from '../../store/contratar'

interface ButtonProps{
  title:string;
  subtitle:string;
  price:string;
  oldPrice:string;
  link:string;
  description:string; 
  featured?:boolean;
  id:string;
  code:number;
}

const ButtonContract: React.FC<ButtonProps> = ({ code,id,title,subtitle,price,oldPrice,link,description,featured=false, children , ...rest }) => {
  const router = useRouter()
  const ContratarStoreRead = ContratarStore.useState( s => s )

  function SelecionarContrato(id,title,price,code,link){

    ContratarStore.update(s => {
      s.contratoSelecionado = id;
      s.CodigoTipoContrato = code;
      s.LinkPoliticaDePrivacidade = link;
      s.contratoSelecionadoTitulo = title;
      s.precoContrato = price;
    })
 

    router.push('/contratar/inicio')
 }
 
  return (
    <Container  onClick={()=>SelecionarContrato(id,title,price,code,link)} {...rest}> 
      <Left> 
        <div className="two">
          {children}
          <span className="title"> {title}</span>
        </div>

        <span className="subtitle"> {subtitle}</span>
        <span className="description"> {description}</span> 
      </Left>
      
      <Right>
       {featured ? <div className="recomendado">
          <strong style={{fontWeight: "bold"}}>O MAIS COMPLETO! </strong></div> :""}
        <span className="rs">R$</span>
        <div className="price">
          <span className="before">{price}</span><span className="after">,00/mês</span>
        </div>
        <span className="oldprice">R$ {oldPrice}</span>
        <a href="#">ASSINAR</a>
      </Right>
      
    </Container>
  );
};

export default ButtonContract;
