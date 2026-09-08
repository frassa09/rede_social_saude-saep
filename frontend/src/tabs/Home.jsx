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

  //estados dos filtros de paginacao
  const [categoriaAtiva, setCategoriaAtiva] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [atividades, setAtividades] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {
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

  //busca as atividades sempre que trocar a categoria ou a página
  useEffect(() => {
    carregarAtividades();
  }, [categoriaAtiva, paginaAtual]);

  const carregarAtividades = async () => {
    setLoading(true);
    try {
      // parametros com limite de 4 itens por pagina
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

  return (
    <div className="flex z-0 h-screen flex-row w-full bg-[#F3F0F0]">
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

      {/* conteudo principal */}
      <main className="flex flex-1 flex-col p-6 overflow-y-auto">
        <div className="flex h-20 justify-end gap-4 items-center mr-10">
          {!isLoggedIn && (
      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex flex-1 flex-col">
        <div className="flex h-20 justify-end gap-4 items-center mr-10">
          {isLoggedIn ? (
            /* FEEDBACK VISUAL DE USUÁRIO CONECTADO + BOTAO DE SAIR */
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300">
                ● Conectado
              </span>
              
              <LoginButton
              name={"Sair"}
                onClick={fazerLogout}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              >
                
              </LoginButton>
            </div>
          ) : (
            <>
              <LoginButton
                name={"Cadastrar"}
                onClick={() => setModalCadastro(true)}
              />
              <LoginButton
                name={"Login"}
                name={"Entrar"}
                onClick={() => setModalLogin(true)}
              />
            </>
          )}
        </div>

        {/* filtros por categoria */}
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

        {/* exibiçao de atividades */}
        <div className="flex-1">
          {loading ? (
            <p className="text-gray-500 italic">Carregando atividades...</p>
          ) : (
            <CardActivity atividades={atividades} />
          )}
        </div>

        {/* 4 itens por pagina */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
          <button
            disabled={paginaAtual <= 1}
            onClick={() => setPaginaAtual((prev) => prev - 1)}
            className="px-4 py-1.5 bg-white border border-gray-300 text-sm rounded-md font-medium text-gray-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="text-sm font-medium text-gray-600">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            disabled={paginaAtual >= totalPaginas}
            onClick={() => setPaginaAtual((prev) => prev + 1)}
            className="px-4 py-1.5 bg-white border border-gray-300 text-sm rounded-md font-medium text-gray-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      </main>

      {/* modais */}

        <div className="">
          <CardActivity></CardActivity>
          <CardActivity></CardActivity>
          <CardActivity></CardActivity>
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
}
