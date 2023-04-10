import { Link } from "react-router-dom";
import { PodcastInterface } from "@/models";
import { RouteKeys } from "@/constants";

type PodcastItemComponentProps = {
  podcast: PodcastInterface;
};

const PodcastItemComponent = ({ podcast }: PodcastItemComponentProps) => {
  return (
    <Link to={RouteKeys.podcast(podcast.id)}>
      <div className="relative w-64 h-44 border border-gray-100 rounded-xl shadow-lg">
        <div className="absolute bottom-[92px] left-14">
          <img
            className="block mx-auto h-36 rounded-full sm:mx-0 sm:shrink-0"
            src={podcast.urlImage}
          />
        </div>
        <div className="absolute top-1/2 w-full">
          <div className="text-sm leading-5 font-medium text-black px-3 py-2 text-center uppercase">
            {podcast.title}
          </div>
          <p className="text-slate-500 text-center text-sm px-3">
            Author: {podcast.author}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PodcastItemComponent;
