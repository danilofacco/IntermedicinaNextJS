  
interface Props   {
  valuesArray?:Array<any>;
}

const OptionsAnos: React.FC<Props> = ({ valuesArray=[] }) => {
   
  var newAnos = []
  //cria um array com os proximos 10 anos para usar como data de expiração
  for (let i = new Date().getFullYear(); i < new Date().getFullYear()+10; i++) {
    newAnos.push(String(i))
  }   
  return (
    <>
    <option value="" disabled>ANO</option>
    {newAnos.map( v =>{ 
      return <option value={v} key={v}>{v}</option>
    })
    }
    </>
  );
};

export default OptionsAnos;
