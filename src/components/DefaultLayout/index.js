import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <div className="container">{children}</div>
    </div>
  );
}

export default DefaultLayout;
