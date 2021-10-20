import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from './moviesTable';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: getMovies(),
        genres: getGenres(),
        currentPage : 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres'}, ...getGenres()];
        this.setState({movies: getMovies(), genres: genres });
    }

    handleDelete = movie => {
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

    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

        if (this.state.movies.length === 0) return <p>Current there is no movies</p>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m=> m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

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
                        <MoviesTable
                            movies={movies}
                            onLike={this.handleLike}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <Pagination
                            itemsCount = {filtered.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
        );
    }
}

export default Movies;
