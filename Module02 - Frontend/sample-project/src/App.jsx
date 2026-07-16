import {useState} from "react";

 function Saudacao( {nome}){
  return <h2>"Olá, " { nome } " Seja bem-vindo (a)!</h2>;
 }
 export default function App() {
  
  const [contador, setContador] = useState(0);

  return (
         <div>
          <Saudacao nome="João" />
          <p>
             {contador}
          </p>
          <button onClick={() => setContador(contador + 1)}>Incrementar Soma +1

          </button>

          <button onClick={() => setContador(contador - 1)}>Decrementar Subtração -1</button>
         </div>
    
  );

 
 }