import React from 'react'; 
import styled from '@emotion/styled' 

interface Props{
    size?:number;
    ml?:number;
    mr?:number;
    mt?:number;
    mb?:number; 
    pl?:number;
    pr?:number;
    pt?:number;
    pb?:number;
}

export const Row: React.FC<Props> = ({size=100, ml=0, mr=0, mt=0, mb=0,pl=0, pr=0, pt=0, pb=0, children, ...rest }) => {
const RowS = styled.div`
    display:flex;
    width: ${size}%;
    margin-top:${mt}px;    
    margin-bottom:${mb}px;    
    margin-left:${ml}px;    
    margin-right:${mr}px;
    padding-top:${pt}px;    
    padding-bottom:${pb}px;    
    padding-left:${pl}px;    
    padding-right:${pr}px;  
`  
  return (
    <RowS {...rest}> 
        {children}
    </RowS>
  );
};

export const Column: React.FC<Props> = ({size=100,  ml=0, mr=0, mt=0, mb=0,pl=0, pr=0, pt=0, pb=0, children, ...rest }) => {
    const ColumnS = styled.div`
        width: ${size}%;
        margin-top:${mt}px;    
        margin-bottom:${mb}px;    
        margin-left:${ml}px;    
        margin-right:${mr}px;
        padding-top:${pt}px;    
        padding-bottom:${pb}px;    
        padding-left:${pl}px;    
        padding-right:${pr}px;   
    ` 

    return (
      <ColumnS {...rest}> 
          {children}
      </ColumnS>
    );
  };
   
 
