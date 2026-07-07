import { useState } from "react";

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Aprender sobre Props", concluida: true },
    { id: 2, texto: "Entender useState", concluida: false },
    { id: 3, texto: "Estudar Web Components", concluida: false },
  ]);

  return (
    <div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.texto}</li>
        ))}
      </ul>
    </div>
  );
}
