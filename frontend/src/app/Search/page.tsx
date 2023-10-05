'use client'

import '../style.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [displayColumns, setDisplayColumns] = useState({
    sePractice : true,
    paperName : true,
    summary : true,
    author : true,
    pubYear : true,
    claim : true,
    evidence : true,
    result : true
  });

  const toggleColumn = (col : any) => {
    console.log(col);
  }

  return (
    <main id="main">
      <a href="/"><input type="button" className="button returnButton" value="Back" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <form className="block">
        <h2 className="blockTitle">Search:</h2><br />
        <label className="inputLabel">SE Practice: </label>
        <select required id="SEPractice" className="inputValue"><option value="Practice_1">Practice_1</option><option value="Practice_2">Practice_2</option><option value="Practice_3">Practice_3</option><option value="Practice_4">Practice_4</option></select><br />
        <label className="inputLabel">Claim: </label>
        <select required id="claim" className="inputValue"><option value="Claim_1">Claim_1</option><option value="Claim_2">Claim_2</option><option value="Claim_3">Claim_3</option><option value="Claim_4">Claim_4</option></select><br />
        <label className="inputLabel">Published Year: </label>
        <input type="number" id='publishYear' className="inputValue" max={2030} min={1900}></input><br /><br />
        <input type='submit' className="button" value="Search"></input>
    </form>
      <br />
      <div id="result">
        <div className='block'> 
          <button onClick={() => toggleColumn(displayColumns.sePractice)}> Test </button>
        </div>
        <table className="block">
          <tr className="tableHeader">
            {displayColumns.sePractice ? <td>SE Practice</td> : undefined}
            {displayColumns.paperName ? <td>Paper Name</td> : undefined}
            {displayColumns.summary ? <td>Summary</td> : undefined}
            {displayColumns.author ? <td>Author</td> : undefined}
            {displayColumns.pubYear ? <td>Publish Year</td> : undefined}
            {displayColumns.claim ? <td>Claim</td> : undefined}
            {displayColumns.evidence ? <td>Evidence</td> : undefined}
            {displayColumns.result ? <td>Result</td> : undefined}
          </tr>
          <tr>
            {displayColumns.sePractice ? <td> Test Driven Development </td> : undefined}
            {displayColumns.paperName ? <td> This is a long article name that would test the limits of an HTML table </td> : undefined}
            {displayColumns.summary ? <td> I dont know how to read </td> : undefined}
            {displayColumns.author ? <td> J. Yuan </td> : undefined}
            {displayColumns.pubYear ? <td> 2023 </td> : undefined}
            {displayColumns.claim ? <td> TDD </td> : undefined}
            {displayColumns.evidence ? <td> Moderate Support </td> : undefined}
            {displayColumns.result ? <td> What's this for? </td> : undefined}
          </tr>
        </table>
      </div>
    </main>
  )
}
