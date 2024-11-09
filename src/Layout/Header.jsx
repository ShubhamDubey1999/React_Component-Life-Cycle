import logo from "../Images/react.png";
const Header = () => {
  return (
    <div className="py-2 p-2" style={{ borderBottom: "1px solid #000" }}>
      <img style={{ height: "35px", verticalAlign: "top" }} src={logo} />
      <span className="h2 p-2 text-white-50">Component Life Cycle ~SDev</span>
    </div>
  );
};
export default Header;
