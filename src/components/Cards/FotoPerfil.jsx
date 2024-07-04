import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";

const FotoPerfil = () => {
  const [imgUrl, setImgUrl] = useState(localStorage.getItem("url_foto"));
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [salvo, setSalvo] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null); // Create a ref for the input element


  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL


  const handleFileChange = (event) => {
    setErro(false)
    setSelectedFile(event.target.files[0]);
    
  };

  useEffect(() => {
    if (selectedFile) {
      subirFoto();
    }
  }, [selectedFile]);

  const handleClickCamera = () => {
    if(!isLoading){
    inputFileRef.current.click(); 
    }
  };

  const subirFoto = async () => {

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/files/upload`, formData, {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileUrl = response.data;
      setImgUrl(fileUrl);
      localStorage.setItem("url_foto", fileUrl);
      setSalvo(true);
    } catch (error) {
      console.error("Erro ao subir a foto:", error);
      setErro(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
    <div className="w-56 h-56 border-4 border-green-600 flex justify-center items-center rounded-full relative">
      {isLoading && <img src="../../../public/loading.png" className="w-52 h-52  p-8 rounded-full animate-spin bg-black opacity-80 absolute" />}
      {erro && (<div className="w-52 h-52 p-8 rounded-full bg-red-800 opacity-80 absolute flex items-center justify-center flex-col"><img src="../../../public/erro.png" className="h-12" /><p className="text-center text-lg font-black">Erro ao subir imagem</p></div>)}
      {imgUrl == "null" ? <img src="../../../public/bug.png" className="w-52 h-52 rounded-full"/> : <img src={imgUrl} className="object-cover w-52 h-52 rounded-full"/>}
      <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={inputFileRef}
          className="absolute opacity-0 w-0 h-0 cursor-pointer"
        />
      <img src="../../../public/camera.png" alt="foto_perfil" onClick={handleClickCamera} className="bg-white absolute bottom-1 right-4  h-10 p-1 shadow-black shadow-lg rounded-full transition-all hover:scale-110 hover:cursor-pointer"/>
    </div>
    </div>
  );
};

export default FotoPerfil;
