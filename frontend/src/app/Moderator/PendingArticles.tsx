import "./style.css";

const PendingArticles = () => {
    return (
        <div className="pending-articles-block">
            <ul>
                <li className="pending-articles-header">
                    <div className="pending-col-1"> Article Name </div>
                    <div className="pending-col-2"> Authors </div>
                    <div className="pending-col-3"> Published Year </div>
                </li>
                <li className="pending-articles-item">
                    <div className="pending-col-1"> Cloud Knights Development Doctrine </div>
                    <div className="pending-col-2"> Jingliu </div>
                    <div className="pending-col-3"> 7023 </div>
                </li>
            </ul>
        </div>
    );
}
export default PendingArticles;