import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
    state = {
        movies: getMovies(),
        genres: getGenres(),
        currentPage : 1,
        pageSize: 4
    };

    componentDidMount() {
        const genres = [{ name: 'All Genres'}, ...getGenres()];
        this.setState({movies: getMovies(), genres: genres });
    }

    deleteHandler = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage : page});
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;

        if (this.state.movies.length === 0) return <p>Current there is no movies</p>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m=> m.genre._id === selectedGenre._id) : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Currently Showing {filtered.length} Movies in the Database</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {movies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.deleteHandler(movie)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination itemsCount = {filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                    </div>
                </div>
        );
    }
}

export default Movies;
