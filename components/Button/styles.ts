import styled from '@emotion/styled';
import { shade } from 'polished';

export const Container = styled.button`
  background: #309AD0;

  border-radius: 10px;
  border: 0;

  color: #fff;
  padding: 0 16px;

  height: 56px;
  width: 100%;

  font-family:"Montserrat Medium";

  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#309AD0')};
  }
`;
