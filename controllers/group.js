const sql = require("mssql");
const config = require("../dbConfig");

const getGroups = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const groups = await pool
      .request()
      .query(
        "SELECT gr.Id, gr.Code AS GroupCode, gr.Name AS GroupName, gr.TeacherId, gr.ProgramId, t.Code AS TeacherCode, t.Name AS TeacherName, p.Code AS ProgramCode, p.Name AS ProgramName FROM [Group] AS gr JOIN Teacher AS t ON gr.TeacherId = t.Id JOIN Program AS p ON gr.ProgramId = p.Id WHERE gr.Status = 1 AND t.Status = 1 AND p.Status = 1"
      );
    res.status(200).json(groups.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getGroupById = async (req, res) => {
  const groupId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const group = await pool
      .request()
      .input("Id", sql.Int, groupId)
      .query(
        "SELECT gr.Id, gr.Code AS GroupCode, gr.Name AS GroupName, gr.TeacherId, gr.ProgramId, t.Code AS TeacherCode, t.Name AS TeacherName, p.Code AS ProgramCode, p.Name AS ProgramName FROM [Group] AS gr JOIN Teacher AS t ON gr.TeacherId = t.Id JOIN Program AS p ON gr.ProgramId = p.Id WHERE gr.Id = @Id AND gr.Status = 1 AND t.Status = 1 AND p.Status = 1"
      );
    if (group.recordset.length === 0) {
      res.status(404).json({ error: "Group not found" });
    } else {
      res.status(200).json(group.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getGroups: getGroups,
    getGroupById: getGroupById
}