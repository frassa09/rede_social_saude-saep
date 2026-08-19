import Input from "./Input";

export default function ModalLogin({ closeModal }) {
  return (
    <div
      className="flex absolute z-10 h-full justify-center w-full bg-black/50"
      onClick={(e) => (e.target === e.currentTarget ? closeModal() : null)}
    >
      <div className="h-75 w-150 bg-[#F3F0F0] self-center mb-30 rounded-2xl border border-[#2F3131]">
        <div className=" flex justify-center border-b pb-3">
          <a className=" text-2xl mt-4 ">Login</a>
        </div>
        <div className="flex flex-col items-center mt-5 gap-8">
          <Input></Input>
          <Input></Input>
        </div>
      </div>
    </div>
  );
}
