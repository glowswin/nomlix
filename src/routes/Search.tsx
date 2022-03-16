import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getSearchMovies,
  getSearchTvs,
  IGetMoviesResult,
  IGetTvsResult,
} from "../Api";
import { makeImagePath } from "../Util";
interface RouteParams {
  searchStr: string;
}
function Search() {
  const { searchStr } = useParams<RouteParams>();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "searchMovie"],
    () => getSearchMovies(searchStr)
  );
  const { data: searchTv, isLoading: searchTvIsLoading } =
    useQuery<IGetTvsResult>(["tvs", "searchTv"], () => getSearchTvs(searchStr));
  return (
    <div>
      {isLoading && searchTvIsLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <h1>MOVIE</h1>
          {data?.results?.map((movie) => (
            <div style={{ clear: "both" }}>
              <div style={{ float: "left" }}>
                <img src={makeImagePath(movie.backdrop_path, "w500")} />
              </div>
              <div style={{ float: "left" }}>
                {movie.title}
                <br />
                {movie.overview}
              </div>
            </div>
          ))}
          <h1 style={{ marginTop: "50px" }}>TV</h1>
          {data?.results?.map((tv) => (
            <div style={{ clear: "both" }}>
              <div style={{ float: "left" }}>
                <img src={makeImagePath(tv.backdrop_path, "w500")} />
              </div>
              <div style={{ float: "left" }}>
                {tv.title}
                <br />
                {tv.overview}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
