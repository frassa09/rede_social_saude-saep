import { Dumbbell, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonSideBar from "../components/ButtonSideBar";
import LoginButton from "../components/LoginButton";
import ModalLogin from "../components/ModalLogin";
import ModalCadastro from "../components/ModalCadastro";
import { verificarTokenUsuario } from "../services/Login.service";
import CardActivity from "../components/CardActivity";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await verificarTokenUsuario(token);
        if (response?.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Falha ao validar token:", error);
      }
    };

    verificarToken();
  }, []);

  const closeModalLogin = () => setModalLogin(false);
  const closeModalCadastro = () => setModalCadastro(false);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex z-0 h-screen flex-row w-full bg-[#F3F0F0]">
      {/* SIDEBAR */}
      <div className="flex flex-col w-70 h-full bg-[#333333]">
        <h1 className="flex justify-center text-4xl text-[#F3F0F0] mt-10 font-bold">
          SAEPSaúde
        </h1>
        <div>
          {!isLoggedIn && (
            <span className="text-[#F3F0F0] italic flex justify-center mt-10 text-sm">
              Faça login para ver suas estatísticas
            </span>
          )}
        </div>
        <div className="flex justify-center mt-15">
          <ButtonSideBar
            name={"Atividades"}
            icon={<Dumbbell color="#ACABAA" />}
          />
        </div>
        <div className="flex mt-auto justify-center mb-15">
          <Share2
            color="#F3F0F0"
            className="cursor-pointer hover:scale-120 transition-transform"
          />
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex flex-1 flex-col">
        <div className="flex h-20 justify-end gap-4 items-center mr-10">
          {isLoggedIn ? (
            /* FEEDBACK VISUAL DE USUÁRIO CONECTADO + BOTAO DE SAIR */
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300">
                ● Conectado
              </span>
              <button
                onClick={fazerLogout}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <LoginButton
                name={"Cadastrar"}
                onClick={() => setModalCadastro(true)}
              />
              <LoginButton
                name={"Login"}
                onClick={() => setModalLogin(true)}
              />
            </>
          )}
        </div>


        <div className="">
          <CardActivity></CardActivity>
        </div>
      </main>

      {/* MODAIS */}
      {modalLogin && (
        <ModalLogin
          closeModal={closeModalLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {modalCadastro && (
        <ModalCadastro closeModal={closeModalCadastro} />
      )}
    </div>
  );
}
