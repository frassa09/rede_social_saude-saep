

export default function Input({ label = 'sielaes', placeholder}) {

    return (

        <div className="flex flex-col">
            <a>{label}</a>
            <input className=" border rounded-md w-100"></input>
        </div>
    )
}