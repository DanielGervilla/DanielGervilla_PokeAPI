import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get("/pokemon", {
    params: { limit, offset },
  });

  return response.data.results;
};

export const getPokemonsWithDetails = async (limit = 20, offset = 0) => {
  try {
    // 1. Llista base
    const basicList = await getPokemons(limit, offset);

    // 2. Crides en paral·lel
    const requests = basicList.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const responses = await Promise.all(requests);

    // 3. Retornar només les dades
    return responses.map((res) => res.data);
  } catch (error) {
    console.error("Error obtenint detalls dels Pokémon:", error);
    throw error;
  }
};

export const getPokemonByName = async (identifier) => {
  try {
    const id = typeof identifier === 'number' ? identifier : identifier.toLowerCase();
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obtenint Pokémon:", error);
    throw error;
  }
};

export const getAllTypes = async () => {
  try {
    const response = await api.get("/type");
    return response.data.results.map((type) => type.name);
  } catch (error) {
    console.error("Error obtenint tipus:", error);
    throw error;
  }
};

export const getPokemonsByType = async (type) => {
  try {
    const response = await api.get(`/type/${type}`);
    return response.data.pokemon.map((p) => ({
      name: p.pokemon.name,
      url: p.pokemon.url,
    }));
  } catch (error) {
    console.error("Error obtenint Pokémon per tipus:", error);
    throw error;
  }
};