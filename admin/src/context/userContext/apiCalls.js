import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./UserActions";

//get
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//create
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post("/users", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

//delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

//update
//! fix this
// export const updateMoviee = async (id, newData, dispatch) => {
//   dispatch(updateMovieStart());
//   try {
//     const res = await axios.put(`/movie/${id}`, newData, {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//       },
//     });
//     dispatch(updateMovieSuccess(res.data));
//   } catch (err) {
//     dispatch(updateMovieFailure());
//   }
// };
