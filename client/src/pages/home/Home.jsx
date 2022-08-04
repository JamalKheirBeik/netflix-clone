import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
            signal: abortController.signal,
          }
        );
        setLists(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") console.log(err);
      }
    };
    getRandomLists();
    return () => abortController.abort();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists?.map((list) => (
        <List list={list} key={list._id} />
      ))}
    </div>
  );
};

export default Home;
