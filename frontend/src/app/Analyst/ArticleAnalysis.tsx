import { useState } from 'react';
import axios from 'axios';
import './style.css'
interface Analysis {
    goBack: any
    articleData : any
    finishAnalysis : any
}

const ArticleAnalysis : React.FC<Analysis> = ({ goBack, articleData, finishAnalysis}) => {
    const [SEPractice, setSEPractice] = useState("");
    const [Claim, setClaim] = useState("");
    const [evidence, setEvidence] = useState("");
    const [Result, setResult] = useState("");
    

    return (
        <div className='article-analysis-block'>
            <button onClick={() => goBack()}> Back </button>
            <div className='analysis-item analysis-title'>Title: { articleData.title }</div>
            <div className='analysis-item'>Author(s): { articleData.authors}</div>
            <div className='analysis-item'>DOI: { articleData.doi }</div>
            <div className='analysis-item'>Published Year: { articleData.pubyear }</div>
            <div>
                <h2 className='analysis-item'> Summary: </h2>
                <div className='analysis-summary'>
                    { articleData.summary }
                </div>
            </div>
            <div className='analysis-item'>
                <label> SE Practice: <input className='inputs' value={SEPractice} onChange={e => setSEPractice(e.target.value)}/></label>
                <label> Claim: <input className='inputs'value={Claim} onChange={e => setClaim(e.target.value)}/></label>
                <label> Evidence </label>
                <select className='inputs' value={evidence} onChange={e => setEvidence(e.target.value)}>
                    <option value="weak support"> weak support </option>
                    <option value="weak against"> weak against </option>
                    <option value="moderate support"> moderate support </option>
                    <option value="moderate against"> moderate against </option>
                    <option value="strong support"> strong support </option>
                    <option value="strong against"> strong against </option>
                </select>
                <label> Result: <input className='inputs' value={Result} onChange={e => setResult(e.target.value)}/></label>
            </div>
            <div className='analysis-buttons'>
                <button className='analysis-button' onClick={() => finishAnalysis(articleData, Claim, evidence, SEPractice, Result)}> Done </button>
            </div>
        </div>
    );
}
export default ArticleAnalysis;