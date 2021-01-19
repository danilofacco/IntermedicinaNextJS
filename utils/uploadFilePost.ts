import axios from 'axios'
interface iFile{
    filename:string;
    imgurl: string| ArrayBuffer;
}
export async function uploadFilePost(formData,filename){ 
  console.log(filename)

  const ext = filename.split('.').pop().toLowerCase()
  if (ext != "jpg" && ext != "jpeg" && ext != "png" && ext != "pdf"  && ext != "doc" && ext != "docx" && ext != "bmp"){
    return alert("Arquivo Inválido: Envie apenas imagens, fotos, documentos ou PDF's ")
  }

  return new Promise((resolve, reject) => {
      axios.request({
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}uploads/upload.php`,
        data:formData
      })
      .then(response => {
          resolve(response.data.url)
     })
      .catch(error => {
          reject(error)
      })
  })

  }