const sql = require("mssql");
const config = require("../dbConfig");

const getNews = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const news = await pool
      .request()
      .query("SELECT Id, Title, Detail, Image FROM News WHERE Status = 1");
    res.status(200).json(news.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const news = await pool
      .request()
      .input("Id", sql.Int, newsId)
      .query(
        "SELECT Id, Title, Detail, Image FROM News WHERE Id = @Id AND Status = 1"
      );
    if (news.recordset.length === 0) {
      res.status(404).json({ error: "News not found" });
    } else {
      res.status(200).json(news.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getNews: getNews,
  getNewsById: getNewsById,
};
