import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

export function SalvarDados(Dados){
    //var temp =  CryptoAES.encrypt(JSON.stringify(Dados), 'Intermedicina@2020');
    //localStorage.setItem('Intermedicina@ContratarStore', temp.toString());
     localStorage.setItem('Intermedicina@ContratarStore', JSON.stringify(Dados)); 
}

export  function CarregarDados(){
    //var temp = localStorage.getItem('Intermedicina@ContratarStore') 
    //var bytes = CryptoAES.decrypt(temp, 'Intermedicina@2020')
    //var Store = JSON.parse(bytes.toString(CryptoENC)) 

    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    return Store
}