'use client'

import axios from 'axios';
import '../style.css';
import AcceptedArticles from './AcceptedArticles';
import { useState, useEffect } from 'react';
import ArticleAnalysis from './ArticleAnalysis';

const test_articles = [
  {
    "_id":{"$oid":"6525fba34e88c7028376e2f7"},
    "title":"Svarog's Study on Test Driven Development",
    "authors":"Svarog",
    "doi":"http://BecauseWeAreFamily.com",
    "source":"Ten Lords Commission?",
    "summary" : "TDD = Belebog Safe",
    "pubyear":"7530",
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6525fba34e88c7028376e2f8"},
    "title":"Cloud Knights Development Doctrine v4",
    "authors":"Jingliu",
    "doi":"http://JingliuFoldsYanqing.com",
    "source":"Ten Lords Commission?",
    "pubyear":"7566",
    "summary" : "Yanqing shud be villain at this point",
    "__v":{"$numberInt":"0"}
  },
]

export default function Home() {
  const [ArticleSubmissions, setSubmissionList] = useState<any>([]);
  const [selected, setSelected] = useState(Object);
  const [PageState, setPageState] = useState("list");

  useEffect(() => {
    // Get article submissions data
    axios.get('http://localhost:8082/api/articles/article-submissions')
        .then((res) => {
          // Filter for pending articles
          setSubmissionList(res.data.filter((submission: { status: string; }) => submission.status === 'pending-analysis'))
        })
        .catch((err) => {
          console.log("Error from Analyst page.tsx");
        })
  }, [])

  const goBack = () => {
    setSelected(null);
    setPageState("list");
  }

  const showArticle = () => {
    setPageState("analysis");
  }

  const analyseArticle = (id : number) => {
    setSelected(ArticleSubmissions[id]);
    showArticle();
  }

  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Logout" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <form className="block">
        <h2 className="blockTitle">Analyst:</h2><br />
        { PageState === "list" ? <AcceptedArticles data={ArticleSubmissions} analyseArticle={analyseArticle}/> : null }
        { PageState === "analysis" ? <ArticleAnalysis goBack={goBack} articleData={selected}/> : null}
      </form>
    </main>
  )
}
