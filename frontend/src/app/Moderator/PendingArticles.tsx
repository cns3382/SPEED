'use client'

import { useEffect, useState } from "react";
import "./style.css";

interface Submission {
    data: any[];
    moderateArticle: any;
}

const PendingArticles: React.FC<Submission> = ({ data, moderateArticle}) => {

    useEffect(() =>{
        
    }, []);

    return (
        <div className="pending-articles-block">
            <ul>
                <li className="pending-articles-header">
                    <div className="pending-col-1"> Article Name </div>
                    <div className="pending-col-2"> Authors </div>
                    <div className="pending-col-3"> Published Year </div>
                </li>
                {data.map((Article: any, i) => {
                    return (
                        <li className="pending-articles-item" onClick={() => moderateArticle(i)}>
                            <div className="pending-col-1"> {Article.title} </div>
                            <div className="pending-col-2"> {Article.authors} </div>
                            <div className="pending-col-3"> {Article.pubyear} </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default PendingArticles;