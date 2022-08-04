import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src={movie.video} />
    </div>
  );
};

export default Watch;
