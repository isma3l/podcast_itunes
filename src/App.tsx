import { Route, Routes } from "react-router-dom";
import { LoaderDataProvider } from "./context";
import { RouteKeys } from "./constants";
import { HomePage, LayoutPage, PodcastDetailsPage, UnknownPage } from "./pages";
import {
  PodcastDetailsComponent,
  PodcastEpisodeComponent,
} from "./features/detailPodcast";

function App() {
  return (
    <LoaderDataProvider>
      <Routes>
        <Route path={RouteKeys.base} element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route
            path={RouteKeys.podcastDetails}
            element={<PodcastDetailsPage />}
          >
            <Route index element={<PodcastDetailsComponent />} />
            <Route
              path={RouteKeys.episodeDetails}
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
