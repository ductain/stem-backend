const sql = require("mssql");
const config = require("../dbConfig");

const getAllMembersInTeam = async (req, res) => {
  const teamId = req.query.TeamId;
  try {
    const pool = await sql.connect(config);
    const teamMembers = await pool
      .request()
      .input("TeamId", sql.Int, teamId)
      .query(
        "SELECT mit.MemberId, s.StudentCode, s.ClassCode, s.FullName, mit.TeamId, t.TeamName FROM MembersInTeam AS mit JOIN Member AS m ON mit.MemberId = m.Id JOIN Student AS s ON m.StudentId = s.Id JOIN Team AS t ON mit.TeamId = t.Id WHERE mit.TeamId = @TeamId AND t.Status = 1 AND m.Status = 1 AND s.Status = 1"
      );
    res.status(200).json(teamMembers.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getAllMembersInTeam: getAllMembersInTeam,
}
