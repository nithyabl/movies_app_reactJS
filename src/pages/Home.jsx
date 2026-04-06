import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Search from '../components/Search.jsx'
import Spinner from '../components/Spinner.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { fetchMovies, setSearchTerm } from '../store/slices/moviesSlice'
import { fetchTrending } from '../store/slices/trendingSlice'

const Home = () => {
    const dispatch = useDispatch()
    const { list: movieList, isLoading, error, searchTerm } = useSelector((state) => state.movies)
    const { list: trendingMovies } = useSelector((state) => state.trending)

    useDebounce(
        () => {
            dispatch(fetchMovies(searchTerm))
        },
        500,
        [searchTerm]
    )

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchTrending())
    }, [dispatch])

    return (
        <>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span> You'll Enjoy
                        Without the Hassle
                    </h1>

                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={(val) => dispatch(setSearchTerm(val))}
                    />
                </header>

                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>

                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="all-movies">
                    <h2>All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    )
}

export default Home
