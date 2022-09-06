import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userName, setUserName] = useState("");
  const [repos, setRepos] = useState([]);

  function handleSubmitRequest(e) {
    e.preventDefault();
    pullExistingRepos();
  }

  function pullExistingRepos() {
    axios({
      method: "get",
      url: `https://api.github.com/users/${userName}/repos`,
    }).then((res) => {
      setRepos(res.data);
    });
  }

  function listRepos(repo) {
    return (
      <div className="row" key={repo.id}>
        <h4 className="repoName">{repo.name}</h4>
      </div>
    );
  }

  return (
    <div className="app ">
      <form className="form flex flex-col justify-center">
        <input
          type="text"
          value={userName}
          placeholder="Enter Github Username"
          onChange={(e) => setUserName(e.target.value)}
          className="flex flex-col justify-center"
        />
        <button className="button" onClick={handleSubmitRequest}>
          Submit
        </button>
      </form>
      <div className="results">{repos.map(listRepos)}</div>
    </div>
  );
}

export default App;
