import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogin } from '../apis';
import { getErrorMessage, isAuthError } from '../utils';

export function Login() {
    const navigate = useNavigate();
    const loginMutation = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await loginMutation.mutateAsync({ email, password });
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            if (!isAuthError(err)) {
                toast.error(getErrorMessage(err));
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 mb-6">Sign in to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loginMutation.isPending && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
