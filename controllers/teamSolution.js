const sql = require("mssql");
const config = require("../dbConfig");
const { getList } = require("../config/Utils");

const getTeamSolutions = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    let query =
      "SELECT ts.Id, ts.Solution, ts.Score, ts.CreateDate, ts.UpdateDate, ts.LabId, l.Topic, l.Description, ts.TeamId, t.TeamName FROM TeamSolution AS ts JOIN Lab AS l ON ts.LabId = l.Id JOIN Team AS t ON ts.TeamId = t.Id WHERE ts.Status = 1 AND l.Status = 1 AND l.Status = 1";

    const listQuery = getList(req, ["l.Topic"], ["Id", "Topic"]);
    const finalQuery = query + listQuery;
    const teamSolutions = await pool.request().query(finalQuery);
    res.status(200).json(teamSolutions.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTeamSolutionById = async (req, res) => {
  const teamSolutionId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const teamSolution = await pool
      .request()
      .input("TeamSolutionId", sql.Int, teamSolutionId)
      .query(
        "SELECT ts.Id, ts.Solution, ts.Score, ts.CreateDate, ts.UpdateDate, ts.LabId, l.Topic, l.Description, ts.TeamId, t.TeamName FROM TeamSolution AS ts JOIN Lab AS l ON ts.LabId = l.Id JOIN Team AS t ON ts.TeamId = t.Id WHERE ts.Id = @TeamSolutionId AND ts.Status = 1 AND l.Status = 1 AND l.Status = 1"
      );
    if (teamSolution.recordset.length === 0) {
      res.status(404).json({ error: "Team Solution not found" });
    } else {
      res.status(200).json(teamSolution.recordset[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTeamSolutionsByTeamId = async (req, res) => {
  const teamId = req.query.TeamId;
  const labId = req.query.LabId;
  try {
    const pool = await sql.connect(config);
    const teamSolutions = await pool
      .request()
      .input("TeamId", sql.Int, teamId)
      .input("LabId", sql.Int, labId)
      .query(
        "SELECT ts.Id, ts.Solution, ts.Score, ts.CreateDate, ts.UpdateDate, ts.LabId, l.Topic, l.Description, ts.TeamId, t.TeamName FROM TeamSolution AS ts JOIN Lab AS l ON ts.LabId = l.Id JOIN Team AS t ON ts.TeamId = t.Id WHERE ts.TeamId = @TeamId AND ts.LabId = @LabId AND ts.Status = 1 AND l.Status = 1 AND l.Status = 1"
      );
    res.status(200).json(teamSolutions.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTeamSolution = async (req, res) => {
  const LabId = req.query.LabId;
  const TeamId = req.query.TeamId;
  const currentDate = new Date();
  try {
    const pool = await sql.connect(config);
    const labQuery = "SELECT * FROM Lab WHERE Id = @LabId AND Status = 1";
    const labResult = await pool
      .request()
      .input("LabId", sql.Int, LabId)
      .query(labQuery);

    if (labResult.recordset.length === 0) {
      return res.status(404).json({ error: "Lab not found" });
    }
    const teamQuery = "SELECT * FROM Team WHERE Id = @TeamId AND Status = 1";
    const teamResult = await pool
      .request()
      .input("TeamId", sql.Int, TeamId)
      .query(teamQuery);

    if (teamResult.recordset.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const solutionQuery =
      "SELECT * FROM TeamSolution WHERE LabId = @LabId AND TeamId = @TeamId AND Status = 1";
    const solutionResult = await pool
      .request()
      .input("LabId", sql.Int, LabId)
      .input("TeamId", sql.Int, TeamId)
      .query(solutionQuery);

    if (solutionResult.recordset.length > 0) {
      await pool
        .request()
        .input("LabId", sql.Int, LabId)
        .input("TeamId", sql.Int, TeamId)
        .input("Solution", sql.NVarChar, req.body.Solution)
        .input("UpdateDate", sql.DateTime, currentDate)
        .query(
          "UPDATE TeamSolution SET Solution = @Solution, UpdateDate = @UpdateDate WHERE LabId = @LabId AND TeamId = @TeamId AND Status = 1"
        );
      res.status(200).json({ message: "Team solution overrided successfully!" });
    } else {
      await pool
        .request()
        .input("LabId", sql.Int, LabId)
        .input("TeamId", sql.Int, TeamId)
        .input("Solution", sql.NVarChar, req.body.Solution)
        .input("CreateDate", sql.DateTime, currentDate)
        .input("UpdateDate", sql.DateTime, currentDate)
        .input("Status", sql.Int, 1)
        .query(
          "INSERT INTO TeamSolution (LabId, TeamId, Solution, CreateDate, UpdateDate, Status) VALUES (@LabId, @TeamId, @Solution, @CreateDate, @UpdateDate, @Status)"
        );

      res.status(200).json({ message: "Team solution created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTeamSolutions: getTeamSolutions,
  getTeamSolutionById: getTeamSolutionById,
  getTeamSolutionsByTeamId: getTeamSolutionsByTeamId,
  createTeamSolution: createTeamSolution,
};
