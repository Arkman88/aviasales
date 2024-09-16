const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Произошла ошибка при выполнении GET-запроса:', error);
    throw error;
  }
};

export default fetchData;
