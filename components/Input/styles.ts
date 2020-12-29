import styled  from '@emotion/styled';
import {css} from 'styled-components'; 

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  small:boolean;
  isDisabled:boolean;
}

export const ExternalContainer = styled.div `
width: 100%;
margin-top:16px;  
display:flex;
flex-direction:column;
  .error{
    flex:1;
    margin-top:6px;
    font-weight: 400;
    text-align:left;  
    font-size: 10px;
    line-height: 12px; 
    color: #E2202C; 
  }
`

export const Container = styled.fieldset<ContainerProps>`
  background: #FFFFFF; 

  border: 1px solid #138FCE;
  box-sizing: border-box;
  border-radius: 5px; 
  width: 100%; 
  padding:16px;  

select{
  width:100%;
  outline:none;
  border:none;
 
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23138FCE'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
  background-size: 8px;
  background-position: calc(100% - 5px) center;
  background-repeat: no-repeat;

  font-weight: 400;
    font-size: 16px;
    line-height: 17px;  
    color: #138FCE;
    outline:0px;
}

  ${props =>
    props.small &&
    css`
       padding:8px ;  
    `}
 
 

  display: flex;
  align-items: center;

  legend{ 
    padding:0 3px;
    font-weight: 400;
    font-size: 10px;
    line-height: 10px;
    color:#138FCE; 
  }

  & + div {
    margin-top: 16px;
  }

  ${props =>
    props.isErrored &&
    css`
    border: 1px solid #E2202C;
    legend, input,select, input::placeholder ,:-ms-input-placeholder ,::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color:#E2202C;
    } 
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #138FCE;
      border: 1px solid #138FCE; 
    `}

  ${props =>
    props.isFilled &&
    css`
      border: 1px solid #138FCE; 
      color: #138FCE;
      legend, input, input::placeholder{
      color:#138FCE;
    } 
    `}


    ${props =>
    props.isDisabled &&
    css`
      border: 1px solid #838383;
      color:#838383;
      input,select{
        color:#838383;
        background:#fff;
        outline:0px;
      }
      legend{
        color:#838383;
      }

      ::placeholder ,:-ms-input-placeholder ,::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #838383 !important;
        opacity: 1; /* Firefox */
      }

    `}


  input , select{
    &:-webkit-autofill {
      box-shadow: 0 0 0 30px #fff inset;
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: #138FCE !important;
    } 
 
    &::placeholder {
      
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;  
    color: #138FCE;
    outline:0px;
    }
  }

  svg {
    margin-right: 16px;
  }

 
`;

 
