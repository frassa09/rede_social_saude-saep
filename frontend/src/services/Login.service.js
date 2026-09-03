const api_url = import.meta.env.VITE_API_URL;

export const loginUsuario = async (usuario) => {
  try {
    const response = await fetch(`${api_url}/usuario/login`, {
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
    console.error("Erro no loginUsuario:", err.message);
    return { success: false, message: "Falha de conexão com o servidor." };
  }
};

export const verificarTokenUsuario = async (token) => {
  try {
    const response = await fetch(`${api_url}/usuario/auth/login`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return { success: false };

    const data = await response.json();

    console.log(data)
    return { success: true, ...data };
  } catch (err) {
    console.error("Erro no verificarTokenUsuario:", err.message);
    return { success: false };
  }
};
