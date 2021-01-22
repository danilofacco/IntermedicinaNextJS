import {ContratarStore} from '../store/contratar'
import moment from 'moment'
 
export function checkAge(datanasc){ 
    var today = moment();
    if ( datanasc != null &&  datanasc != undefined &&  datanasc.length == 10){
      var birthDate = moment (datanasc,"DD-MM-YYYY")  
      if(!birthDate.isValid()){ 
        alert("Data de nascimento inválida!")   
        return false
      }
      var age = today.year() - birthDate.year()
      var m = today.month() - birthDate.month()
      if (m < 0 || (m === 0 && today.date() < birthDate.date())) {
        age--
      }
      if (age < 18){
        alert("Você precisa ter mais de 18 anos!") 
        return false
      
      }
      if (age > 120){ 
        return false
      }
    }
    return true
    }
  