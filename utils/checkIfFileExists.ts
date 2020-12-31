import axios from 'axios'
export async function checkIfFileExists(file){
    const data = {
    filename : file, 
    }

    return new Promise((resolve, reject) => {
     axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}uploads/check.php`,
        data:JSON.parse(JSON.stringify(data))
      }).then(response => {
        resolve(response.data)
      }).catch(error =>{
        reject(error)
      })
    })

    
}
  