import { FilterComponent, PodcastListComponent } from "@/features/home";
import { PodcastItemInterface } from "@/models";
import { useEffect, useState } from "react";
import { fetchPodcasts } from "@/services";
import { useLoaderContext } from "@/hooks";

const HomePage = () => {
  const [error, setError] = useState(false);
  const [query, setQuery] = useState<string>("");
  const { state, showLoading, hideLoading } = useLoaderContext();
  const [podcasts, setPodcasts] = useState<PodcastItemInterface[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<
    PodcastItemInterface[]
  >([]);

  useEffect(() => {
    const getPodcasts = async () => {
      try {
        showLoading();
        const data = await fetchPodcasts();
        setPodcasts(data ?? []);
        setFilteredPodcasts(data ?? []);
      } catch (err: unknown) {
        setError(true);
      } finally {
        hideLoading();
      }
    };

    void getPodcasts();
  }, []);

  const handleChange = (value: string) => {
    const filteredList: PodcastItemInterface[] = podcasts?.filter(
      (podcast: PodcastItemInterface) => {
        return (
          podcast.title.toLowerCase().search(value.toLowerCase()) !== -1 ||
          podcast.author.toLowerCase().search(value.toLowerCase()) !== -1
        );
      }
    );
    setQuery(value);
    setFilteredPodcasts(filteredList);
  };

  return (
    <div className="flex flex-col py-6">
      {error ? (
        "Error"
      ) : state.loading ? (
        "Cargando..."
      ) : (
        <>
          <div className="self-end pe-6">
            <FilterComponent
              label={filteredPodcasts.length}
              value={query}
              onChange={handleChange}
            />
          </div>
          <PodcastListComponent podcasts={filteredPodcasts} />
        </>
      )}
    </div>
  );
};

export default HomePage;
