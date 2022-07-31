import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location= useLocation();
  
  return (
    <div className="footer">
        {location.pathname === '/' && <small className="reminder-click">(** Double click to chage Reminder)</small>}
        <p>Copyright &copy; NJ-Projects, 2022</p>
        <Link to="/about">About</Link>
    </div>
  )
}

export default Footer