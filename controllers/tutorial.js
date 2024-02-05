const sql = require("mssql");
const config = require("../dbConfig");

const getTutorials = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const tutorials = await pool
      .request()
      .query("SELECT Id, Title, Description, Image, Video FROM Tutorial WHERE Status = 1");
    res.status(200).json(tutorials.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTutorialById = async (req, res) => {
  const tutorialId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const tutorial = await pool
      .request()
      .input("Id", sql.Int, tutorialId)
      .query("SELECT Id, Title, Description, Image, Video FROM Tutorial WHERE Id = @Id AND Status = 1");
    if (tutorial.recordset.length === 0) {
      res.status(404).json({ error: "Tutorial not found" });
    } else {
      res.status(200).json(tutorial.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getTutorials: getTutorials,
    getTutorialById: getTutorialById
}