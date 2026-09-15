import { Dumbbell, Plus, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonSideBar from "../components/ButtonSideBar";
import LoginButton from "../components/LoginButton";
import ModalLogin from "../components/ModalLogin";
import ModalCadastro from "../components/ModalCadastro";
import { verificarTokenUsuario } from "../services/Login.service";
import CardActivity from "../components/CardActivity";
import { buscarTodasAtividades } from "../services/Atividade.service";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(2);

  // Estados dos filtros de paginação
  const [categoriaAtiva, setCategoriaAtiva] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [atividades, setAtividades] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  // Verificar token ao carregar o componente
  useEffect(() => {
    const buscarAtividades = async () => {
      const response = await buscarTodasAtividades(page, limit);

      if (response.success) {
        console.log(response);
        setAtividades(response.data);
      } else {
        alert("Erro ao buscar atividades, tente recarregar a página");
      }
    };

    buscarAtividades();
  }, []);

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

    if (isLoggedIn) {
      closeModalLogin();
      alert("Usuário logado");
    }
  }, []);

  // Busca as atividades sempre que trocar a categoria ou a página
  useEffect(() => {
    carregarAtividades();
  }, [categoriaAtiva, paginaAtual]);

  const carregarAtividades = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        pagina: paginaAtual,
        limite: 4,
      });

      if (categoriaAtiva) {
        params.append("tipo_atividade", categoriaAtiva);
      }

      const response = await fetch(`http://localhost:3333/atividade?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setAtividades(data.atividades || data.rows || data);
        if (data.totalPaginas) setTotalPaginas(data.totalPaginas);
      }
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltrar = (categoria) => {
    if (!isLoggedIn) {
      setModalLogin(true);
      return;
    }

    const novaCategoria = categoriaAtiva === categoria ? "" : categoria;
    setCategoriaAtiva(novaCategoria);
    setPaginaAtual(1);
  };

  const closeModalLogin = () => setModalLogin(false);
  const closeModalCadastro = () => setModalCadastro(false);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

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
          ></ButtonSideBar>
          {isLoggedIn ? (
            <ButtonSideBar
              name={"Nova Atividade"}
              icon={<Plus color="#ACABAA"></Plus>}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex flex-1 flex-col p-6 overflow-y-auto">
        {/* CABEÇALHO / LOGIN */}
        <div className="flex h-20 justify-end gap-4 items-center mr-10">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300">
                ● Conectado
              </span>
              <LoginButton
                name={"Sair"}
                onClick={fazerLogout}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              />
            </div>
          ) : (
            <>
              <LoginButton
                name={"Cadastrar"}
                onClick={() => setModalCadastro(true)}
              />
              <LoginButton
                name={"Entrar"}
                onClick={() => setModalLogin(true)}
              />
            </>
          )}
        </div>

        {/* FILTROS POR CATEGORIA */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => handleFiltrar("corrida")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                categoriaAtiva === "corrida"
                  ? "bg-black text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              Corrida
            </button>

            <button
              onClick={() => handleFiltrar("caminhada")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                categoriaAtiva === "caminhada"
                  ? "bg-black text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              Caminhada
            </button>

            <button
              onClick={() => handleFiltrar("trilha")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                categoriaAtiva === "trilha"
                  ? "bg-black text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              Trilha
            </button>
          </div>

          {categoriaAtiva && (
            <button
              onClick={() => {
                setCategoriaAtiva("");
                setPaginaAtual(1);
              }}
              className="text-xs text-gray-500 hover:text-black underline cursor-pointer"
            >
              Limpar filtro
            </button>
          )}
        </div>
 
        <div className=" flex flex-col ">
          <div className=" flex justify-center">
            <p className="font-bold text-5xl">Atividades</p>
          </div>
          <div className="flex flex-wrap gap-20 mt-20 justify-center">
            {atividades.map((atividade, index) => {
              return (
                <CardActivity atividade={atividade} key={index}></CardActivity>
              );
            })}
          </div>
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