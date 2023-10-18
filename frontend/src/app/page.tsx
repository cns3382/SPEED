'use client'

import './style.css';

export default function Home() {
  // Map DataType
  type MapType = { 
    [id: string]: string; 
  }

  // Global Variables
  var columnHidden = [false, false, false, false, false, false, false, false, false]; // Column Hidden Values
  var queriesStored = 0; // Number of currently stored queries

  // Loads certain data when the page first gets loaded
  async function loadStartUpData() {
    // Get data from API
    var dataJson = await fetch('https://speed-test-delta-three.vercel.app/api/articles/all-articles', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}}
    )
    var dataList:MapType[] = [{["test"]: "test"}];
    await dataJson.json().then(result => dataList = result);

    // Loads all SE Practices
    var setSEPracticeOptions = "<option value='' />";
    var allSEPractices:string[] = [];
    for (var article = 0; article < dataList.length; article++) {
      var currentPractice = dataList[article].sepractice;
      if (!allSEPractices.includes(currentPractice)) {
        setSEPracticeOptions = setSEPracticeOptions + "<option value='" + currentPractice + "'>" + currentPractice + "</option>"
        allSEPractices.push(currentPractice);
      }
    }
    document.getElementById("inputSEPractice")!.innerHTML = setSEPracticeOptions;

    // Loads all claims from each SE Practice
    var setClaimsOptions = "<option value='' />";
    var allClaims:string[] = [];
    for (var article = 0; article < dataList.length; article++) {
      var currentClaim = dataList[article].claim;
      if (!allClaims.includes(currentClaim)) {
        setClaimsOptions = setClaimsOptions + "<option value='" + currentClaim + "'>" + currentClaim + "</option>"
        allClaims.push(currentClaim);
      }
    }
    document.getElementById("inputClaim")!.innerHTML = setClaimsOptions;

    // Loads the saved query data
    var setQueryOptions = "";
    queriesStored = window.localStorage.length;
    for (var i = 1; i <= window.localStorage.length; i++) {
      var query = window.localStorage.getItem(i as unknown as string);
      setQueryOptions = setQueryOptions + "<option value='" + query + "'>" + query + "</option>"
    }
    document.getElementById("savedQueries")!.innerHTML = setQueryOptions;
  }

  // Loads Search Results
  async function loadData() {
    // Hides results and search button, and shows loading phrase
    document.getElementById("queryResults")!.style.display = "none";
    document.getElementById("noResults")!.style.display = "none";
    document.getElementById("resultsTable")!.style.display = "none";
    document.getElementById("searchButton")!.hidden = true;
    document.getElementById("loading")!.hidden = false;

    // Initial header and column information
    var setHTML = "<tr id='resultsTableHeader'>" + document.getElementById("resultsTableHeader")?.innerHTML + "</tr>";
    var initialHTML = setHTML;
    var columnNum = document.getElementById("resultsTableHeader")!.childElementCount;
 
    // Get data from API
    var dataJson = await fetch('https://speed-test-delta-three.vercel.app/api/articles/all-articles', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}}
    )
    var dataList:MapType[] = [{["test"]: "test"}];
    await dataJson.json().then(result => dataList = result);

    // Fixes Publish Year Values
    for (var article = 0; article < dataList.length; article++) {
      dataList[article]["pubyear"] = dataList[article]["pubyear"].split("-")[0];
    };

    // Sorts dataList by user inputs
    var newDataList:MapType[] = [];
    var dataListElements = ["sepractice", "claim", "pubyear"];
    var userInputArticleAPIElements = ["inputSEPractice", "inputClaim", "inputPublishYear"];
    for (var article = 0; article < dataList.length; article++) {
      var checkValidNum = 0;

      for (var element = 0; element < dataListElements.length; element++) {
        var userElementInput = (document.getElementById(userInputArticleAPIElements[element]) as HTMLInputElement).value;
        if (dataList[article][dataListElements[element]] == userElementInput || userElementInput == "") {
          checkValidNum++;
        }
      };

      if (userInputArticleAPIElements.length == checkValidNum) {
        newDataList.push(dataList[article]);
      }
    };

    setHTML += convertDataToTable(newDataList, columnNum);

    console.log(dataList);
    console.log(setHTML);

    // Loads information into table
    document.getElementById("resultsTable")!.innerHTML = setHTML;
    if (setHTML != initialHTML) { // If relevant articles are found
      document.getElementById("noResults")!.style.display = "none";
      document.getElementById("resultsTable")!.style.display = "block";
    } else { // If no relevant articles are found
      document.getElementById("noResults")!.style.display = "block";
      document.getElementById("resultsTable")!.style.display = "none";
    }
    document.getElementById("queryResults")!.style.display = "block";

    // Hides loading phrase and shows search button
    document.getElementById("searchButton")!.hidden = false;
    document.getElementById("loading")!.hidden = true;
  }

  // Prepares information by placing them in proper table format
  function convertDataToTable(dataList:MapType[], columnNum:number) {
    var returnString = "";
    var articleAPIElements = ["sepractice", "title", "summary", "authors", "pubyear", "claim", "evidence", "result", "doi"];

    for (var article = 0; article < dataList.length; article++) {
      returnString += "<tr>";
      for (var element = 0; element < columnNum; element++) {
        var elementResult = dataList[article][articleAPIElements[element]];
        returnString += "<td " + (columnHidden[element] ? "hidden" : "") + ">" + (articleAPIElements[element] == "doi" ? "<a href='" + elementResult + "'>" : "") + elementResult + (articleAPIElements[element] == "doi" ? "</a>" : "") + "</td>";
      }
      returnString += "</tr>";
    };

    return returnString;
  }

  // Toggles the column based on the number given
  function toggleColumn(column: number) {
    var array = document.getElementById("resultsTable")!.children.item(0)!.children;
    columnHidden[column] = !columnHidden[column];
    for (let index = 0; index < array.length; index++) {
      var element = array[index].children.item(column) as HTMLElement;
      element.hidden = !element.hidden;
    }
  };

  // Saves a query to local storage
  function saveQuery() {
    var queryString = "";
    queryString += (document.getElementById("inputSEPractice") as HTMLInputElement).value + ", ";
    queryString += (document.getElementById("inputClaim") as HTMLInputElement).value + ", ";
    queryString += (document.getElementById("inputPublishYear") as HTMLInputElement).value;

    window.localStorage.setItem((queriesStored + 1) + "", queryString);
    document.getElementById("savedQueries")!.innerHTML = document.getElementById("savedQueries")!.innerHTML + "<option value='" + queryString + "'>" + queryString + "</option>"
  }

  // Loads a query from local storage
  function loadQuery() {
    var queryString = (document.getElementById("savedQueries") as HTMLInputElement).value.split(", ");
    
    (document.getElementById("inputSEPractice") as HTMLInputElement).value = queryString[0];
    (document.getElementById("inputClaim") as HTMLInputElement).value = queryString[1];
    (document.getElementById("inputPublishYear") as HTMLInputElement).value = queryString[2];
  }

  loadStartUpData();

  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Login" /></a>
      <h1 className="projectName">SPEED</h1>
      <div id="queryBlock" className="block">
        <input type="button" className="button queryElement" value="Save Current Query" onClick={saveQuery} /><br />
        <input type="button" className="button queryElement" value="Load Query" onClick={loadQuery} />
        <select required id="savedQueries" className="inputValue queryElement"></select>
      </div>
      <form className="block">
        <h1 className="blockTitle">Search:</h1>
        <label className="inputLabel">SE Practice: </label>
        <select required id="inputSEPractice" className="inputValue"></select><br />
        <label className="inputLabel">Claim: </label>
        <select required id="inputClaim" className="inputValue"></select><br />
        <label className="inputLabel">Published Year: </label>
        <input type="number" id='inputPublishYear' className="inputValue" max={2030} min={1900} /><br /><br />
        <input id="searchButton" type='button' className="button" value="Search" onClick={loadData} />
        <h1 id="loading" className="blockTitle" hidden>Loading...</h1>
      </form>
      <br />
      <div className="block">
        <table id="hideTable">
          <tbody>
          <tr>
            <th>Hide SE Practice?</th>
            <th>Hide Paper Name?</th>
            <th>Hide Summary?</th>
            <th>Hide Author?</th>
            <th>Hide Publish Year?</th>
            <th>Hide Claim?</th>
            <th>Hide Evidence?</th>
            <th>Hide Result?</th>
            <th>Hide DOI?</th>
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
            <td><input type="checkbox" onClick={() => toggleColumn(8)} /></td>
          </tr>
          </tbody>
        </table>
          </div>
          <a href="/Articles"><input type="button" className="button returnButton" value="Insert Article" /></a>
      <br />
      <div id="queryResults" className="block">
        <h1 id="noResults" className="blockTitle">No Results Found!</h1>
        <table id="resultsTable">
          <tbody>
          <tr id="resultsTableHeader">
            <th>SE Practice</th>
            <th>Paper Name</th>
            <th>Summary</th>
            <th>Author</th>
            <th>Publish Year</th>
            <th>Claim</th>
            <th>Evidence</th>
            <th>Result</th>
            <th>DOI</th>
          </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
