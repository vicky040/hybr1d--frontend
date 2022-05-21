const NewsCard = ({article}) => {
    if(!article.title) return null ;
       return(
           <div className="new-card">
               <h3>{article.title}</h3>
               <a href={article.url}>Read More</a>
           </div>
       );
};

export default NewsCard ;