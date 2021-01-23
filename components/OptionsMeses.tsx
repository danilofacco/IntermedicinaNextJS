  
interface Props   {
  valuesArray?:Array<any>;
}

const OptionsMap: React.FC<Props> = ({ valuesArray=[] }) => {

  var meses = []
  for (let index = 1; index <= 12 ; index++) {
     index < 10 ?
    meses.push("0" + index):
    meses.push(String(index))
  }

  return (
    <>
     <option value="" disabled >MÊS</option>
    {meses.map( v =>{ 
      return <option value={v} key={v}>{v}</option>
    })
    }
    </>
  );
};

export default OptionsMap;
