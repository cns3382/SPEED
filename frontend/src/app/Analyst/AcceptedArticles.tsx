import { useEffect, useState } from 'react';
import "./style.css";

interface Submission {
    data: any[],
    analyseArticle: any
}

const AcceptedArticles: React.FC<Submission> = ({ data, analyseArticle}) => {
    return (
        <div className='accepted-articles-block'>
            <ul>
                <li className="accepted-articles-header">
                    <div className="accepted-col-1"> Article Name </div>
                    <div className="accepted-col-2"> Authors </div>
                    <div className="accepted-col-3"> Published Year </div>
                </li>
                {data.map((Article: any, i) => {
                    return (
                        <li className="accepted-articles-item" onClick={() => analyseArticle(i)}>
                            <div className="accepted-col-1"> {Article.title} </div>
                            <div className="accepted-col-2"> {Article.authors} </div>
                            <div className="accepted-col-3"> {Article.pubyear} </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default AcceptedArticles