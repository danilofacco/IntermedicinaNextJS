import styled from '@emotion/styled'; 

export const ButtonGreen = styled.div` 
    background: #34AF23;
    backdrop-filter: blur(4px); 
    border-radius: 5px;
    margin-top:32px;
    margin-bottom:16px;
    display:flex;
    justify-content:space-between;
    align-items:center; 
    padding:16px; 

    .texto{  
    font-weight: 400;
    font-size: 14px;
    line-height: 17px; 
    color: #FFFFFF;
    }

    svg{
        color: #FFFFFF;
    }
    
`



export const CenteredText = styled.div`
display:flex;
flex-direction:column;
width:100%; 
max-width:800px;  
text-align: center; 
justify-content:center;
align-items:center;

span{  
    font-weight: 400;
    font-size: 12px;
    line-height: 18px; 
    color: #838383;
}

a{  
    font-weight: 500;
    font-size: 12px;
    line-height: 18px; 
    color: #138FCE;

}
` 

export const Main = styled.div`
display:flex;
flex-direction:column;
align-items:center;

.container{
    display:flex; 
    flex-direction:column; 
    width:100%; 
    padding:24px;

    .preheader{ 
    width:100%;
    display:flex;
    flex-direction:column; 
    align-items:flex-start; 

    span{
        font-family: "Raleway Italic"; 
        font-size: 15px;
        line-height: 18px;
        color: #838383;
        }

        strong{
        font-family: "Raleway Bold Italic";  
        font-size: 15px;
        line-height: 18px;
        color: #838383;
        }
    }
}
`

export const Divider = styled.div` 
width: 100%;
height: 8px; 
background: rgba(19, 143, 206, 0.66);
`
