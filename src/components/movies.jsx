import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
    state = {
        movies: getMovies()
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
    render() {
        if (this.state.movies.length === 0)
            return <p>Current there is no movies</p>;
        return (
            <div className="container">
                <p>
                    Currently Showing {this.state.movies.length} Movies in the Database
                </p>
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
                    {this.state.movies.map(movie => (
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
            </div>
        );
    }
}

export default Movies;
