import styled from '@emotion/styled';
import { shade } from 'polished';



export const Container = styled.div`
display:flex;
justify-content:space-between; 
background: rgba(229, 229, 229, 0.2);
border: 1px solid rgba(131, 131, 131, 0.3);
box-sizing: border-box;
border-radius: 5px; 
margin-top:16px; 
width:100%;  
`;


export const Left = styled.div`
display:flex;
flex-direction:column;
padding:16px;
align-items:space-between;
justify-content:space-between;
flex:1;
height:100%;
text-align: left;

.two{
  display:flex;
  align-items:center;

  svg{
    color:#E2202C;
    
  }
  .title{ 
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;  
    color: #138FCE;
    margin-left:6px;
  }
  .subtitle{ 
    font-size: 11px;
    line-height: 13px;
    color: #838383;
    margin-top:4px;
    padding:10px;
  }

  .description{ 
    font-weight: 400;
    font-size: 9px;
    line-height: 9px;  
    color: #838383; 
  } 
} 
`;


export const Right = styled.div`
display:flex;
flex-direction:column;
align-items:start; 
padding:16px;  
position: relative; 

.rs{  
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  text-align: center; 
  color: #138FCE;

}
.price{ 
  .before{ 
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center; 
    color: #138FCE;
  }

  .after{ 
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center; 
    color: #138FCE;
  }
}
.oldprice{ 
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  text-decoration-line: line-through; 
  color: #838383;
}

a{
  color:#fff !important ;
  background: #34AF23;
  border-radius: 1px;
  padding:6px 15px;
  font-size: 9px;
  line-height: 11px;  
  text-align: center;
}

.recomendado{
  position: absolute;
  z-index: 1;
   margin-top:-30px; 
   left:2px;
   min-width:100px;

   background: #FFA000;
  border-radius: 2px;
  padding: 2px 4px;

  font-size: 9px;
  line-height: 11px;
  /* identical to box height */

  text-align: center;

  color: #FFFFFF;
 
}

.recomendado:after {
     content: '';
    position: absolute;
    left: 8px;
    top:12px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFA000;
    border-radius:8px; 

}

`;
