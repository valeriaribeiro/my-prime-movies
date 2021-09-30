import axios from 'axios';

/* URL filmes em cartaz
BaseURL: https://api.themoviedb.org/3/
Rota: movie/now_playing?
Chave: api_key=23d24a8d3d20dbbef65fff27849da1c0
Linguagem: &language=pt-BR
Página: &page=1 */

export const key = "23d24a8d3d20dbbef65fff27849da1c0";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;