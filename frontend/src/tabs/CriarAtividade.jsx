import { useEffect, useState } from "react";
import { verificarTokenUsuario } from "../services/Login.service";
import ButtonSideBar from "../components/ButtonSideBar";
import { Dumbbell, Plus, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CriarAtividade() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

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


  return (
    <div className="flex z-0 h-screen flex-row w-full bg-[#F3F0F0] overflow-hidden">
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
        <div className="flex flex-col items-center gap-8 justify-center mt-15">
          <ButtonSideBar
            name={"Atividades"}
            icon={<Dumbbell color="#ACABAA"></Dumbbell>}
            onClick={() => navigate("/")}
          ></ButtonSideBar>
          {isLoggedIn ? (
            <ButtonSideBar
              name={"Nova Atividade"}
              icon={<Plus color="#ACABAA"></Plus>}
              onClick={() => navigate("/criaratividade")}
            ></ButtonSideBar>
          ) : null}
        </div>
        <div className="flex mt-auto justify-center mb-15">
          <Share2
            color="#F3F0F0"
            className="cursor-pointer hover:scale-120 transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
