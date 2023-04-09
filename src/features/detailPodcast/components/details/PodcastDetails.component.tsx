import { useCustomOutletContext } from "@/hooks";
import EpisodeTableComponent from "../episodesTable/EpisodesTable.component";
import { ContextPodcastDetails } from "../../types/contextPodcastDetails";

const PodcastDetailsComponent = () => {
  const { podcastDetails } = useCustomOutletContext<ContextPodcastDetails>();
  return (
    <div className="w-8/12 justify-end">
      <EpisodeTableComponent episodes={[]} />
    </div>
  );
};

export default PodcastDetailsComponent;
