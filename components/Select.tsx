import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiChevronDown } from 'react-icons/fi';
import { useField } from '@unform/core'; 

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  small?:boolean;
  name: string;
  legend?: string;
  disabled?: boolean;
}

const Select: React.FC<Props> = ({ name, small=false, disabled=false, legend, children,...rest }) => {
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
    <div className="flex flex-col w-full mt-4 montserrat-regular text-sm">
    <fieldset className={` flex justify-between ${small ? 'p-2' : 'p-4'} bg-white border rounded-md border-azul ${!!error && 'border-vermelho'}  ${disabled && 'border-cinza-claro'} ${isFilled && 'border-azul'} ${isFocused && 'border-azul'}`} >
    
      {!!legend && <legend className={`px-1 text-xxs text-azul  ${disabled && 'text-cinza-claro'} ${!!error && 'text-vermelho'}  ${isFilled && ' text-azul'} ${isFocused && ' text-azul'}`}>{legend}</legend> }
      <select
        className={`w-full placeholder-azul text-azul  ${disabled && 'text-cinza-claro'} ${!!error && 'placeholder-vermelho text-vermelho'}  ${isFilled && 'placeholder-azul text-azul'} ${isFocused && 'placeholder-azul text-azul'}`}
        onFocus={clearError}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        disabled={disabled}
        ref={inputRef}
        {...rest}
      > {children} </select>
     
    </fieldset> 
    {!!error && <span className={`${!!error && 'flex mt-1 text-left text-xxs text-vermelho'}`}>{error }</span>}
   </div>
  );
};

export default Select;
