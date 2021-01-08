import styled from '@emotion/styled';
import { shade } from 'polished';

export const Container = styled.a`
   
  font-size: 14px;
  line-height: 17px;  
   

  span{
    font-size: 14px;
    line-height: 17px;  
    text-align: center; 
    color: #138FCE;
  }

  &:hover {
    border: 1px solid ${shade(0.2, '#138FCE')};
  }
`;
