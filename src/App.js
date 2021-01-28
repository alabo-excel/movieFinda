import './App.css';
import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const TRENDING_API = "https://api.themoviedb.org/3/trending/movie/week?api_key=890a77e69b7432001d5a0fb13d5c720c&language=en-US&page=1"

function App () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    fetch(TRENDING_API)
    .then((response) => response.json())
    .then((data) =>{
      setMovies(data.results)
    })
    },[])

    const handelSearch = (e) =>{
      e.preventDefault()
      if(searchValue){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=890a77e69b7432001d5a0fb13d5c720c&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        .then((response) => response.json())
        .then((data) =>{
          setMovies(data.results)
        })
        setSearchValue('')
      }
    }
    const handelChange = (e) =>{
      e.preventDefault()
      setSearchValue(e.target.value);
    }
  const getData = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=890a77e69b7432001d5a0fb13d5c720c&language=en-US&page=${page + 1}`)
    .then(response => response.json())
    .then(data =>{
      setMovies([...movies, ...data.results])
      setPage(data.page)
    })
  }

    return (
      <div className="App ">
      <header>
        <form onSubmit={handelSearch}>
          <input type="search" placeholder="search" value={searchValue} onChange={handelChange} />
        </form>
      </header>
        <div>
          <InfiniteScroll
            dataLength={movies.length}
            next={getData}
            hasMore={true}
            loader={
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            >
            <div className="row">
            {movies.map((movie, index) => (
            <div className="col-lg-2 mt-3 mb-3 container-img" key={index}>
             <img src={movie.poster_path ? ('https://image.tmdb.org/t/p/w500/'+movie.poster_path) : 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421'} alt={index} />
             <div id="overview">
             <h5>OVERVIEW</h5>
             <p>{movie.overview}</p></div>
             <div className="d-flex justify-content-between detail">
               <h5>{movie.title}</h5>
               <span className="rating">{movie.vote_average}</span>
             </div>
            </div>
            ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
  );
}

export default App;
