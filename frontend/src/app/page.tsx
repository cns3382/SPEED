import Image from 'next/image';
import './style.css';

export default function Home() {
  return (
    <main id="main">
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <a href="./Search"><input type="submit" className="button" value="Search"></input></a><br /><br />
      <a href="./Login"><input type="submit" className="button" value="Login"></input></a>
    </main>
  )
}
