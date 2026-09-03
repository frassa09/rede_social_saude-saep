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
    return { success: response.ok, ...data };

  } catch (err) {
    console.error("Erro na requisição de cadastro:", err.message);
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
};
