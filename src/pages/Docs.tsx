import { Link } from 'react-router-dom';

export function Docs() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
                    <p className="text-gray-500 mb-8">Technical approach and design decisions</p>

                    <Section title="🏗️ Architecture Overview">
                        <p>This is a full-stack CRUD application with a decoupled architecture:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                            <li><strong>Backend:</strong> NestJS REST API deployed on Render</li>
                            <li><strong>Frontend:</strong> React SPA with TypeScript</li>
                            <li><strong>Database:</strong> MongoDB Atlas (cloud)</li>
                        </ul>
                    </Section>

                    <Section title="⚙️ Backend Stack">
                        <TechCard
                            name="NestJS"
                            reason="Provides structured, modular architecture with built-in dependency injection, making code maintainable and testable. Better than Express for large applications."
                        />
                        <TechCard
                            name="MongoDB + Mongoose"
                            reason="Schema-flexible NoSQL database ideal for rapid development. Mongoose provides type safety and validation at the ODM level."
                        />
                        <TechCard
                            name="JWT Authentication"
                            reason="Stateless authentication allows horizontal scaling. Tokens are self-contained and don't require server-side session storage."
                        />
                        <TechCard
                            name="bcrypt"
                            reason="Industry-standard password hashing with configurable salt rounds (10) for security vs performance balance."
                        />
                    </Section>

                    <Section title="🔒 Security Measures">
                        <div className="grid md:grid-cols-2 gap-4">
                            <SecurityItem title="XSS Protection" desc="HTML entity encoding on all string inputs" />
                            <SecurityItem title="NoSQL Injection" desc="Strips $ operators from query objects" />
                            <SecurityItem title="Rate Limiting" desc="100 requests/minute per IP using Throttler" />
                            <SecurityItem title="Helmet" desc="Sets secure HTTP headers automatically" />
                            <SecurityItem title="CORS" desc="Configured for frontend domain only" />
                            <SecurityItem title="Input Validation" desc="class-validator with whitelist mode" />
                        </div>
                    </Section>

                    <Section title="🎨 Frontend Stack">
                        <TechCard
                            name="React + TypeScript"
                            reason="Type safety catches bugs at compile time. Interfaces ensure API responses match expected shapes."
                        />
                        <TechCard
                            name="Zustand + Persist"
                            reason="Lightweight state management (1KB). Persist middleware keeps auth token in localStorage, surviving page refreshes."
                        />
                        <TechCard
                            name="React Query (TanStack)"
                            reason="Handles caching, background refetching, and optimistic updates. Eliminates manual loading/error state management."
                        />
                        <TechCard
                            name="Tailwind CSS"
                            reason="Utility-first CSS enables rapid UI development without context switching. Smaller bundle with purging."
                        />
                    </Section>

                    <Section title="📁 Code Organization">
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            {`frontend/src/
├── apis/           # API hooks & services (separation of concerns)
│   ├── hooks/      # React Query hooks (useAuth, useItems)
│   └── services/   # Axios API calls
├── components/     # Reusable UI components
├── pages/          # Route-level components
├── store/          # Zustand state management
├── types/          # TypeScript interfaces
├── exceptions/     # Custom error classes
└── utils/          # Helper functions`}
                        </pre>
                    </Section>

                    <Section title="🎯 Design Decisions">
                        <Decision
                            title="Max 100 Lines Per File"
                            desc="Improved readability and maintainability. Each file has single responsibility."
                        />
                        <Decision
                            title="No any/unknown Types"
                            desc="Full type safety with explicit interfaces for all API responses."
                        />
                        <Decision
                            title="Custom ApiException Class"
                            desc="Consistent error handling with user-friendly messages. Distinguishes auth errors from API errors."
                        />
                        <Decision
                            title="Silent 401 Redirects"
                            desc="Auth errors redirect to login without error toast - cleaner UX for expired sessions."
                        />
                        <Decision
                            title="Protected + Guest Routes"
                            desc="Dashboard requires auth. Login/Register redirect if already authenticated."
                        />
                    </Section>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <Link to="/" className="text-blue-600 font-medium hover:underline">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
            {children}
        </section>
    );
}

function TechCard({ name, reason }: { name: string; reason: string }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600 text-sm mt-1">{reason}</p>
        </div>
    );
}

function SecurityItem({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-800">{title}</h4>
            <p className="text-blue-600 text-sm">{desc}</p>
        </div>
    );
}

function Decision({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-gray-600 text-sm">{desc}</p>
        </div>
    );
}
