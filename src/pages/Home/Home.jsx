import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";

export default function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <button>
        <Link to="/Login"> Login </Link>
      </button>
      <button>
        <Link to="/Register"> Register </Link>
      </button>
      
    </div>
  );
}
