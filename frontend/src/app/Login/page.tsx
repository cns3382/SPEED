import Image from 'next/image';
import '../style.css';

export default function Home() {
  return (
    <main id="main">
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <form className="block">
        <h2 className="blockTitle">Login:</h2><br />
        <label className="inputLabel">Username: </label>
        <input required id="username" className="inputValue"></input><br />
        <label className="inputLabel">Password: </label>
        <input required id="password" className="inputValue"></input><br />
        <input type='submit' className="button" value="Login"></input>
    </form>
    </main>
  )
}
