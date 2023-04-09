import { EpisodeInterface } from "@/models";

type EpisodeTableComponentProps = {
  episodes: EpisodeInterface[];
};

const EpisodeTableComponent = ({ episodes }: EpisodeTableComponentProps) => {
  return (
    <div className="px-6 py-2 border border-gray-100 rounded-xl shadow-lg">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="w-8/12 text-start py-4">Title</th>
            <th className="text-start py-4">Date</th>
            <th className="text-center py-4">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {episodes.map((episode) => {
            return (
              <tr
                className="odd:bg-white even:bg-slate-50 border-b border-slate-300"
                key={episode.id}
              >
                <td className="py-4">
                  <a href="" className="text-blue-600 font-medium">
                    {episode.title}
                  </a>
                </td>{" "}
                <td className=" py-4">{episode.date}</td>
                <td className="text-center py-4">{episode.duration}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodeTableComponent;
