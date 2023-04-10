import { useParams } from "react-router-dom";
import { useCustomOutletContext } from "@/hooks";
import { ContextPodcastDetails } from "../../types/contextPodcastDetails";
import AudioControlComponent from "../audioControl/AudioControl.component";

const PodcastEpisodeComponent = () => {
  const urlParams = useParams();
  const { podcastDetails } = useCustomOutletContext<ContextPodcastDetails>();

  const episodes = podcastDetails?.episodes ?? [];
  const episode = episodes.find((ep) => ep.id === urlParams.episodeId);

  if (episode === undefined) return null;

  return (
    <div className="w-8/12 justify-end">
      <div className="px-6 py-5 border border-gray-100 rounded-sm shadow-lg">
        <div className="border-b-2 border-gray-200 pb-4">
          <p className="text-xl font-bold">{episode.title}</p>
          <div
            className="mt-2 italic font-normal text-gray-600"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
        <AudioControlComponent url={episode.audioUrl} />
      </div>
    </div>
  );
};

export default PodcastEpisodeComponent;
