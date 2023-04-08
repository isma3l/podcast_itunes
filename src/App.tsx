import { Route, Routes } from "react-router-dom";
import {
  PodcastDetailsComponent,
  PodcastEpisodeComponent,
} from "./features/podcast";
import { HomePage, PodcastPage, LayoutPage, UnknownPage } from "./pages";
import { LoaderDataProvider } from "./context";

function App() {
  return (
    <LoaderDataProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="podcast/:podcastId" element={<PodcastPage />}>
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

/**
 *      <Route index element={<HomePage />}>
          <Route path="/podcast/:podcastId" element={<PodcastDetailsComponent />}
        </Route>
 */
