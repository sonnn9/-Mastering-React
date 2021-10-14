import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage : 1,
        pageSize: 4
    };

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
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, movies: allMovies} = this.state;

        if (this.state.movies.length === 0) return <p>Current there is no movies</p>;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <div className="container">
                <p>Currently Showing {count} Movies in the Database</p>
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
                <Pagination itemsCount = {count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
        );
    }
}

export default Movies;
