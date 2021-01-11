import styled from '@emotion/styled'; 

export const TermoDeUso = styled.div`
background: #EBEDEF;
border-radius: 5px;
padding:16px;
margin-top:16px;
height: 200px;

overflow: scroll;

span{
    font-size: 11px;
    line-height: 13px; 
    color: #000000;
}
`



export const BlueButton = styled.a`
background: #138FCE;
border-radius: 5px;
display:flex;
padding:8px;
margin:0 8px;

font-size: 9px;
line-height: 11px;  
text-align: center; 
color: #FFFFFF;
`
export const CodigoEnviado = styled.div`
width: 215px; 
padding:8px;

margin-top:16px;

font-size: 12px;
line-height: 15px;
text-align: center; 
color: #FFFFFF;


background: #34AF23;
border-radius: 5px;

`
export const SendCode = styled.div`
display:flex;
width:100%;
justify-content:center;

strong{
    margin-left:3px;
}
`

export const Container = styled.div`
display:flex;
flex-direction:column;
width:100%; 

align-items:center;
padding:0 16px;

.texto{
    font-size: 11px;
line-height: 13px;
text-align: center;
text-transform: uppercase;

color: #838383;
}

.button{
            margin-top:16px;
            margin-bottom:8px; 
            display:flex;
            justify-content:space-between;
            align-items:center;
            background: #34AF23;
            border-radius: 5px;
            border:none;

            font-weight: 400;
            font-size: 14px;
            line-height: 17px;

            color: #FFFFFF;
            padding:18px;
            width:100%;
        }

.naoAutorizado{
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-align: center; 
    color: #F9A000;
    margin-bottom:26px;

}

.Titulo{
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    text-align: center; 
    color: #838383; 
    margin-top:16px;

}
`

export const ErrorText = styled.span`
font-size: 10px;
line-height: 12px;
width:100%;
color: #E2202C;`

export const BoxAssinatura = styled.div`  
margin-top:8px;
margin-bottom:16px;
 
box-shadow:0px 0px 0px 1px #DADADA inset;

background: rgba(229, 229, 229, 0.2); 
border-radius: 5px;

.picpayInformation{
    margin:8px;
    font-size: 12px;
    line-height: 15px;
    color: #979797;

    strong{
        font-size: 12px;
        line-height: 15px;
        text-transform: uppercase; 
        color: #34AF23;
    }
}
    .informe{
        display:flex;
        flex-direction:column;
        justify-content:center;
        font-size: 12px;
        line-height: 12px;  
        display: flex;
        align-items: center; 
        color: #838383;
        width:100%;
        text-align:center;
        margin-top:8px;
        margin-bottom:4px

    }


    .informe_left{
        display:flex;
        flex-direction:column; 
        font-size: 12px;
        line-height: 12px;  
        display: flex; 
        color: #838383;
        width:100%; 
        margin-top:16px;
        margin-bottom:-8px;
        padding-left:4px;
    } 
    form{
        padding:8px;

        .button{
            margin-top:16px;
            margin-bottom:8px; 
            display:flex;
            justify-content:space-between;
            align-items:center;
            background: #34AF23;
            border-radius: 5px;
            border:none;

            font-weight: 400;
            font-size: 14px;
            line-height: 17px;

            color: #FFFFFF;
            padding:18px;
            width:100%;
        }
    }

`
export const Separator = styled.div`
display:flex;
justify-content:center;
width: 100%;
padding:0 8px ;

    div{
        width: 100%;
        height: 1px; 
        background: #E5E5E5;
    } 
`

export const TextoLegenda = styled.span`
 
font-size: 12px;
line-height: 15px;
display: flex;  
color: #838383;
padding-top:8px;
padding-bottom:8px;
width:100%;
svg{
    margin-right:8px;
    width:12px;
    height:12px;
}
`

export const Chips = styled.a`
    background: rgba(131, 131, 131, 0.3);
    border-radius: 10px;
    
    border:none;

    font-size: 11px;
    line-height: 13px;
    text-align: center;

    color: #838383; 
    padding:8px; 
    display:flex;
    justify-content:space-between;
    align-items:center;
`
export const AnexoButton = styled.a`
    max-width:155px;
    border:none;
    font-weight: bold;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
    padding:8px; 
    display:flex;
    align-items:center;

    background: #FFA000;
    border-radius: 5px;

    svg{
        width:12px;
        height:12px;
        padding-right:4px;
    }
`

export const ContratoSelecionadoAlt = styled.div`
display:flex;
flex-direction:column;
flex:1;
width:100%;
padding:16px;

.textoCinza{

    font-family:"Montserrat Medium";
    font-size: 11px;
    line-height: 13px; 
    color: #838383;
    padding-bottom:4px;
}
.textoAzul{
 
    font-size: 14px;
    line-height: 17px;   
    color: #138FCE;  
    padding-bottom:8px;
}

.topo{
    display:flex;
    flex-direction:column;
    flex:1;
    width:100%;
}

.bottom{
    display:flex; 
    flex:1; 
    width:100%;
    justify-content:space-between;
    align-items:end; 

    .esquerda{
        display:flex;
        flex-direction:column;
        flex:1; 
    }
    .direita{ 
       padding-top:10px;
    }
}
 
`


export const ContratoSelecionado = styled.div`
display:flex;
flex:1;
width:100%;
margin-bottom:8px;

.left{
    width:22px;
    background: #34AF23;
    border-radius: 5px 0px 0px 5px;
}
.right{
    position:relative;
    background: #138FCE;
    border-radius: 0px 5px 5px 0px;
    margin-left:2px;
    padding:16px;

    display:flex;
    flex-direction:column;
    align-items:start;
    
    width:100%;

    .title{
        flex:1; 
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
        strong { 
            margin-right:4px;
        }

    }


    .subtitle{ 
        font-size: 11px;
        line-height: 13px; 
        color: #FFFFFF;
    }
    .absolute{
        position:absolute;
        margin-left:-30px;
        margin-top:8px;
    }

}
` 

export const TextoInformativoAbaixo = styled.span`
width:100%;
padding:8px 16px;

font-style: normal; 
font-family:"Montserrat Bold";
font-size: 8px;
line-height: 13px; 
text-transform: uppercase;
color: #838383;

`


export const CenteredText = styled.div`
display:flex;
flex-direction:column;
width:100%; 
max-width:800px;  
text-align: center; 
justify-content:center;
align-items:center;



.carousel{
width:100%;

    .rec{
        border:none;
        box-shadow:none;
    }
    .rec-dot{
        width:5px;
        height:5px;
        background:#DADADA;
        border:none;
        box-shadow:none;
    }

    .rec-dot_active{
        background:#138FCE;
        border:none;
        box-shadow:none;
    }
    
}

span{ 
    font-size: 12px;
    line-height: 18px; 
    color: #838383;
}

a{
    font-family:"Montserrat Medium";
    font-size: 12px;
    line-height: 18px; 
    color: #138FCE;

}

.formasdepagamento{
    
    font-size: 9px;
    line-height: 11px; 
    display: flex;
    align-items: center;
    text-align: center; 
    color: #838383;

    margin-top:16px;
    margin-bottom:8px;
}

.separator{ 
    width: 250px;
    height: 0px;  
    border: 0.5px solid #E5E5E5;
}
.empresarial{
    background: #FFFFFF;
    border: 1px solid rgba(131, 131, 131, 0.3);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 8px 16px;
    width:100%;
    display:flex;
    justify-content:space-between;

    margin:16px 0;

    span{
        font-family:"Montserrat Semi Bold";
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: #838383;

    }

    a{
        
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        text-decoration-line: underline; 
        color: #138FCE;

    } 
}

.jatenho{
     
        font-size: 13px;
        line-height: 16px;
        text-align: center;
        color: #838383;
        margin-bottom:20px;

        strong{
            font-family:"Montserrat Bold";
            font-size: 13px;
            line-height: 16px;
            text-align: center;
            color: #138FCE;
        }
    }
`
export const BoxConcluido = styled.div`
display:flex;
flex:1;
width:100%;
height:83vh;
background:#34AF23;
align-items:center;
flex-direction:column;
padding-top:32px;

strong{
        font-family:"Montserrat Bold";
    }

svg{
     
}

.titulo{ 
    font-family:"Montserrat Medium";
    font-size: 18px;
    line-height: 22px;  
    text-align: center; 
    color: #FFFFFF;

    margin-top:12px; 
}

.subtitulo{
    font-size: 14px;
line-height: 17px;
/* identical to box height */

text-align: center;

color: #FFFFFF;
}

.texto12{

 margin:0 32px;

margin-top:12px;
margin-bottom:48px;
font-size: 12px;
line-height: 15px;
text-align: center;

color: #FFFFFF;
}

.texto{
margin-top:12px;
font-family: "Raleway Italic"; 
font-size: 15px;
line-height: 18px;
text-align: center;
 
color: #FFFFFF;

strong{
    font-family: "Raleway Bold Italic"; 
    font-size: 15px;
    line-height: 18px;
}
}

button{
    margin-top:22px;
    margin-bottom:48px;
    padding:10px;
    background: #34AF23;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    font-family:"Montserrat Bold";
font-size: 12px;
line-height: 15px;
/* identical to box height */

text-align: center;

color: #FFFFFF;

} 
a{

    font-size: 11px;
    line-height: 13px;
    text-align: center; 
    color: #FFFFFF;

    margin-bottom:4px;
    svg{
        color: #FFFFFF;
    }
}

`
 