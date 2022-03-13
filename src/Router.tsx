import { BrowserRouter as Routers, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Movie from "./routes/Movie";
import Header from "./components/Header";
function Router() {
  return (
    <Routers>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/movie">
          <Movie />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Routers>
  );
}

export default Router;
