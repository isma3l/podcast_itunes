import { FilterComponent, PodcastListComponent } from "@/features/home";
import { PodcastItemInterface } from "@/models";
import { useState } from "react";

const podcasts: PodcastItemInterface[] = [
  {
    title: "pedro",
    author: "song explorer",
    id: "1q22",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "manuel",
    author: "lala mi cancion",
    id: "1q",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "jose",
    author: "lala explorer",
    id: "1eesq",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "ricardo",
    author: "song pollo",
    id: "1dwfffq",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "kexp",
    author: "song explorer",
    id: "1212q",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "kexp",
    author: "song explorer",
    id: "1tfhhhwq",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
  {
    title: "kexp",
    author: "song explorer",
    id: "1q3242vv",
    urlImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    description: "",
  },
];

const HomePage = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredPodcasts, setFilteredPodcasts] =
    useState<PodcastItemInterface[]>(podcasts);

  const handleChange = (value: string) => {
    const filteredList: PodcastItemInterface[] = podcasts.filter(
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
      <div className="self-end pe-6">
        <FilterComponent
          label={filteredPodcasts.length}
          value={query}
          onChange={handleChange}
        />
      </div>
      <PodcastListComponent podcasts={filteredPodcasts} />
    </div>
  );
};

export default HomePage;
