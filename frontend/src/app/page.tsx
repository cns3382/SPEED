'use client'

import './style.css';

export default function Home() {
  
  async function loadData() {
    console.log("test");

    var dataJson = await fetch('https://speed-test-delta-three.vercel.app/api/articles/all-articles', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}}
        )
        var dataList = "";

        await dataJson.json().then(result => dataList = result);

        console.log(dataList);
  }

  function toggleColumn(column: number) {
    var array = document.getElementById("resultsTable")!.children;
    for (let index = 0; index < array.length; index++) {
      var element = array[index].children.item(column) as HTMLElement;
      element.hidden = !element.hidden;
    }
  };

  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Login" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <form className="block">
        <h2 className="blockTitle">Search:</h2><br />
        <label className="inputLabel">SE Practice: </label>
        <select required id="inputSEPractice" className="inputValue"><option value="Practice_1">Practice_1</option><option value="Practice_2">Practice_2</option><option value="Practice_3">Practice_3</option><option value="Practice_4">Practice_4</option></select><br />
        <label className="inputLabel">Claim: </label>
        <select required id="inputClaim" className="inputValue"><option value="Claim_1">Claim_1</option><option value="Claim_2">Claim_2</option><option value="Claim_3">Claim_3</option><option value="Claim_4">Claim_4</option></select><br />
        <label className="inputLabel">Published Year: </label>
        <input type="number" id='inputPublishYear' className="inputValue" max={2030} min={1900}></input><br /><br />
        <input type='submit' className="button" value="Search"></input>
        <input type='button' className="button" value="TEST" onClick={loadData}></input>
      </form>
      <br />
      <div className="block">
        <table id="hideTable">
          <tr>
            <th>Hide SE Practice?</th>
            <th>Hide Paper Name?</th>
            <th>Hide Summary?</th>
            <th>Hide Author?</th>
            <th>Hide Publish Year?</th>
            <th>Hide Claim?</th>
            <th>Hide Evidence?</th>
            <th>Hide Result?</th>
          </tr>
          <tr>
            <td><input type="checkbox" onClick={() => toggleColumn(0)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(1)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(2)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(3)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(4)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(5)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(6)} /></td>
            <td><input type="checkbox" onClick={() => toggleColumn(7)} /></td>
          </tr>
        </table>
        </div>
        <br />
        <div id="queryResult" className="block">
        <table id="resultsTable">
          <tr>
            <th>SE Practice</th>
            <th>Paper Name</th>
            <th>Summary</th>
            <th>Author</th>
            <th>Publish Year</th>
            <th>Claim</th>
            <th>Evidence</th>
            <th>Result</th>
          </tr>
          <tr>
            <td>SE Practice</td>
            <td>Paper Name</td>
            <td>Summary</td>
            <td>Autdor</td>
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
