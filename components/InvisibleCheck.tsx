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
    <div> 
      <input
        style={{display:"none"}}
        type="hidden" 
        ref={inputRef}
        {...rest}
      /> 
    
    {!!error && <span className={`${!!error && 'flex mt-1 text-left text-xxs text-vermelho'}`}>{error }</span>}
    
    </div>
  );
};

export default InvisibleCheck;
