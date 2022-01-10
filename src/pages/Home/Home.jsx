import { Link } from "react-router-dom";

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
