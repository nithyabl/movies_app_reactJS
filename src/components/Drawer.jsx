import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const navItems = [
    { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
    { path: '/explore', label: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { path: '/trending', label: 'Trending', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { path: '/favorites', label: 'Favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
]

const Drawer = ({ isOpen, onClose }) => {
    // Close drawer on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKey)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-primary border-r border-light-100/10 shadow-2xl shadow-black/50 transform transition-transform duration-300 ease-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-light-100/10">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                        <span className="text-white font-bold text-xl">
                            React<span className="text-gradient">Movies</span>
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-light-100/10 transition-colors cursor-pointer"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5 text-light-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Nav links */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                                    ? 'bg-gradient-to-r from-[#D6C7FF]/20 to-[#AB8BFF]/20 text-white border border-[#AB8BFF]/30'
                                    : 'text-light-200 hover:text-white hover:bg-light-100/5'
                                }`
                            }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-light-100/10">
                    <p className="text-gray-100 text-xs text-center">
                        Powered by TMDB & Appwrite
                    </p>
                </div>
            </aside>
        </>
    )
}

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Drawer
