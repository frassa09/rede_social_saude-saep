

export default function LoginButton({ onClick, name }) {

    return (
      <button onClick={() => onClick()} className=" transition-transform duration-300 hover:scale-110 bg-[#FFFFFF] w-20 h-10 rounded-2xl border border-[#ACABAA]">
        <p>{name}</p>
      </button>
    );
}