import './style.css'
interface Analysis {
    goBack: any
    articleData : any
}

const ArticleAnalysis : React.FC<Analysis> = ({ goBack, articleData}) => {
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
            <div className='analysis-buttons'>
                <button className='analysis-button'> Done </button>
            </div>
        </div>
    );
}
export default ArticleAnalysis;