import './App.css';
import React, {useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';


function App () {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState()

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=890a77e69b7432001d5a0fb13d5c720c&language=en-US&page=1')
    .then(response => response.json())
    .then(data =>{
      // movies: data.results
      const movieData = data.results
      setMovies(movieData)
    })
  }
  getMovies()
  const getData = () => {
    setPage(page + 1)
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=890a77e69b7432001d5a0fb13d5c720c&language=en-US&page=2`)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      // const movieData = data.results
      // setMovies(movieData)
    })
  }
    return (
      <div className="App ">
      <InfiniteScroll
        dataLength={movies.length}
        next={getData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        >
        <div className="row">
        {movies.map((movie, index) => (
        <div className="col-lg-2 mt-3 mb-3" key={index}>
         <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={index} />
         <div id="overview">{movie.overview}</div>
        </div>
        ))}
        </div>
      </InfiniteScroll>
      </div>
  );
}

export default App;
