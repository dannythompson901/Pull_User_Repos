import React, { useState } from "react";
import axios from "axios";

const Card = () => {
  const [userName, setUserName] = useState("");
  const [repos, setRepos] = useState([]);

  function handleSubmitRequest(e) {
    e.preventDefault();
    pullExistingRepos();
  }

  function listRepos(repo) {
    return (
      <div className="row" key={repo.id}>
        <h4 className="py-1 font-sans text-2xl text-slate-500">{repo.name}</h4>
      </div>
    );
  }

  function pullExistingRepos() {
    axios({
      method: "get",
      url: `https://api.github.com/users/${userName}/repos?page=2&per_page=5`,
    }).then((res) => {
      setRepos(res.data);
    });
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-100">
      <div className="flex h-screen w-full flex-col items-center justify-center rounded-lg border border-blue-400/20 bg-slate-200/30 shadow-xl md:h-1/2 md:w-1/3">
        <div>
          <form className="form flex w-full flex-col justify-center md:w-56">
            <input
              type="text"
              value={userName}
              placeholder="Enter Github Username"
              onChange={(e) => setUserName(e.target.value)}
              className="flex h-24 items-center justify-center rounded-lg border-2 border-slate-500/50 text-center focus:outline-blue-500"
            />
            <button
              type="button"
              className="button mt-8 rounded-lg border border-slate-400 p-4 shadow-xl"
              onClick={handleSubmitRequest}
            >
              Submit
            </button>
          </form>
        </div>

        <div className="results mt-6">
          <div className="capitalize">{repos.map(listRepos)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
