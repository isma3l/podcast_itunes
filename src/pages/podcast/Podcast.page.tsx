import { Outlet } from "react-router-dom";

const PodcastPage = () => {
  return (
    <>
      <h1 style={{ backgroundColor: "blue" }}>PodcastPage</h1>
      <Outlet />
    </>
  );
};

export default PodcastPage;
