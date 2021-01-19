import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';  

import { useField } from '@unform/core'; 
import {isIOS} from "react-device-detect"
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  small?:boolean; 
  name: string;
  legend?: string;
  disabled?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ name, small=false, disabled=false, legend,icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex flex-col w-full mt-2 montserrat-regular text-sm">
    <fieldset className={`${small ? 'px-2 py-1.5' : 'px-2 p-4'} bg-white border rounded-md border-azul ${!!error && 'border-vermelho'}  ${disabled && 'border-cinza-claro'} ${isFilled && 'border-azul'} ${isFocused && 'border-azul'}`} >
      {Icon && <Icon size={20} />}      
      {!!legend && <legend className={`px-1 text-xxs text-azul  ${disabled && 'text-cinza-claro'} ${!!error && 'text-vermelho'}  ${isFilled && ' text-azul'} ${isFocused && ' text-azul'}`}>{legend}</legend> }
      <input
          className={`w-full ${isIOS ? 'text-input': 'text-xs'} bg-white placeholder-azul text-azul  ${!!error ? 'placeholder-vermelho text-vermelho':''} ${isFilled ? 'placeholder-azul text-azul':''} ${isFocused ? 'placeholder-azul text-azul':''} ${disabled ? 'text-cinza-claro ':''}`}
          onFocus={clearError}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          disabled={disabled}
          ref={inputRef}
          {...rest}
      /> 
      
    </fieldset> 
    {!!error && <span className={`${!!error && 'flex mt-1 text-left text-xxs text-vermelho'}`}>{error }</span>}
    </div>
  );
};

export default Input;
