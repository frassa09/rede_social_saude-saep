import { useState } from "react";
import Input from "./Input";
import z from "zod";
import { schemaCadastroUsuario } from "../zod_schemas/schemaCadastroUsuario";
import { cadastrarUsuario } from "../services/Cadastro.service";

export default function ModalCadastro({ closeModal }) {
  const [cadastrando, setCadastrando] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const cadastrar = async () => {
    
    setCadastrando(true)

    const objToValidateCadastro = {
      nome,
      email,
      nome_usuario: nomeUsuario,
      senha,
    };

    const objUsuario = schemaCadastroUsuario.safeParse(objToValidateCadastro);

    if (objUsuario.success) {
      console.log(objUsuario.data);

      await cadastrarUsuario(objUsuario.data);


      setCadastrando(false)
    }
    else{
      alert('Algum campo está com informações incompletas ou incorretas!')
      setCadastrando(false)
      return console.error(objUsuario.error)
    }
  };

  return (
    <div
      className="flex absolute z-10 h-full justify-center w-full bg-black/50"
      onClick={(e) => (e.target === e.currentTarget ? closeModal() : null)}
    >
      <div className=" p-4 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className=" flex justify-center border-b pb-3">
          <a className=" text-2xl mt-4 ">Cadastro</a>
        </div>
        <div className="flex flex-col items-center mt-5 gap-8">
          <Input
            placeholder={"Nome"}
            onChange={(e) => setNome(e.currentTarget.value)}
            label={"Insira seu nome completo"}
          ></Input>
          <Input
            placeholder={"Nome de Usuário"}
            onChange={(e) => setNomeUsuario(e.currentTarget.value)}
            label={"Insira seu nome de usuário"}
          ></Input>
          <Input
            placeholder={"Email"}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label={"Insira seu e-mail"}
          ></Input>
          <Input
            placeholder={"Senha"}
            onChange={(e) => setSenha(e.currentTarget.value)}
            label={"Insira sua senha"}
          ></Input>

          <div className="flex flex-1 mt-2 self-center justify-end gap-5 w-100">
            <button
              className=" border hover:scale-105 transition-transform duration-300 rounded-md w-20 bg-black text-[#E4E2E1]"
              onClick={() => cadastrar()}
            >
              {cadastrando ? 'Carregando' : 'Cadastrar'}
            </button>
            <button
              className="rounded-md hover:scale-105 transition-transform duration-300 w-20"
              onClick={() => closeModal()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
