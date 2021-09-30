// Gerar uma lista de filmes

export function getListMovies(size, movies) {
    let popularMovies = [];

    for (let i = 0, l = size; i < l; i++) {
        popularMovies.push(movies[i]);
    }

    return popularMovies;
}

// Gerar um número randômico com base na lista de filmes
export function randonMovies(movies) {
    return Math.floor(Math.random() * movies.length);
}