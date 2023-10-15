import Image from 'next/image';
import PendingArticles from './PendingArticles';
import '../style.css';

export default function Home() {
  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Logout" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <div className="block">
        <h2 className="blockTitle">Moderator:</h2><br />
        <button> All Article Submissions</button>
        <PendingArticles/>
      </div>
    </main>
  )
}
