import { Route, Routes } from "react-router-dom";
import {
  PodcastDetailsComponent,
  PodcastEpisodeComponent,
} from "./features/detailPodcast";
import { HomePage, LayoutPage, PodcastDetailsPage, UnknownPage } from "./pages";
import { LoaderDataProvider } from "./context";

function App() {
  return (
    <LoaderDataProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="podcast/:podcastId" element={<PodcastDetailsPage />}>
            <Route index element={<PodcastDetailsComponent />} />
            <Route
              path="episode/:episodeId"
              element={<PodcastEpisodeComponent />}
            />
          </Route>
          <Route path="*" element={<UnknownPage />} />
        </Route>
      </Routes>
    </LoaderDataProvider>
  );
}

export default App;
