export default function CardActivity({ activity }) {
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
        <div className="flex mt-2.5 gap-14 text-[13px]">
          <div className="flex border-r w-10">
            <p>DISTÂNCIA</p>
          </div>
          <div className="flex">
            <p>DURAÇÃO</p>
          </div>
          <div className="flex border-l">
            <p>CALORIAS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
