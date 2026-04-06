import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending } from '../store/slices/trendingSlice'
import Spinner from '../components/Spinner.jsx'

const Trending = () => {
    const dispatch = useDispatch()
    const { list: trendingMovies, isLoading } = useSelector((state) => state.trending)

    useEffect(() => {
        dispatch(fetchTrending())
    }, [dispatch])

    return (
        <>
            <div className="pattern" />
            <div className="wrapper">
                <h1 className="mb-6">
                    <span className="text-gradient">Trending</span> Movies
                </h1>
                <p className="text-light-200 text-center mt-4 mb-12 max-w-xl mx-auto">
                    Movies trending right now based on what people are searching for.
                    Updated in real-time from search activity.
                </p>

                {isLoading ? (
                    <Spinner />
                ) : trendingMovies.length === 0 ? (
                    <p className="text-light-200 text-center">
                        No trending data yet. Start searching on the Home page!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingMovies.map((movie, index) => (
                            <div
                                key={movie.$id}
                                className="relative bg-dark-100 rounded-2xl overflow-hidden shadow-lg shadow-light-100/5 group hover:scale-[1.02] transition-transform duration-300"
                            >
                                {/* Rank Badge */}
                                <div className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] flex items-center justify-center">
                                    <span className="text-primary font-bold text-lg">
                                        {index + 1}
                                    </span>
                                </div>

                                <img
                                    src={movie.poster_url || '/no-movie.png'}
                                    alt={movie.title}
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="text-white font-bold text-lg line-clamp-1">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-light-200 text-sm">
                                            {movie.searchTerm && (
                                                <>
                                                    Searched as:{' '}
                                                    <span className="text-[#AB8BFF]">
                                                        "{movie.searchTerm}"
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="px-3 py-1 rounded-full bg-light-100/10 text-light-100 text-xs font-medium">
                                            {movie.count} {movie.count === 1 ? 'search' : 'searches'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Trending
