import { Outlet, useParams } from "react-router-dom";
import { PodcastCardComponent } from "@/features/detailPodcast/components";
import { useLoaderContext } from "@/hooks";
import { useEffect, useState } from "react";
import { PodcastDetailsInterface } from "@/models";
import { fetchPodcastDetails } from "@/services/podcastDetailsService";

const podcastDetailEmpty: PodcastDetailsInterface = {
  episodes: [],
  podcast: {
    id: "",
    title: "",
    author: "",
    urlImage: "",
  },
};

const PodcastDetailsPage = () => {
  const urlParams = useParams();
  const [error, setError] = useState(false);
  const { state, showLoading, hideLoading } = useLoaderContext();
  const [podcastDetails, setPodcastDetails] =
    useState<PodcastDetailsInterface>(podcastDetailEmpty);

  const { podcast, episodes } = podcastDetails;

  useEffect(() => {
    const getPodcastDetails = async () => {
      try {
        showLoading();
        const data = await fetchPodcastDetails(urlParams.podcastId ?? "");
        if (data) setPodcastDetails(data);
        console.log("dataaa: ", data);
      } catch (err: unknown) {
        setError(true);
      } finally {
        hideLoading();
      }
    };

    void getPodcastDetails();
  }, []);

  return (
    <div className="flex py-6 justify-between">
      {error ? (
        "Error"
      ) : state.loading ? (
        "Cargando..."
      ) : (
        <>
          <PodcastCardComponent
            title={podcast.title}
            author={podcast.author}
            urlImage={podcast.urlImage}
            description={podcast?.description ?? ""}
          />
          <Outlet context={{ podcastDetails }} />
        </>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
