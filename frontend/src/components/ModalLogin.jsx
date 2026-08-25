import { useState } from "react";
import Input from "./Input";
import { schemaLoginUsuario } from "../zod_schemas/schemaLoginUsuario";
import { loginUsuario } from "../services/Login.service";

export default function ModalLogin({ closeModal, setIsLoggedIn }) {
  const [logando, setLogando] = useState(false);
  const [msgParaUsuario, setMsgParaUsuario] = useState('')
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logarUsuario = async () => {
    setLogando(true);

    const objValidateLogin = {
      email,
      senha,
    };

    const objLogin = schemaLoginUsuario.safeParse(objValidateLogin);

    if (objLogin.success) {
      const response = await loginUsuario(objLogin.data);

      console.log(response)

      if(response.success){
        console.log('usuario logado')
        localStorage.setItem('token', response.token)
        setIsLoggedIn(true)
        setLogando(false)
      }

      setLogando(false);
    } else {
      alert("Algum campo está com informações incompletas ou incorretas!");
      setLogando(false);
      return console.error(objLogin.error);
    }
  };

  return (
    <div
      className="flex absolute z-10 h-full justify-center w-full bg-black/50"
      onClick={(e) => (e.target === e.currentTarget ? closeModal() : null)}
    >
      <div className="h-75 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className=" flex justify-center border-b pb-3">
          <a className=" text-2xl mt-4 ">Login</a>
          <a>{}</a>
        </div>
        <div className="flex flex-col items-center mt-5 gap-8">
          <Input
            placeholder={"Email"}
            label={"Insira seu e-mail"}
            onChange={(e) => setEmail(e.currentTarget.value)}
          ></Input>
          <Input
            placeholder={"Senha"}
            label={"Insira sua senha"}
            onChange={(e) => setSenha(e.currentTarget.value)}
          ></Input>

          <div className="flex flex-1 mt-2 self-center justify-end gap-5 w-100">
            <button
              className=" border hover:scale-105 transition-transform duration-300 rounded-md w-20 bg-black text-[#E4E2E1]"
              onClick={() => logarUsuario()}
            >
              {logando ? "Carregando" : "Login"}
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
