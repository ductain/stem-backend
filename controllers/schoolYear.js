const sql = require("mssql");
const config = require("../dbConfig");

const getSchoolYear = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const schoolYears = await pool
      .request()
      .query("SELECT Id, StartDate, EndDate FROM SchoolYear WHERE Status = 1");
    res.status(200).json(schoolYears.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSchoolYearById = async (req, res) => {
  const schoolYearId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const schoolYear = await pool
      .request()
      .input("Id", sql.Int, schoolYearId)
      .query(
        "SELECT Id, StartDate, EndDate FROM SchoolYear WHERE Id = @Id AND Status = 1"
      );
    if (schoolYear.recordset.length === 0) {
      res.status(404).json({ error: "SchoolYear not found" });
    } else {
      res.status(200).json(schoolYear.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSchoolYear: getSchoolYear,
  getSchoolYearById: getSchoolYearById,
};
