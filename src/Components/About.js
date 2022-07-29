import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
        <h3>This is React JS App</h3>
        <h4>Version 1.0.0</h4>
        <Link to="/">Go Back</Link>
    </div>
  )
}

export default About