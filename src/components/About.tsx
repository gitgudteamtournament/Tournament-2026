import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">About</h1>
                <Link to="/" className="underline">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default About;