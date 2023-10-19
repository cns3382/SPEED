'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import PendingArticles from './PendingArticles';
import ArticleModeration from './ArticleModeration';
import '../style.css';

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
          // Filter for pending articles
          setSubmissionList(res.data.filter((submission: { status: string; }) => submission.status === 'pending'))
        })
        .catch((err) => {
          console.log("Error loading article submissions in Moderator page.tsx");
        })
  }

  const showArticle = () => {
    setPageState("moderation");
  }

  const moderateArticle = (id : number) => {
    setSelected(ArticleSubmissions[id]);
    showArticle();
  }

  const goBack = () => {
    setSelected(null);
    setPageState("list");
  }

  const acceptArticle = (data : any) => {
    data.status = "pending-analysis";
    axios.put("https://speed-test-delta-three.vercel.app/api/articles/article-submissions/" + data._id, data)
        .then((res) => {
          getSubmissions();
          goBack();
        })
        .catch((err) => {
          console.log('Error accepting article in Moderator page.tsx');
        });
  }

  const rejectArticle = (data : any) => {
    data.status = "rejected";
    axios.put("https://speed-test-delta-three.vercel.app/api/articles/article-submissions/" + data._id, data)
        .then((res) => {
          getSubmissions();
          goBack();
        })
        .catch((err) => {
          console.log('Error rejecting article in Moderator page.tsx');
        });
  }

  const deleteArticle = (data : any) => {
    axios.delete("https://speed-test-delta-three.vercel.app/api/articles/article-submissions/" + data._id)
        .then((res) => {
          getSubmissions();
          goBack();
        })
        .catch((err) => {
          console.log('Error deleting article in Moderator page.tsx')
        })
  }
  
  return (
    <main id="main">
      <a href="/Login"><input type="button" className="button returnButton" value="Logout" /></a>
      <h1 className="projectName">SPEED</h1><br />
      <br />
      <div className="block">
        <h2 className="blockTitle">Moderator:</h2><br />
        <button> All Article Submissions</button>
        { 
          PageState === "list" ? 
          <PendingArticles 
            data={ArticleSubmissions} 
            moderateArticle={moderateArticle}
          /> : null 
        }
        { 
          PageState === "moderation" ? 
          <ArticleModeration 
            goBack={goBack} 
            articleData={selected}
            acceptArticle={acceptArticle}
            rejectArticle={rejectArticle}
            deleteArticle={deleteArticle}
          /> : null 
        }
      </div>
    </main>
  )
}
