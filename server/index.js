const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const dataFile = path.join(__dirname, "data.json");

// Support POSTing form data with URL encoded
app.use(express.urlencoded({ extended: true }));

app.get("/poll", async (req, res) => {
  let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));
  const totalVotes = Object.values(data).reduce((total, n) => total += n, 0);  

  console.log(totalVotes);

  data = Object.entries(data).map(([label, votes]) => {
    return {
      label,
      percentage: ((100 * votes) / totalVotes) || 0
    }
  })

  res.end();
});

app.listen(3000, () => console.log("Server is running...")); 