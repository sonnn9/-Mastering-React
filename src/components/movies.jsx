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
        movies: [],
        genres: [],
        currentPage : 1,
        pageSize: 4,
        sortColumn: {path: "title", order: "asc"}
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

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies,
            sortColumn
        } = this.state;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter(m=> m.genre._id === selectedGenre._id)
                : allMovies;

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies};
    }

    render() {
        const {length: count} = this.state.movies;
        const {
            pageSize,
            currentPage,
            sortColumn,
            genres
        } = this.state;

        if (this.state.movies.length === 0) return <p>Current there is no movies</p>;

        const {totalCount, data : movies} = this.getPagedData();

        return (
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Currently Showing {totalCount} Movies in the Database</p>
                        <MoviesTable
                            movies={movies}
                            onLike={this.handleLike}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <Pagination
                            itemsCount = {totalCount}
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
