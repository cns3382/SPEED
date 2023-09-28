import Image from 'next/image';
import './style.css';

export default function Home() {
  return (
    <main id="main">
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <a href="./Search"><input type="button" className="button" value="Search" /></a><br /><br />
      <a href="./Login"><input type="button" className="button" value="Login" /></a>
    </main>
  )
}
