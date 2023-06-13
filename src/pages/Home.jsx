import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
// import axios from "axios";

const Home = () => {
  //  Template Code
  const [formState, setFormState] = useState("");
  // eslint-disable-next-line
  const [NoteCloud, setNoteCloud] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    try {
      axios("https://notes-api-backend-one.vercel.app/note/", {
        method: "POST",
        data: { note: formState },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setrefresh((prev) => !prev);
          console.log(res);
          setFormState(" ");
        })
        .catch((err) => console.log(err));
      // alert("data added");
      //   toast.success("sucessfully signup");
    } catch (error) {
      //   toast.error("some error");
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios("https://notes-api-backend-one.vercel.app/note/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setNoteCloud(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    console.log("useeffect");
    // eslint-disable-next-line
  }, [refresh]);

  const deletedata = async (_id) => {
    try {
      axios(
        `https://notes-api-backend-one.vercel.app/note/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res);
          setrefresh((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    console.log(_id);
  };
  const updatedata = async (_id) => {
    try {
      axios(
        `https://notes-api-backend-one.vercel.app/note/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res);
          setrefresh((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    console.log(_id);
    console.log("updatedata");
  };

  return (
    <>
      <div className="container bg-gradient-to-r from-gray-700 via-gray-900 to-black flex justify-center items-center h-max  lg:w-full lg:h-full mt-4">
        <div className=" lg:w-[60%] lg:h-full w-[90%] h-full border-2 border-gray-200  flex flex-col  items-center lg:my-16 my-8">
          <h1 className="text-gray-100 font-bold lg:text-5xl text-3xl mt-4 lg:mt-8 ">
            Add Your Notes
          </h1>
          <form
            action=""
            className="bg-gray-300 lg:w-[80%]  w-[95%] lg:p-5 p-2 rounded-xl my-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="note"
              name="note"
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
              className=" rounded-xl p-2 lg:w-[80%] w-[80%] "
            />
            <button
              type="submit"
              className=" bg-blue-400 text-gray-900 lg:p-3 p-1 lg:ml-4 ml-2 rounded-lg "
            >
              add
            </button>
          </form>
          {NoteCloud?.map((documentdata) => (
            <div
              className="  lg:w-[80%]  w-[90%] flex justify-center  items-center lg:my-2 my-1 "
              key={documentdata?._id}
            >
              <ul className="  rounded-xl flex bg-blue-400 lg:w-[80%] w-[90%]">
                <li className=" rounded-xl lg:p-2 p-1 flex flex-between  my-1 lg:w-[80%] w-[90%]">
                  <div className="lg:w-[100%] w-[100%] bg-blue-200  rounded-lg">
                    <span className=" rounded-xl lg:p-3 p-1 text-gray-900  text-center flex items-center ">
                      {documentdata?.note}
                    </span>
                  </div>
                </li>
                <div className="btn  flex ">
                  <button
                    onClick={() => updatedata(documentdata._id)}
                    className="bg-white text-black m-2 px-2 rounded-lg  "
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deletedata(documentdata._id)}
                    className="bg-white text-black m-2 px-2 rounded-lg  "
                  >
                    <MdDelete />{" "}
                  </button>
                </div>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
