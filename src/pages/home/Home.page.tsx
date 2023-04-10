import { useEffect, useState } from "react";
import { FilterComponent, PodcastListComponent } from "@/features/home";
import { PodcastInterface } from "@/models";
import { fetchPodcasts } from "@/services";
import { useLoaderContext } from "@/hooks";
import { MessageComponent } from "@/components/atoms";

const HomePage = () => {
  const [error, setError] = useState(false);
  const [query, setQuery] = useState<string>("");
  const { state, showLoading, hideLoading } = useLoaderContext();
  const [podcasts, setPodcasts] = useState<PodcastInterface[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<PodcastInterface[]>(
    []
  );

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
    const filteredList: PodcastInterface[] = podcasts?.filter(
      (podcast: PodcastInterface) => {
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
        <MessageComponent
          message={"There was an error in obtaining the podcast listing."}
        />
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
