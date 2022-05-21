import {useState , useEffect}  from "react" ;
import axios from "axios";
import NewsCard from "./components/NewsCard" ;
import ReactPaginate from "react-paginate" ; 





const NewsPage = () => {
    const [currentPage , setCurrentPage] = useState(0);
    const [articles , setArticles] = useState([]);
    const [isoLoading , setIsLoading] = useState(true);
    const [totalpages , setTotalPages] =useState(0);
    const [query , setQuery] = useState("");
    const [searchInput , setSearchInput] = useState("");


    const handlePageChange = event => {
        console.log(event);
        setCurrentPage (event.selected);
    };
    const handleSubmit = event =>{
        event.preventDefault();
        setCurrentPage(0);
        setQuery(searchInput);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try{
                const{data} = await axios.get("http://hn.algolia.com/api/v1/search?query=test", {

                params:{page:currentPage,query},
                }
                               
                );
                const {hits , nbPages} = data;
                setArticles(hits);
                setTotalPages(nbPages);
            }
            catch(err){
                console.log(err);

            } finally{
                setIsLoading(false);
            }

        };
        fetchData();

    },[currentPage,query])
    return (
        <div className ="container">

        <h1>HackerNews</h1>
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
               placeholder="Search for the news"
               value={searchInput}
               onChange = {event =>setSearchInput(event.target.value)}
               />
               <button type="submit">Search</button>
        </form>
        <div className="new-container">{

            isoLoading ? (
                <p>Loading.....</p> 
                ): ( 
                    articles.map ((article)=> (
                        <NewsCard article ={article} key={article.objectID}/>
                    ) )
                    
                    ) }
        
            
        </div>
         <ReactPaginate
              nextLabel=">>"
              previousLabel="<<"
              breakLabel ="..."
              forcePage={currentPage}
              pageCount = {totalpages}
              renderOnZeroPageCount ={null}
              onPageChange = {handlePageChange}
              className = "pagination"
              activeClassName="active-page"
              previousClassName="previous-page"
              nextClassName="next-page"
         />
        
        </div>
    );
        
    

};

export default NewsPage ;

