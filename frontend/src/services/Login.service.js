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

    return data;
  } catch (err) {
    console.error(err.message);
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

    const data = await response.json();

    console.log(data)
    return data
  } catch (err) {
    console.error(err.message);
  }
};
