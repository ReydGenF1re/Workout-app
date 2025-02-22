import React from "react"; // Импортируем иконку обновления
// Thanks to https://legacy.reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-900">
                    <div className="text-center p-8 rounded-lg">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                            Упс! Что-то пошло не так
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Не волнуйтесь, такое иногда случается
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;