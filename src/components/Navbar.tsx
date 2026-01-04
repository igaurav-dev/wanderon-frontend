import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

export function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-white text-xl font-bold tracking-tight">
                        Items Manager
                    </Link>
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
