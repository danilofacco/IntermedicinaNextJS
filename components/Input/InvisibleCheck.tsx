import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container,ExternalContainer,ContainerInvisible} from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string; 
}

const InvisibleCheck: React.FC<Props> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, 
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerInvisible> 
      <input
        style={{display:"none"}}
        type="text" 
        ref={inputRef}
        {...rest}
      /> 
      
    {!!error && <span className="error">{error }</span>}
     
    </ContainerInvisible>
  );
};

export default InvisibleCheck;
