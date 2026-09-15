const api_url = import.meta.env.VITE_API_URL;


export const buscarTodasAtividades = async (page, limit) => {

    try {

        const token = localStorage.getItem('token')

        const response = await fetch(`${api_url}/atividade/auth/all/${page}/${limit}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json()

        return data
    }
    catch(err){

        console.error(err.message);
    }
}