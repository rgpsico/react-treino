import React from 'react';

function formatarNome(usuario){
  return usuario.nome+ ' '+usuario.sobrenome;
}






let  App = () =>{
 let imagem ='https://www.google.com.br/google.jpg';
  return <img src={imagem}/>

}
export default App;