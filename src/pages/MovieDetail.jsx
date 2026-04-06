import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner.jsx'
import { fetchDetail, clearDetail } from '../store/slices/movieDetailSlice'
import { toggleFavorite } from '../store/slices/favoritesSlice'

const MovieDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { movie, isLoading } = useSelector((state) => state.movieDetail)
    const isFavorited = useSelector((state) =>
        state.favorites.list.some((f) => f.id === Number(id))
    )

    useEffect(() => {
        dispatch(fetchDetail(id))
        return () => dispatch(clearDetail())
    }, [dispatch, id])

    const handleToggleFavorite = () => {
        if (movie) dispatch(toggleFavorite(movie))
    }

    if (isLoading) {
        return (
            <>
                <div className="pattern" />
                <div className="wrapper flex items-center justify-center min-h-[60vh]">
                    <Spinner />
                </div>
            </>
        )
    }

    if (!movie) {
        return (
            <>
                <div className="pattern" />
                <div className="wrapper text-center mt-20">
                    <p className="text-light-200 text-lg">Movie not found.</p>
                    <Link to="/" className="text-[#AB8BFF] mt-4 inline-block hover:underline">
                        Go back home
                    </Link>
                </div>
            </>
        )
    }

    const trailer = movie.videos?.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
    )

    return (
        <>
            <div className="pattern" />
            <div className="wrapper">
                {/* Back button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-light-200 hover:text-white transition-colors mb-8 group"
                >
                    <svg
                        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to movies
                </Link>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Poster */}
                    <div className="lg:w-[350px] flex-shrink-0">
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : '/no-movie.png'
                            }
                            alt={movie.title}
                            className="w-full rounded-2xl shadow-2xl shadow-[#AB8BFF]/10"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-left text-3xl sm:text-5xl">
                                {movie.title}
                            </h1>
                            <button
                                onClick={handleToggleFavorite}
                                className="flex-shrink-0 mt-2 p-3 rounded-full bg-dark-100 hover:bg-light-100/10 transition-colors cursor-pointer"
                                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <svg
                                    className={`w-6 h-6 transition-colors ${isFavorited ? 'text-red-500 fill-red-500' : 'text-light-200'
                                        }`}
                                    fill={isFavorited ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {movie.tagline && (
                            <p className="text-[#AB8BFF] italic mt-2 text-lg">
                                "{movie.tagline}"
                            </p>
                        )}

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            <div className="flex items-center gap-1.5">
                                <img src="/star.svg" alt="Rating" className="w-5 h-5" />
                                <span className="text-white font-bold text-lg">
                                    {movie.vote_average?.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-gray-100">•</span>
                            <span className="text-light-200">
                                {movie.release_date?.split('-')[0]}
                            </span>
                            <span className="text-gray-100">•</span>
                            <span className="text-light-200">
                                {movie.runtime} min
                            </span>
                            <span className="text-gray-100">•</span>
                            <span className="text-light-200 uppercase">
                                {movie.original_language}
                            </span>
                        </div>

                        {/* Genres */}
                        {movie.genres && (
                            <div className="flex flex-wrap gap-2 mt-5">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-4 py-1.5 rounded-full bg-light-100/10 text-light-100 text-sm font-medium border border-light-100/10"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        <div className="mt-8">
                            <h3 className="text-white font-bold text-xl mb-3">Overview</h3>
                            <p className="text-light-200 leading-relaxed text-base">
                                {movie.overview}
                            </p>
                        </div>

                        {/* Cast */}
                        {movie.credits?.cast?.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-white font-bold text-xl mb-4">Top Cast</h3>
                                <div className="flex flex-wrap gap-3">
                                    {movie.credits.cast.slice(0, 8).map((person) => (
                                        <div
                                            key={person.id}
                                            className="flex items-center gap-3 bg-dark-100 rounded-full pl-1 pr-4 py-1 border border-light-100/5"
                                        >
                                            <img
                                                src={
                                                    person.profile_path
                                                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                                        : '/no-movie.png'
                                                }
                                                alt={person.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-light-200 text-sm">
                                                {person.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trailer */}
                        {trailer && (
                            <div className="mt-8">
                                <h3 className="text-white font-bold text-xl mb-4">Trailer</h3>
                                <div className="aspect-video rounded-2xl overflow-hidden max-w-2xl">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="Trailer"
                                        className="w-full h-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail
