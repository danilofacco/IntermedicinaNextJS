import React from 'react';
import Image from 'next/image'
 
 

const TitleWithLogo: React.FC  = ({ children, ...rest }) => {
  return (  

    <div className="flex flex-col items-center mt-8 mb-4"  {...rest}>
      <Image
      src="/assets/logo_icon.svg"
      width={20}
      height={24}
      />
      <span className="montserrat-bold text-cinza-escuro text-xl  ">{children}</span>
      <div className="h-1 bg-quase-branco w-28 mt-2"></div>
    </div>
  );
};

export default TitleWithLogo;
