import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';  

import { useField } from '@unform/core';
import InputMask from "react-input-mask"; 
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  small?:boolean;
  mask?:string;
  maskplaceholder?:string;
  name: string;
  legend?: string;
  disabled?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ name, mask="", maskplaceholder="", small=false, disabled=false, legend,icon: Icon, ...rest }) => {
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
    <div className="flex flex-col w-full mt-4 montserrat-regular text-sm">
    <fieldset className={`${small ? 'p-2' : 'p-4'} bg-white border rounded-md border-azul ${!!error && 'border-vermelho'}  ${disabled && 'border-cinza-claro'} ${isFilled && 'border-azul'} ${isFocused && 'border-azul'}`} >
      {Icon && <Icon size={20} />}      
      {!!legend && <legend className={`px-1 text-xxs text-azul  ${disabled && 'text-cinza-claro'} ${!!error && 'text-vermelho'}  ${isFilled && ' text-azul'} ${isFocused && ' text-azul'}`}>{legend}</legend> }
      <InputMask
         className={`w-full placeholder-azul text-azul  ${disabled && 'text-cinza-claro bg-white'} ${!!error && 'placeholder-vermelho text-vermelho'}  ${isFilled && 'placeholder-azul text-azul'} ${isFocused && 'placeholder-azul text-azul'}`}
         mask={mask} maskplaceholder={maskplaceholder} 
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
