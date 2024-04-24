// import React from 'react'

const Navbar = () => {
  const openGithub = () => {};

  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex items-center justify-between h-18 py-4 px-4">
        <div className="logo font-bold text-2xl">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">OP/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold " href="#">
              Home
            </a>
            <a className="hover:font-bold " href="#">
              About
            </a>
          </li>
        </ul>
        <a href="https://github.com/Rashidziya/PasswordManager" target="_blank">
          <button
            className="bg-blue-500 rounded-xl px-2 py-1 flex justify-center
            items-center gap-3 text-black font-semibold hover:bg-blue-400"
            onClick={openGithub}
          >
            <img className="w-6" src="/icons/github.svg" alt="Github" />
            Github
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
