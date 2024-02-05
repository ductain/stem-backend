const sql = require("mssql");
const config = require("../dbConfig");

const getLabs = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const labs = await pool
      .request()
      .query(
        "SELECT l.Id, l.Code, l.Topic, l.Description, l.CreatedDate, l.EndDate, l.StartDate, l.UpdatedDate, l.ProgramId, p.Name AS ProgramName FROM Lab AS l JOIN Program AS p ON l.ProgramId = p.Id WHERE l.Status = 1 AND p.Status = 1"
      );
    res.status(200).json(labs.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLabById = async (req, res) => {
  const labId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const lab = await pool
      .request()
      .input("Id", sql.Int, labId)
      .query(
        "SELECT l.Id, l.Code, l.Topic, l.Description, l.CreatedDate, l.EndDate, l.StartDate, l.UpdatedDate, l.ProgramId, p.Name AS ProgramName FROM Lab AS l JOIN Program AS p ON l.ProgramId = p.Id WHERE l.Id = @Id AND l.Status = 1 AND p.Status = 1"
      );
    if (lab.recordset.length === 0) {
      res.status(404).json({ error: "Lab not found" });
    } else {
      res.status(200).json(lab.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getLabs: getLabs,
  getLabById: getLabById,
};
