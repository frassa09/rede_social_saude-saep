import { useState } from "react"


export default function Input({ label, placeholder, onChange, value}) {

    const [texto, setTexto] = useState('')
    return (

        <div className="flex flex-col">
            <a>{label}</a>
            <input className=" border rounded-md w-100 px-2" placeholder={placeholder} value={value} onChange={onChange}></input>
        </div>
    )
}