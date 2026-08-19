export default function ButtonSideBar({ name, onClick, icon, onHover }) {
  return (
    <button
      onClick={() => onClick()}
      className="flex w-[90%] justify-center items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer border h-10 border-[#ACABAA] rounded-md"
    >
      <div>{icon}</div>
      <a className="text-[#ACABAA] font-bold flex justify-center">{name}</a>
    </button>
  );
}
