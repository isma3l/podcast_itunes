import { Outlet } from "react-router-dom";
import { Header } from "../../components/atoms";

const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutPage;
