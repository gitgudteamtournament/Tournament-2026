import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Home</h1>
        <Link to="/about" className="underline">
          Go to About
        </Link>
      </div>
    </div>
  );
};

export default Home;