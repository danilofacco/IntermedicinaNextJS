import styled from '@emotion/styled';
import { shade } from 'polished';



export const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;  
margin-top:16px;

.bloco{
  display:flex;
  padding:16px;

  .item{
    width:25%;
    padding:4px; 

    .linha{
      width:100%;
      height: 3px;
      background: #E5E5E5;
      margin-bottom:3px;
    }

    span{ 
      font-size: 10px;
      line-height: 12px;
      display: flex;
      align-items: center; 
      color: #C8CDD1;
    }
  }

  .selected{
    .linha{background: #34AF23;}
    span{color: #34AF23;}
  }

  .azul{
    .linha{background: #138FCE;}
    span{color: #138FCE;}
  }

  .laranja{
    .linha{background: #F9A000;}
    span{color: #F9A000;}
  }
}


`;

 