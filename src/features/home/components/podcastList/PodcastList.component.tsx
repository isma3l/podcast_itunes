import { PodcastInterface } from "@/models";
import ItemListComponent from "../item/PodcastItem.component";

type PodcastListComponentProps = {
  podcasts: PodcastInterface[];
};

const PodcastListComponent = ({ podcasts }: PodcastListComponentProps) => {
  return (
    <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-40 justify-items-center">
      {podcasts.map((podcast) => (
        <ItemListComponent key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastListComponent;
