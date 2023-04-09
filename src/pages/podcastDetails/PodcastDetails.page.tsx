import { Outlet } from "react-router-dom";
import { PodcastCardComponent } from "@/features/detailPodcast/components";
import { useLoaderContext } from "@/hooks";
import { useState } from "react";
import { PodcastDetailsInterface } from "@/models";

const PodcastDetailsPage = () => {
  const { state, showLoading, hideLoading } = useLoaderContext();
  const [error, setError] = useState(false);
  const [podcastDetails, setpodcastDetails] =
    useState<PodcastDetailsInterface | null>();

  return (
    <div className="flex py-6 justify-between">
      <PodcastCardComponent
        title={""}
        author={""}
        urlImage={
          "https://ssl-static.libsyn.com/p/assets/6/5/5/a/655a79b7f130e7cde5bbc093207a2619/JBN_Apple_Podcast.jpg"
        }
        description={""}
      />
      <Outlet context={{ podcastDetails }} />
    </div>
  );
};

export default PodcastDetailsPage;
