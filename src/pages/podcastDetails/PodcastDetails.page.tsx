import { Outlet } from "react-router-dom";
import { PodcastCardComponent } from "@/features/detailPodcast/components";

const PodcastDetailsPage = () => {
  return (
    <div className="flex flex-col py-6">
      <PodcastCardComponent
        title={""}
        author={""}
        urlImage={
          "https://ssl-static.libsyn.com/p/assets/6/5/5/a/655a79b7f130e7cde5bbc093207a2619/JBN_Apple_Podcast.jpg"
        }
        description={""}
      />
    </div>
  );
};

export default PodcastDetailsPage;
