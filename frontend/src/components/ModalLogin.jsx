import { useState } from "react";
import Input from "./Input";
import { schemaLoginUsuario } from "../zod_schemas/schemaLoginUsuario";

export default function ModalLogin({ closeModal, setIsLoggedIn }) {
  const [logando, setLogando] = useState(false);
import { loginUsuario } from "../services/Login.service";

export default function ModalLogin({ closeModal, setIsLoggedIn }) {
  const [logando, setLogando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logarUsuario = async () => {
    setLogando(true);

    try {
      const objValidateLogin = { email, senha };
      const objLogin = schemaLoginUsuario.safeParse(objValidateLogin);

      if (!objLogin.success) {
        alert("Algum campo está com informações incompletas ou incorretas!");
        console.error(objLogin.error);
        return;
      }

      // Faz a requisição DIRETA para o backend na porta 3333
      const response = await fetch("http://localhost:3333/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objLogin.data),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário logado com sucesso:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setIsLoggedIn(true);
        closeModal();
      } else {
        alert(data.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Não foi possível conectar ao servidor na porta 3333. Verifique se o backend está rodando.");
    } finally {
      setLogando(false);
    }
    //limpando inputs antigos
    setMensagemErro("");
    setMensagemSucesso("");
    setLogando(true);

    const objValidateLogin = { email, senha };
    const objLogin = schemaLoginUsuario.safeParse(objValidateLogin);

    if (!objLogin.success) {
      // Captura a mensagem do erro tratada no schema do Zod
      const erroZod = objLogin.error.issues[0]?.message || "Verifique as informações digitadas.";
      setMensagemErro(erroZod);
      setLogando(false);
      return;
    }

    const response = await loginUsuario(objLogin.data);

    if (response && response.success) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      setMensagemSucesso("Login realizado com sucesso!");
      
      // Dá tempo do usuário ver a mensagem de sucesso antes de fechar o modal
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      setMensagemErro("E-mail ou senha incorretos.");
    }

    setLogando(false);
  };

  return (
    <div
      className="flex absolute z-10 h-full justify-center w-full bg-black/50"
      onClick={(e) => (e.target === e.currentTarget ? closeModal() : null)}
    >
      <div className="h-75 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className="flex justify-center border-b pb-3">
          <a className="text-2xl mt-4">Login</a>
        </div>
        <div className="flex flex-col items-center mt-5 gap-8">
          <Input
            placeholder={"Email"}
            label={"Insira seu e-mail"}
            onChange={(e) => setEmail(e.currentTarget.value)}
      <div className="p-4 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className="flex justify-center border-b pb-3">
          <h2 className="text-2xl mt-4 font-semibold text-[#2F3131]">Login</h2>
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
            placeholder={"Email"}
            type="email"
            label={"Insira seu e-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder={"Senha"}
            type="password"
            label={"Insira sua senha"}
            onChange={(e) => setSenha(e.currentTarget.value)}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="flex flex-1 mt-2 self-center justify-end gap-5 w-100">
            <button
              disabled={logando}
              className="border hover:scale-105 transition-transform duration-300 rounded-md w-20 bg-black text-[#E4E2E1] disabled:opacity-50"
              onClick={logarUsuario}
            >
              {logando ? "Carregando..." : "Login"}
            </button>
            <button
              className="rounded-md hover:scale-105 transition-transform duration-300 w-20"
              className="border hover:scale-105 transition-transform duration-300 rounded-md w-24 bg-black text-[#E4E2E1] py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={logarUsuario}
            >
              {logando ? "Entrando..." : "Login"}
            </button>
            <button
              disabled={logando}
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