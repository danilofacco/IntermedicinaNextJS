import axios from 'axios'
interface iFile{
    filename:string;
    imgurl: string| ArrayBuffer;
}
export async function uploadFile(event){
    var File:iFile= {filename: "", imgurl:""}
    File.filename = Math.floor(Math.random() * 999999999) +"-"+ event.target.files[0].name.replace(/[^a-zA-Z. ]/g, "").replace(/ /g,"")
    const ext = File.filename.split('.').pop().toLowerCase()
    if (ext != "jpg" && ext != "jpeg" && ext != "png" && ext != "pdf"  && ext != "doc" && ext != "docx" && ext != "bmp"){
      return alert("Arquivo Inválido: Envie apenas imagens, fotos, documentos ou PDF's ")
    }
    if ( event.target.files[0].size > 20971520){
      return alert("O arquivo selecionado ultrapassa o tamanho limite de 20mb")
    }

    return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
      fileReader.addEventListener("load",() =>{
        File.imgurl = fileReader.result
        const submitData = JSON.stringify(File)
        axios.request({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}uploads/upload.php`,
          data:JSON.parse(submitData)
        })
        .then(response => {
          resolve(response.data)
        }).catch(error =>{
          reject(error)
        })
      })
     fileReader.readAsDataURL(event.target.files[0]) 
    })

  }