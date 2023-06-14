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
  // const [isupdate, setUpdate] = useState({ update: false, noteid: "" });

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
          // setUpdate({ update: false });
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
          // setFormState(_id.note);
          // setUpdate({ update: true, noteid: _id._id });
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
      <div className="w-screen h-screen  bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <div className=" bg-gradient-to-r from-gray-700 via-gray-900 to-black flex justify-center items-center w-screen  ">
          <div className=" border-2 border-gray-200  flex flex-col  items-center lg:my-16 my-8 w-[90%] md:w-[70%]">
            <h1 className="text-gray-100 font-bold lg:text-5xl text-3xl mt-4 lg:mt-8 ">
              Add Your Notes
            </h1>
            <form
              action=""
              className="bg-gray-300  p-2 rounded-xl my-5 w-[90%] md:w-[80%]  "
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                id="note"
                name="note"
                value={formState}
                onChange={(e) => setFormState(e.target.value)}
                className=" rounded-xl p-2  w-5/6 "
              />
              <button
                type="submit"
                className=" bg-blue-400 text-gray-900 md:p-3 p-1 lg:ml-4 ml-2 rounded-lg w-[12%]"
              >
                add
              </button>
            </form>
            {NoteCloud?.map((documentdata) => (
              <div
                className=" flex justify-center  items-center lg:my-2 my-1 w-[100%] md:w-[80%] "
                key={documentdata?._id}
              >
                <ul className="  rounded-xl flex bg-blue-400  md:w-10/12 w-[90%]">
                  <li className=" rounded-xl  p-1 flex   my-1 w-screen ">
                    <div className=" bg-blue-200  rounded-lg my-1 md:w-5/6 w-[80%]">
                      <span className=" rounded-xl  py-1 px-4 text-gray-900  text-center flex items-center  ">
                        {documentdata?.note}
                      </span>
                    </div>
                  </li>
                  <div className="  flex md:w-1/8  ">
                    <button
                      onClick={() => updatedata(documentdata?._id)}
                      className="bg-white text-black m-2 px-2 rounded-lg  "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deletedata(documentdata?._id)}
                      className="bg-white text-black m-2 px-2 rounded-lg  "
                    >
                      <MdDelete />
                    </button>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
