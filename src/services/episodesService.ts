import Parser from "rss-parser";
import { get } from "@/lib/api";
import { EpisodeInterface, PodcastDetailsInterface } from "@/models";

type PodcastDetailsResponse = {
  artistId: string;
  trackName: string; // title
  artistName: string; // author
  artworkUrl600: string;
  feedUrl: string;
};

type PodcastDetailDataResponse = {
  results: PodcastDetailsResponse[];
};

const PODCAST_DETAIL_URL = "https://itunes.apple.com/lookup?id=";
const parser = new Parser();

export const fetchEpisodesFromApi = async (
  url: string
): Promise<EpisodeInterface | undefined | any> => {
  try {
    console.log("ENV: ", process.env.NODE_ENV);
    /*     const data = await get<PodcastDetailDataResponse>(
      `${PODCAST_DETAIL_URL}${podcastId}`
    ); */
    console.log("url: ", url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rss = await parser.parseURL(url);
    return rss;
    /*     const podcastDetailsResponse = data.results[0];
    const podcast: PodcastInterface = {
      id: podcastDetailsResponse.artistId,
      title: podcastDetailsResponse.trackName,
      author: podcastDetailsResponse.artistName,
      urlImage: podcastDetailsResponse.artworkUrl600,
    };

    return { podcast, episodes: [] }; */
  } catch (error: unknown) {
    console.log("errror de episodio", error);
    throw Error("Error");
  }
};
