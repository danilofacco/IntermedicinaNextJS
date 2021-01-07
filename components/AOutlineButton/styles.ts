import styled from '@emotion/styled';
import { shade } from 'polished';

export const Container = styled.a`
  border: 1px solid #138FCE;
  box-sizing: border-box;
  border-radius: 5px;
  padding:16px;
  transition: border-color 0.2s;
  font-size: 14px;
  line-height: 17px;  
  text-align: center; 
  color: #138FCE;

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
