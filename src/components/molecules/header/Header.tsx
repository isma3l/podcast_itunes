import { Link } from "react-router-dom";
import { Loader } from "../../atoms";

const Header = () => {
  return (
    <div className="border-b-2 border-gray-300 py-4 flex justify-between">
      <Link className="text-3xl font-semibold text-blue-500" to="/">
        Podcaster
      </Link>
      <Loader />
    </div>
  );
};

export default Header;
