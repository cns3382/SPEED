'use client'

import axios from 'axios';
import '../style.css';
import AcceptedArticles from './AcceptedArticles';
import { useState, useEffect } from 'react';
import ArticleAnalysis from './ArticleAnalysis';


export default function Home() {
  const [ArticleSubmissions, setSubmissionList] = useState<any>([]);
  const [selected, setSelected] = useState(Object);
  const [PageState, setPageState] = useState("list");

  useEffect(() => {
    // Get article submissions data
    getSubmissions();
  }, [])

  const getSubmissions = () => {
    axios.get('https://speed-test-delta-three.vercel.app/api/articles/article-submissions')
        .then((res) => {
          // Filter for articles pending analysis
          setSubmissionList(res.data.filter((submission: { status: string; }) => submission.status === 'pending-analysis'))
        })
        .catch((err) => {
          console.log("Error loading article submissions in Analyst page.tsx");
        })
  }

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

  const finishAnalysis = (articleData : any, claim : any, evidence : any, se_practice : any, result : any) => {
    const newArticle = {
        _id: articleData._id,
        title: articleData.title,
        authors: articleData.authors,
        doi: articleData.doi,
        pubyear: articleData.pubyear,
        claim: claim,
        evidence: evidence,
        se_practice: se_practice,
        result: result,
        summary: articleData.summary,
    }

    axios.post("https://speed-test-delta-three.vercel.app/api/articles/all-articles", newArticle)
    .catch((err) => {
      console.log("Error submitting article in Analyst page.tsx");
    })

    articleData.status = "accepted"
    axios.put("https://speed-test-delta-three.vercel.app/api/articles/article-submissions/" + articleData._id, articleData)
    .then((res) => {
      getSubmissions();
      goBack();
    })
    .catch((err) => {
      console.log("Error occured in Analyst page.tsx");
    })
}

  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Logout" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <form className="block">
        <h2 className="blockTitle">Analyst:</h2><br />
        { PageState === "list" ? <AcceptedArticles data={ArticleSubmissions} analyseArticle={analyseArticle}/> : null }
        { PageState === "analysis" ? <ArticleAnalysis goBack={goBack} articleData={selected} finishAnalysis={finishAnalysis}/> : null}
      </form>
    </main>
  )
}
