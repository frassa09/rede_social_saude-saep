import { Heart, MessageSquare } from "lucide-react";

export default function CardActivity({ activity }) {
  //const {distancia, duracao, calorias} = activity
  return (
    <div className="flex flex-col shadow-gray-400 shadow bg-white w-100 h-60 rounded-xl ml-20 mt-15">
      <div className="flex justify-center ">
        <p className="flex justify-center w-[95%] h-10 text-3xl font-bold border-b-2 border-[#F3F0F0] mt-5">
          Titulo
        </p>
      </div>
      <div className="flex self-center w-[95%] mt-5 justify-between">
        <div className="flex-row flex">
          <img
            className="w-10 h-10 rounded-md"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original"
          ></img>
          <p className="ml-3">Nome</p>
        </div>
        <div>
          <a>Data e hora</a>
        </div>
      </div>
      <div className="flex self-center w-[95%] mt-5 justify-center h-15 rounded bg-[#E4E2E1]">
        <div className="flex items-center text-[13px]">
          <div className="flex flex-col items-center border-r border-[#C8C6C6] pr-7">
            <p>DISTÂNCIA</p>
            <p className=" font-bold ">{11}</p>
          </div>
          <div className="flex flex-col items-center px-7">
            <p>DURAÇÃO</p>
            <p className=" font-bold ">{11}</p>
          </div>
          <div className="flex flex-col  items-center border-l border-[#C8C6C6] pl-7">
            <p>CALORIAS</p>
            <p className=" font-bold ">{11}</p>
          </div>
        </div>
      </div>
      <div className=" flex border-t w-[95%] self-center gap-5 items-center border-[#C8C6C6] mt-3">
        <button className=" flex items-center gap-0.5 flex-row">
          <Heart size={18}></Heart>
          <p>{12}</p>
        </button>
        <button className=" flex items-center gap-0.5 flex-row">
          <MessageSquare size={18}></MessageSquare>
          <p>{12}</p>
        </button>
      </div>
    </div>
  );
}
