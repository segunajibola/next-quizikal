import { FaHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-center m-0 p-3 bg-gray-900 text-gray-300">
      <p>
        Built with <FaHeart className="text-red-500 inline" size={17} /> by Segun Ajibola
      </p>
    </footer>
  );
}
