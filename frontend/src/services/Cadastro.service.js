const api_url = import.meta.env.VITE_API_URL;

export const cadastrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${api_url}/usuario/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};
