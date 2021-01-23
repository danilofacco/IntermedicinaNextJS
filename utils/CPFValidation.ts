import axios from 'axios'

export function CPFValidation(cpf) {
    if (cpf != ""  && cpf != null &&  cpf != undefined){
      var strCPF = cpf.replace(".","").replace("-","")
      if(!checkIsValid(strCPF)){ 
        alert("CPF Inválido")
        return false
      }else {
        CheckIfCPFExist(cpf)
        return true
      }
    }
  } 

  export function CheckIfCPFExist(cpf){

    axios.request({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/contratar/checkCPF.php`,
      data:JSON.parse(JSON.stringify({"cpf":cpf}))
    })

    .then(function (response) {
      if (response.data == false){
        alert("O CPF já se encontra cadastrado em nossa base de dados, por favor entre em contato com nosso 0800 722 6967.")
      
      }
    })
  }


export function  checkIsValid(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
      // Valida 1o digito
      var add = 0;
      var rev = 0;
      var i = 0;

      for (i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
      rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
      return false;
      // Valida 2o digito
      add = 0;
      for (i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
      rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
      return false;
      return true;
    }
