import { Dumbbell, Share2 } from "lucide-react";
import { useState } from "react";
import ButtonSideBar from "../components/ButtonSideBar";
import LoginButton from "../components/LoginButton";
import ModalLogin from "../components/ModalLogin";
import ModalCadastro from "../components/ModalCadastro";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalLogin, setModalLogin] = useState(false)
  const [modalCadastro, setModalCadastro] = useState(false)

  const closeModalLogin = () => {
    setModalLogin(false)
  }
  
  const closeModalCadastro = () => {
    setModalCadastro(false)
  }


  
  return (
    <div className="flex z-0 h-screen flex-row w-full bg-[#F3F0F0]">
      <div className="flex flex-col w-70 h-full bg-[#333333]">
        <a className="flex justify-center text-4xl text-[#F3F0F0] mt-10">
          SAEPSaúde
        </a>
        <div>
          {isLoggedIn ? null : (
            <a className="text-[#F3F0F0] italic flex justify-center mt-10">
              Faça login para ver suas estatísticas
            </a>
          )}
        </div>
        <div className="flex justify-center mt-15">
          <ButtonSideBar
            name={"Atividades"}
            icon={<Dumbbell color="#ACABAA"></Dumbbell>}
          ></ButtonSideBar>
        </div>
        <a className="flex mt-auto justify-center mb-15 ">
          <Share2
            color="#F3F0F0"
            className="cursor-pointer hover:scale-120 transition-transform"
          ></Share2>
        </a>
      </div>

      <main className="flex flex-1 flex-col">
        <div className="flex h-20 justify-end gap-4 items-center mr-10">
          { isLoggedIn ? null : <LoginButton name={'Cadastrar'} onClick={() => setModalCadastro(true)}></LoginButton>}
          { isLoggedIn ? null : <LoginButton name={'Login'} onClick={() => setModalLogin(true)}></LoginButton>}
        </div>
      </main>
      
      {modalLogin ? <ModalLogin closeModal={closeModalLogin}></ModalLogin> : null}
      {modalCadastro ? <ModalCadastro closeModal={closeModalCadastro}></ModalCadastro> : null}
    </div>
    
  );
}
