import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovies,
  getTopRateMovies,
  getUpCommingMovies,
  IGetMoviesResult,
} from "../Api";
import { makeImagePath } from "../Util";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Layer = styled.div`
  width: 50px;
  height: 200px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: (gleft: boolean) => ({
    x: gleft ? window.outerWidth + 5 : -window.outerHeight - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (gleft: boolean) => ({
    x: gleft ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "latest"],
    getMovies
  );
  const { data: topData, isLoading: topIsLoading } = useQuery<IGetMoviesResult>(
    ["movies", "toplate"],
    getTopRateMovies
  );
  const { data: upData, isLoading: upDataIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcomming"], getUpCommingMovies);
  const bigData = [
    ...(data?.results || []),
    ...(topData?.results || []),
    ...(upData?.results || []),
  ];
  const [kind, setKind] = useState({
    index1: 0,
    index2: 0,
    index3: 0,
  });
  const [gleft, setGleft] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = (
    ii: number,
    data: IGetMoviesResult | null,
    isLeft: boolean
  ) => {
    setGleft(isLeft);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setKind((prev) => {
        let ind1 = prev.index1;
        let ind2 = prev.index2;
        let ind3 = prev.index3;
        if (isLeft) {
          if (ii === 1) {
            ind1 = ind1 === maxIndex ? 0 : ind1 + 1;
          } else if (ii === 2) {
            ind2 = ind2 === maxIndex ? 0 : ind2 + 1;
          } else if (ii === 3) {
            ind3 = ind3 === maxIndex ? 0 : ind3 + 1;
          }
        } else {
          if (ii === 1) {
            ind1 = ind1 === 0 ? maxIndex : ind1 - 1;
          } else if (ii === 2) {
            ind2 = ind2 === 0 ? maxIndex : ind2 - 1;
          } else if (ii === 3) {
            ind3 = ind3 === 0 ? maxIndex : ind3 - 1;
          }
        }
        return {
          index1: ind1,
          index2: ind2,
          index3: ind3,
        };
      });
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: string) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    bigData.find(
      (movie) => movie?.id === +bigMovieMatch.params.movieId.split("_")[1]
    );
  return (
    <Wrapper>
      {isLoading && topIsLoading && upDataIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                custom={gleft}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1, delay: 1 }}
                key={kind.index1}
              >
                <Layer
                  style={{ position: "absolute", left: 0, top: 0 }}
                  onClick={() => incraseIndex(1, data || null, true)}
                ></Layer>
                {data?.results
                  .slice(1)
                  .slice(offset * kind.index1, offset * kind.index1 + offset)
                  .map((movie) => (
                    <Box
                      layoutId={"1_" + movie.id}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked("1_" + movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
                <Layer
                  style={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => incraseIndex(1, data || null, false)}
                ></Layer>
              </Row>
            </AnimatePresence>
          </Slider>
          <Slider style={{ marginTop: "300px" }}>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                custom={gleft}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1, delay: 1 }}
                key={kind.index2}
              >
                <Layer
                  style={{ position: "absolute", left: 0, top: 0 }}
                  onClick={() => incraseIndex(2, topData || null, true)}
                ></Layer>
                {topData?.results
                  .slice(offset * kind.index2, offset * kind.index2 + offset)
                  .map((movie) => (
                    <Box
                      layoutId={"2_" + movie.id}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked("2_" + movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
                <Layer
                  style={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => incraseIndex(2, topData || null, false)}
                ></Layer>
              </Row>
            </AnimatePresence>
          </Slider>
          <Slider style={{ marginTop: "600px" }}>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                custom={gleft}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1, delay: 1 }}
                key={kind.index3}
              >
                <Layer
                  style={{ position: "absolute", left: 0, top: 0 }}
                  onClick={() => incraseIndex(3, upData || null, true)}
                ></Layer>
                {upData?.results
                  .slice(offset * kind.index3, offset * kind.index3 + offset)
                  .map((movie) => (
                    <Box
                      layoutId={"3_" + movie.id}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked("3_" + movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
                <Layer
                  style={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => incraseIndex(3, upData || null, false)}
                ></Layer>
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>
                        {clickedMovie.overview}
                        <br />
                        릴리즈날짜:{clickedMovie.release_date},평점:
                        {clickedMovie.vote_average}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
