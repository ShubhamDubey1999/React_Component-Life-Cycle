import CycleClassPage from "../Components/CycleClassPage";
import Header from "./Header";
import Footer from "./Footer";

const MainBody = () => {
  return (
    <div>
      <Header />
      <div className="col-12 row text-white">
        <div className="col-6">
          <h1>Class Component</h1>
          <CycleClassPage />
        </div>
        <div className="col-6">
          <h1>Function Based component</h1>
        </div>
      </div>
    </div>
  );
};
export default MainBody;