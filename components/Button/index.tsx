import React, { ButtonHTMLAttributes } from 'react';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="bg-azul rounded-md text-white px-4 py-2 w-full text-medium" type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
