const sql = require("mssql");
const config = require("../dbConfig");
const { getList } = require("../config/Utils");


const getAllTeamsInGroup = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    // Check if GroupId exists in Group table
    const groupQuery = "SELECT * FROM [Group] WHERE Id = @GroupId AND Status = 1";
    const groupResult = await pool
      .request()
      .input("GroupId", sql.Int, req.query.GroupId)
      .query(groupQuery);

    if (groupResult.recordset.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    let query = "SELECT Id, TeamName, Members, GroupId FROM Team WHERE GroupId = @GroupId AND Status = 1";

    const listQuery = getList(req, ["TeamName"], ["Id", "TeamName"]);
    const finalQuery = query + listQuery;
    const teams = await pool
      .request()
      .input("GroupId", sql.Int, req.query.GroupId)
      .query(finalQuery);

    res.status(200).json(teams.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTeam = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    // Check if GroupId exists in Group table
    const groupQuery = "SELECT * FROM [Group] WHERE Id = @GroupId";
    const groupResult = await pool
      .request()
      .input("GroupId", sql.Int, req.query.GroupId)
      .query(groupQuery);

    if (groupResult.recordset.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    // GroupId exists, proceed with creating the team
    await pool
      .request()
      .input("TeamName", sql.NVarChar, req.body.TeamName)
      .input("Members", sql.Int, req.body.Members)
      .input("Status", sql.Int, 1)
      .input("GroupId", sql.Int, req.query.GroupId)
      .query(
        "INSERT INTO Team (TeamName, Members, Status, GroupId) VALUES (@TeamName, @Members, @Status, @GroupId)"
      );

    res.status(200).json({ message: "Team created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTeam = async (req, res) => {
  const teamId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("TeamName", sql.NVarChar, req.body.TeamName)
      .input("Members", sql.Int, req.body.Members)
      .input("Id", sql.Int, teamId)
      .query(
        "UPDATE Team SET TeamName = @TeamName, Members = @Members WHERE Id = @Id AND Status = 1"
      );
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Team not found" });
    } else {
      res.status(200).json({ message: "Team updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTeam = async (req, res) => {
  const teamId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, teamId)
      .query("UPDATE Team SET Status = 0 WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Team not found" });
    } else {
      res.status(200).json({ message: "Team deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTeamsInGroup: getAllTeamsInGroup,
  createTeam: createTeam,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
};
