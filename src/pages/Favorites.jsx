import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '../components/MovieCard.jsx'
import { clearFavorites } from '../store/slices/favoritesSlice'

const Favorites = () => {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites.list)

    const handleClearFavorites = () => {
        dispatch(clearFavorites())
    }

    return (
        <>
            <div className="pattern" />
            <div className="wrapper">
                <h1 className="mb-6">
                    My <span className="text-gradient">Favorites</span>
                </h1>
                <p className="text-light-200 text-center mt-4 mb-12 max-w-xl mx-auto">
                    Your personally saved movies. Click the heart on any movie card to
                    save it here.
                </p>

                {favorites.length > 0 && (
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={handleClearFavorites}
                            className="px-5 py-2.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 transition-all text-sm font-medium cursor-pointer"
                        >
                            Clear All Favorites
                        </button>
                    </div>
                )}

                {favorites.length === 0 ? (
                    <div className="text-center mt-16">
                        <div className="text-6xl mb-4">🎬</div>
                        <p className="text-light-200 text-lg">
                            No favorites yet. Browse movies and click the heart to save them!
                        </p>
                    </div>
                ) : (
                    <section className="all-movies">
                        <ul>
                            {favorites.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </>
    )
}

export default Favorites
