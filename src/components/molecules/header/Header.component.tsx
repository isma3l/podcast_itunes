import { Link } from "react-router-dom";
import { Loader } from "../../atoms";
import { useLoaderContext } from "@/hooks";

const HeaderComponent = () => {
  const { state } = useLoaderContext();

  return (
    <div className="border-b-2 border-gray-300 py-3 flex justify-between">
      <Link className="text-3xl font-semibold text-sky-600" to="/">
        Podcaster
      </Link>
      {state.loading && <Loader />}
    </div>
  );
};

export default HeaderComponent;
