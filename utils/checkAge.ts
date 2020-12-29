import {ContratarStore} from '../store/contratar'
 
export function checkAge(datanasc){ 
    var today = new Date();
    if ( datanasc != null &&  datanasc != undefined &&  datanasc.length == 10){
      var array_date =  datanasc.split('/')
      var birthDate = new Date(array_date[1] + "-" + array_date[0] + "-" + array_date[2])
      if(birthDate == "Invalid Date"){
        alert("Data de nascimento inválida!") 
        ContratarStore.update(s=>{
            s.datanasc = ""
        })
      }
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 18){
        alert("Você precisa ter mais de 18 anos!")

        ContratarStore.update(s=>{
            s.datanasc = ""
        })
      
      }
      if (age > 120){
        ContratarStore.update(s=>{
            s.datanasc = ""
        })
      }
    }
    }
  