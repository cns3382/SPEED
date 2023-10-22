import './style.css'

interface Moderation {
    goBack: any
    articleData : any
    acceptArticle : any
    rejectArticle : any
    deleteArticle : any
}

const ArticleModeration : React.FC<Moderation> = ({ goBack, articleData, acceptArticle, rejectArticle, deleteArticle}) => {
    return (
        <div className='article-mod-block'>
            <button onClick={() => goBack()}> Back </button>
            <div className='mod-item mod-title'>Title: { articleData.title }</div>
            <div className='mod-item'>Author(s): { articleData.authors}</div>
            <div className='mod-item'>DOI: { articleData.doi }</div>
            <div className='mod-item'>Published Year: { articleData.pubyear }</div>
            <div>
                <h2 className='mod-item'> Summary: </h2>
                <div className='mod-summary'>
                    { articleData.summary }
                </div>
            </div>
            <div className='mod-buttons'>
                <button className='mod-button' onClick={() => acceptArticle(articleData)}> Accept </button>
                <button className='mod-button' onClick={() => rejectArticle(articleData)}> Reject </button>
                <button className='mod-button' onClick={() => deleteArticle(articleData)}> Delete </button>
            </div>
        </div>
    );
}
export default ArticleModeration;