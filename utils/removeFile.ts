import axios from 'axios'
export async function removeFile(file){
    const data = {
    filename : file, 
    }

    return new Promise((resolve, reject) => {
     axios.request({
        method: "POST",
        url: "https://api.intermedicina.com.br/removeFile.php",
        data:JSON.parse(JSON.stringify(data))
      }).then(response => {
        resolve(response.data)
      }).catch(error =>{
        reject(error)
      })
    })

    
}
  