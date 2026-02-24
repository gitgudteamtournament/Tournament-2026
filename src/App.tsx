import { Routes, Route, Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Home Page</h1>

      <Link
        to="/about"
        className="px-6 py-3 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition"
      >
        Go to About
      </Link>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400">
      <h1 className="text-5xl font-bold mb-6">About Page</h1>

      <Link
        to="/"
        className="px-6 py-3 bg-green-400 text-black rounded-xl shadow-lg hover:scale-105 transition"
      >
        Go Back
      </Link>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;