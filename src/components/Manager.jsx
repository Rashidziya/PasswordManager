import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    // ref.current.src=ref.current.src.includes('icons/hidden.png')?"icons/eye.png":"icons/eye.png";
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SavePassword = () => {
    setPasswordArray([...passwordArray,{...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id:uuidv4()}]));
    // After Saving the Password Details should be Deleted From the input field
    setForm({ site: "", username: "", password: "" });
    // console.log([...passwordArray, form]);
  };
 
  const copyItems = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    navigator.clipboard.writeText(text);
  };

  const handleEdit=(index)=>{
    // let inptutToEdit=passwordArray.filter(user=>user.id===index);
    // setForm({
    //   site:inptutToEdit.site,
    //   username:inptutToEdit.username,
    //   password:inptutToEdit.password
    // });
    setForm(passwordArray.filter(i=> i.id===index)[0]);
    setPasswordArray(passwordArray.filter(user=>user.id!==index));
    // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(user=>user.id!==index)));

    console.log("Editing with id ",index);
  }

  const handleDelete=(index)=>{
    let c=confirm("Do you really want to Delete this ");
    if(c){
      setPasswordArray(passwordArray.filter(user=> user.id!==index));
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(user=> user.id!==index)));
      console.log("Deleting with this id ",index);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="  px-6 py-4 mx-auto max-w-screen-sm md:mycontainer ">
        <h1 className="text-center  text-4xl font-bold">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">OP/&gt;</span>
        </h1>
        <p className="text-center text-lg text-blue-500 mb-6">
          your own password manager
        </p>

        <div className="flex flex-col text-white p-4 gap-7">
          <input
            className="rounded-full border-2 border-blue-500 px-4 py-1 text-black"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-7 p-4 md:grid grid-cols-3 gap-5">
            <input
              className="rounded-full border-2 col-span-2 border-blue-500 px-4 py-1 text-black"
              placeholder="Enter Username/Email"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative w-full ">
              <input
                ref={passwordRef}
                className="rounded-full w-full border-2 col-span-1 border-blue-500 px-4 py-1 text-black"
                placeholder="Enter Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute text-black right-2 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={25}
                  src="./icons/hidden.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            className="text-black bg-blue-500 w-fit mx-auto mt-4 rounded-full
              hover:bg-blue-600 px-4 py-2 flex justify-center items-center gap-3"
            onClick={SavePassword}
          >
            <div>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            Save Password
          </button>
        </div>
        <h2 className="font-bold text-xl py-4">Your Passwords</h2>
        {passwordArray.length === 0 && <div>No Passwords to show</div>}
        {passwordArray.length != 0 && (
          <div className="overflow-x-auto ">
          <table className="w-full max-w-full md:table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Site</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-blue-100 ">
              {passwordArray.map((item) => {
                return (
                  <tr key={item.index}>
                    <td className="py-2 px-2 text-center ">
                      <div className="flex justify-center items-center gap-2 ">
                        <a href={item.site} target="_blank">
                          <span>{item.site}</span>
                        </a>
                        <img
                          onClick={() => {
                            copyItems(item.site);
                          }}
                          className="w-4 cursor-pointer"
                          src="icons/copying.png"
                          alt="Copy"
                        />
                      </div>
                    </td>
                    <td className=" py-2 px-2 text-center ">
                      <div className="flex justify-center items-center gap-2 ">
                        <span>{item.username}</span>
                        <img
                          onClick={() => {
                            copyItems(item.username);
                          }}
                          className="w-4 cursor-pointer "
                          src="icons/copying.png"
                          alt="Copy"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center ">
                      <div className="flex justify-center items-center gap-2 ">
                        <span><MaskedPassword password={item.password}/></span>
                        <img
                          onClick={() => {
                            copyItems(item.password);
                          }}
                          className="w-4 cursor-pointer "
                          src="icons/copying.png"
                          alt="Copy"
                        />
                      </div>
                    </td>

                    <td className="py-2 px-2 text-center ">
                      <div className="flex justify-center items-center gap-4 cursor-pointer">

                        <span onClick={()=>handleEdit(item.id)}>
                          <img className="w-5" src="icons/Edit.png"/>
                        </span>
                        <span onClick={()=>handleDelete(item.id)}>
                          <img className="w-5" src="icons/Delete.png"/>
                        </span>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
};

const MaskedPassword=({password})=>{
  const maskedPassword='*'.repeat(password.length);
  return <span>{maskedPassword}</span>
}

export default Manager;
