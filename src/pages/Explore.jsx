import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { fetchExploreMovies, setActiveCategory, setPage } from '../store/slices/exploreSlice'

const categories = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'popular', label: 'Popular' },
]

const Explore = () => {
    const dispatch = useDispatch()
    const { list: movies, isLoading, error, activeCategory, page } = useSelector(
        (state) => state.explore
    )

    useEffect(() => {
        dispatch(fetchExploreMovies({ category: activeCategory, page }))
    }, [dispatch, activeCategory, page])

    return (
        <>
            <div className="pattern" />
            <div className="wrapper">
                <h1 className="mb-6">
                    <span className="text-gradient">Explore</span> Movies
                </h1>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => dispatch(setActiveCategory(cat.key))}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === cat.key
                                    ? 'bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary shadow-lg shadow-[#AB8BFF]/25'
                                    : 'bg-dark-100 text-light-200 hover:bg-light-100/10 border border-light-100/10'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <section className="all-movies">
                    {isLoading ? (
                        <Spinner />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                        onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
                        disabled={page === 1}
                        className="px-5 py-2.5 rounded-full bg-dark-100 text-light-200 hover:bg-light-100/10 border border-light-100/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Previous
                    </button>
                    <span className="text-light-200 font-medium">Page {page}</span>
                    <button
                        onClick={() => dispatch(setPage(page + 1))}
                        className="px-5 py-2.5 rounded-full bg-dark-100 text-light-200 hover:bg-light-100/10 border border-light-100/10 transition-all cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Explore
