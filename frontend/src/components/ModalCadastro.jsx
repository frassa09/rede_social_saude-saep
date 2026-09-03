import { useState } from "react";
import Input from "./Input";
import { schemaCadastroUsuario } from "../zod_schemas/schemaCadastroUsuario";
import { cadastrarUsuario } from "../services/Cadastro.service";

export default function ModalCadastro({ closeModal }) {
  const [cadastrando, setCadastrando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const cadastrar = async () => {
    setMensagemErro("");
    setMensagemSucesso("");
    setCadastrando(true);

    const objToValidateCadastro = {
      nome,
      email,
      nome_usuario: nomeUsuario,
      senha,
    };

    const objUsuario = schemaCadastroUsuario.safeParse(objToValidateCadastro);

    if (!objUsuario.success) {
      const erroZod = objUsuario.error.issues[0]?.message || "Preencha todos os campos corretamente.";
      setMensagemErro(erroZod);
      setCadastrando(false);
      return;
    }

    const response = await cadastrarUsuario(objUsuario.data);

    if (response && response.success) {
      setMensagemSucesso("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      setMensagemErro(response?.message || "Erro ao realizar o cadastro. Tente novamente.");
    }

    setCadastrando(false);
  };

  return (
    <div
      className="flex absolute z-10 h-full justify-center w-full bg-black/50"
      onClick={(e) => (e.target === e.currentTarget ? closeModal() : null)}
    >
      <div className="p-4 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className="flex justify-center border-b pb-3">
          <h2 className="text-2xl mt-4 font-semibold text-[#2F3131]">Cadastro</h2>
        </div>

        <div className="flex flex-col items-center mt-5 gap-6">
          {/* MENSAGEM VISUAL DE ERRO */}
          {mensagemErro && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-sm font-medium px-4 py-2 rounded-md w-100 text-center">
              {mensagemErro}
            </div>
          )}

          {/* MENSAGEM VISUAL DE SUCESSO */}
          {mensagemSucesso && (
            <div className="bg-green-100 border border-green-400 text-green-700 text-sm font-medium px-4 py-2 rounded-md w-100 text-center">
              {mensagemSucesso}
            </div>
          )}

          <Input
            placeholder={"Nome"}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            label={"Insira seu nome completo"}
          />
          <Input
            placeholder={"Nome de Usuário"}
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            label={"Insira seu nome de usuário"}
          />
          <Input
            placeholder={"Email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Insira seu e-mail"}
          />
          <Input
            placeholder={"Senha"}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            label={"Insira sua senha"}
          />

          <div className="flex flex-1 mt-2 self-center justify-end gap-5 w-100">
            <button
              disabled={cadastrando}
              className="border hover:scale-105 transition-transform duration-300 rounded-md w-28 bg-black text-[#E4E2E1] py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={cadastrar}
            >
              {cadastrando ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button
              disabled={cadastrando}
              className="rounded-md hover:scale-105 transition-transform duration-300 w-20 py-1 disabled:opacity-50"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}