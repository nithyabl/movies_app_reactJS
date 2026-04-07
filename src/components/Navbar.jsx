import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const navItems = [
    { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
    { path: '/explore', label: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { path: '/trending', label: 'Trending', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { path: '/favorites', label: 'Favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
]

const Navbar = ({ onMenuClick }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-light-100/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Menu button + Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onMenuClick}
                            className="p-2 rounded-lg hover:bg-light-100/10 transition-colors cursor-pointer lg:hidden"
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6 text-light-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <NavLink to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                            <span className="text-white font-bold text-xl hidden sm:block">
                                React<span className="text-gradient">Movies</span>
                            </span>
                        </NavLink>
                    </div>

                    {/* Center: Nav tabs (hidden on mobile) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary shadow-lg shadow-[#AB8BFF]/20'
                                        : 'text-light-200 hover:text-white hover:bg-light-100/10'
                                    }`
                                }
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right: Placeholder for balance */}
                    <div className="w-10" />
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    onMenuClick: PropTypes.func.isRequired,
}

export default Navbar
