import Image from 'next/image';
import '../style.css';

export default function Home() {
  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Logout" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <br />
          <form className="block">
              <a href="/Accept"><input type="button" className="button returnButton" value="Accept" /></a> 
        <h2 className="blockTitle">Moderator:</h2><br />
              <h2 className="blockTitle">[PlaceHolder]</h2>
              <a href="/Decline"><input type="button" className="button returnButton" value="Decline" /></a>
      </form>
    </main>
  )
}
