import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Close, Check } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCalls";

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "movie",
      headerName: "Movie",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    {
      field: "isSeries",
      headerName: "Is Series?",
      width: 120,
      renderCell: (params) => {
        return params.row.isSeries ? (
          <Check className="true" />
        ) : (
          <Close className="false" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: `/movie/${params.row._id}`, movie: params.row }}
            >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      <Link to="/newmovie">
        <button className="movieAddButton">Create</button>
      </Link>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
