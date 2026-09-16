export default function Input({ label, placeholder, onChange, value, type = "text"}) {

    return (

        <div className="flex flex-col">
            <label className="text-sm font-medium text-[#2F3131] mb-1">{label}</label>
      {/* Aqui a prop visibility faz a senha ficar oculta */}
            <input 
                type={type} 
                // adicionar ao final do classname isso: py-1 focus:outline-none focus:ring-1 focus:ring-black" 
                className="border rounded-md w-100 px-2" 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    )
}