 
import React, {   useEffect } from 'react';

 
import { useRouter } from 'next/router';


const Pagamento : React.FC = () => {
 
  const router = useRouter()
  
  useEffect(()=>{
      router.push(`/contratar/pagamento/cartao`)
    },[])

    return (
      <div>
     </div> )
    
    }

    export default Pagamento