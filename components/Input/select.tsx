import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container,ExternalContainer } from './styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  small?:boolean;
  name: string;
  legend?: string;
  disabled?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<Props> = ({ name, small=false, disabled=false, legend,icon: Icon, children,...rest }) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, error, clearError, registerField } = useField(name);

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
    <ExternalContainer>
    <Container isErrored={!!error} small={small} isDisabled={disabled} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}      
      {!!legend && <legend>{legend}</legend> }
      <select 
        onFocus={clearError}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        disabled={disabled}
        ref={inputRef}
        {...rest}
      > {children} </select>
      
    </Container> 
    {!!error && <span className="error">{error }</span>}
    </ExternalContainer>
  );
};

export default Select;
