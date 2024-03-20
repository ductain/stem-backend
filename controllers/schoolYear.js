const sql = require("mssql");
const config = require("../dbConfig");
const { getList } = require("../config/Utils");

const getSchoolYear = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    let query = "SELECT Id, StartDate, EndDate FROM SchoolYear WHERE Status = 1";

    const listQuery = getList(req, ["StartDate", "EndDate"], ["Id", "StartDate", "EndDate"]);
    const finalQuery = query + listQuery;
    const schoolYears = await pool.request().query(finalQuery);

    res.status(200).json(schoolYears.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSchoolYear = async (req, res) => {
  try {
    // Calculate the EndDate
    const startYear = new Date(req.body.StartDate).getFullYear();
    const endYear = startYear + 3;
    const endDate = new Date(endYear, 11, 31); // December 31 of the calculated end year

    const pool = await sql.connect(config);
    await pool
      .request()
      .input("StartDate", sql.DateTime, req.body.StartDate)
      .input("EndDate", sql.DateTime, endDate)
      .input("Status", sql.Int, 1)
      .query(
        "INSERT INTO SchoolYear (StartDate, EndDate, Status) VALUES (@StartDate, @EndDate, @Status)"
      );

    res.status(200).json({ message: "School year created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSchoolYear = async (req, res) => {
  const schoolYearId = req.params.Id;
  try {
    // Calculate the EndDate
    const startYear = new Date(req.body.StartDate).getFullYear();
    const endYear = startYear + 3;
    const endDate = new Date(endYear, 11, 31); // December 31 of the calculated end year

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, schoolYearId)
      .input("StartDate", sql.DateTime, req.body.StartDate)
      .input("EndDate", sql.DateTime, endDate)
      .query(
        "UPDATE SchoolYear SET StartDate = @StartDate, EndDate = @EndDate WHERE Id = @Id AND Status = 1"
      );

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "School Year not found" });
    } else {
      res.status(200).json({ message: "School Year updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSchoolYear = async (req, res) => {
  const schoolYearId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, schoolYearId)
      .query("UPDATE SchoolYear SET Status = 0 WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "School Year not found" });
    } else {
      res.status(200).json({ message: "School Year deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getSchoolYear: getSchoolYear,
  getSchoolYearById: getSchoolYearById,
  createSchoolYear: createSchoolYear,
  updateSchoolYear: updateSchoolYear,
  deleteSchoolYear: deleteSchoolYear,
};
