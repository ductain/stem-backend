const sql = require("mssql");
const config = require("../dbConfig");

const getPrograms = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const programs = await pool
      .request()
      .query(
        "SELECT p.Id, p.Code, p.Name, p.Description, p.Image, p.CreatedDate, p.UpdatedDate, p.SchoolYearId, s.StartDate, s.EndDate FROM Program AS p JOIN SchoolYear AS s ON p.SchoolYearId = s.Id WHERE p.Status = 1 AND s.Status = 1"
      );
    res.status(200).json(programs.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProgramById = async (req, res) => {
  const programId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const program = await pool
      .request()
      .input("Id", sql.Int, programId)
      .query(
        "SELECT p.Id, p.Code, p.Name, p.Description, p.Image, p.CreatedDate, p.UpdatedDate, p.SchoolYearId, s.StartDate, s.EndDate FROM Program AS p JOIN SchoolYear AS s ON p.SchoolYearId = s.Id WHERE p.Id = @Id AND p.Status = 1 AND s.Status = 1"
      );
    if (program.recordset.length === 0) {
      res.status(404).json({ error: "Program not found" });
    } else {
      res.status(200).json(program.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getPrograms: getPrograms,
  getProgramById: getProgramById,
};
