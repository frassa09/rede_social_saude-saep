const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3333';

export const getAtividades = async (categoria = '', pagina = 1, limite = 4) => {
  try {
    const token = localStorage.getItem('token');
    
    //monta a query string com tipo_atividade, pagina e limite
    const queryParams = new URLSearchParams({
      pagina,
      limite,
      ...(categoria && { tipo_atividade: categoria }),
    });

    const response = await fetch(`${API_URL}/atividade?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar atividades');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição de atividades:', error);
    return null;
  }
};