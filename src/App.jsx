import { useState } from "react";




function App() {

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="app">
      <h1>Streamify</h1>

      <div className="search">
        <input placeholder="Search for movies..." 
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>
      <p>Searching for: {searchTerm}</p>
    </div>
  );
}

export default App;