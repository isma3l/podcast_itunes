import { Card } from "flowbite-react";

type PodcastCardComponentProps = {
  title: string;
  author: string;
  urlImage: string;
  description: string;
};

const PodcastCardComponent = ({
  title,
  author,
  urlImage,
  description,
}: PodcastCardComponentProps) => {
  return (
    <div className="max-w-xs">
      <Card>
        <div className="border-b-2 border-gray-200 pb-6 px-6">
          <img
            className="block mx-auto sm:mx-0 sm:shrink-0 rounded"
            src={urlImage}
          />
        </div>
        <div className="border-b-2 border-gray-200 pb-5">
          <p className="text-lg font-bold text-gray-900 leading-6">{title}</p>
          <p className="font-medium italic text-base text-gray-700">{author}</p>
        </div>
        <div>
          <p className="text-base font-bold text-gray-900">Description:</p>
          <span className="font-medium italic text-base text-gray-700">
            {description}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default PodcastCardComponent;
