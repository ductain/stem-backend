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

const getTeamOfAMember = async(req, res) => {
    const studentId = req.query.StudentId;
    const programId = req.query.ProgramId;
  try {
    const pool = await sql.connect(config);
    const team = await pool
      .request()
      .input("StudentId", sql.Int, studentId)
      .input("ProgramId", sql.Int, programId)
      .query(
        "SELECT TeamId From MembersInTeam WHERE MemberId = (SELECT Id FROM Member WHERE StudentId = @StudentId AND ProgramId = @ProgramId AND Status = 1)"
      );
      if (team.recordset.length === 0) {
        res.status(404).json({ error: "Team not found" });
      } else {
        res.status(200).json(team.recordset[0]);
      }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const addMemberIntoTeam = async (req, res) => {
  const teamId = req.query.TeamId
  const memberId = req.query.MemberId
  try {
    const pool = await sql.connect(config);

    const teamQuery =
      "SELECT * FROM Team WHERE Id = @TeamId AND Status = 1";
    const teamResult = await pool
      .request()
      .input("TeamId", sql.Int, teamId)
      .query(teamQuery);

    if (teamResult.recordset.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const memberQuery =
      "SELECT * FROM Member WHERE Id = @MemberId AND GroupId IS NOT NULL AND Status = 1";
    const memberResult = await pool
      .request()
      .input("MemberId", sql.Int, memberId)
      .query(memberQuery);

    if (memberResult.recordset.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    const memberInTeamQuery =
      "SELECT * FROM MembersInTeam WHERE MemberId = @MemberId AND TeamId = @TeamId";
    const memberInTeamResult = await pool
      .request()
      .input("MemberId", sql.Int, memberId)
      .input("TeamId", sql.Int, teamId)
      .query(memberInTeamQuery);

    if (memberInTeamResult.recordset.length > 0) {
      return res.status(404).json({ error: "Member already existed in this program" });
    }

    await pool
      .request()
      .input("MemberId", sql.Int, memberId)
      .input("TeamId", sql.Int, teamId)
      .query(
        "INSERT INTO MembersInTeam (MemberId, TeamId) VALUES (@MemberId, @TeamId)"
      );

    res.status(200).json({ message: "Member added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getAllMembersInTeam: getAllMembersInTeam,
    getTeamOfAMember: getTeamOfAMember,
    addMemberIntoTeam: addMemberIntoTeam,
}
