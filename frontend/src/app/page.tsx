import Image from 'next/image';
import './style.css';

export default function Home() {
  return (
    <main id="main">
      <h1 className="projectName">SPEED</h1><br />
      <form className="block">
        <h2 className="blockTitle">Search:</h2><br />
        <label className="inputLabel">SE Practice: </label>
        <select required id="SEPractice" className="inputValue"><option value="Practice_1">Practice_1</option><option value="Practice_2">Practice_2</option><option value="Practice_3">Practice_3</option><option value="Practice_4">Practice_4</option></select><br />
        <label className="inputLabel">Claim: </label>
        <select required id="claim" className="inputValue"><option value="Claim_1">Claim_1</option><option value="Claim_2">Claim_2</option><option value="Claim_3">Claim_3</option><option value="Claim_4">Claim_4</option></select><br />
        <label className="inputLabel">Published Year: </label>
        <input type="number" id='publishYear' className="inputValue" max={2030} min={1900}></input><br /><br />
        <input type='submit' className="searchButton" value="Search"></input>
    </form>
      <br />
      <div id="result">
        <table className="block">
          <tr className="tableHeader">
            <td>SE Practice</td>
            <td>Paper Name</td>
            <td>Summary</td>
            <td>Author</td>
            <td>Publish Year</td>
            <td>Claim</td>
            <td>Evidence</td>
            <td>Result</td>
          </tr>
        </table>
      </div>
    </main>
  )
}
