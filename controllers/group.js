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
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGroupByProgramId = async (req, res) => {
  const programId = req.query.ProgramId;
  try {
    const pool = await sql.connect(config);
    const group = await pool
      .request()
      .input("ProgramId", sql.Int, programId)
      .query(
        "SELECT gr.Id, gr.Code AS GroupCode, gr.Name AS GroupName, gr.TeacherId, gr.ProgramId, t.Code AS TeacherCode, t.Name AS TeacherName, p.Code AS ProgramCode, p.Name AS ProgramName FROM [Group] AS gr JOIN Teacher AS t ON gr.TeacherId = t.Id JOIN Program AS p ON gr.ProgramId = p.Id WHERE gr.ProgramId = @ProgramId AND gr.Status = 1 AND t.Status = 1 AND p.Status = 1"
      );
    if (group.recordset.length === 0) {
      res.status(404).json({ error: "Group not found" });
    } else {
      res.status(200).json(group.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGroupOfATeacherInProgram = async (req, res) => {
  const programId = req.query.ProgramId;
  const teacherId = req.query.TeacherId
  try {
    const pool = await sql.connect(config);
    const group = await pool
      .request()
      .input("ProgramId", sql.Int, programId)
      .input("TeacherId", sql.Int, teacherId)
      .query(
        "SELECT gr.Id, gr.Code AS GroupCode, gr.Name AS GroupName, gr.TeacherId, gr.ProgramId, t.Code AS TeacherCode, t.Name AS TeacherName, p.Code AS ProgramCode, p.Name AS ProgramName FROM [Group] AS gr JOIN Teacher AS t ON gr.TeacherId = t.Id JOIN Program AS p ON gr.ProgramId = p.Id WHERE gr.ProgramId = @ProgramId AND gr.TeacherId = @TeacherId AND gr.Status = 1 AND t.Status = 1 AND p.Status = 1"
      );
    if (group.recordset.length === 0) {
      res.status(404).json({ error: "Group not found" });
    } else {
      res.status(200).json(group.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAvailableGroupsInSchool = async (req, res) => {
  const { SchoolId, ProgramId } = req.query;

  try {
    const pool = await sql.connect(config);
    const groups = await pool
      .request()
      .input('SchoolId', sql.Int, SchoolId)
      .input('ProgramId', sql.Int, ProgramId)
      .query(
        "SELECT DISTINCT g.Id, g.Code AS GroupCode, g.Name FROM [Group] AS g JOIN Teacher AS t ON g.TeacherId = t.Id JOIN Program AS pr ON g.ProgramId = pr.Id WHERE t.SchoolId = @SchoolId AND g.ProgramId = @ProgramId AND g.Status = 1 AND t.Status = 1 AND pr.Status = 1"
      );
    res.status(200).json(groups.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const countGroupsInProgram = async (req, res) => {
  const ProgramId = parseInt(req.query.programId);

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ProgramId", sql.Int, ProgramId)
      .query(
        "SELECT COUNT(*) AS GroupCount FROM [Group] WHERE ProgramId = @ProgramId AND Status = 1"
      );
    
    const groupCount = result.recordset[0].GroupCount;
    res.status(200).json({groupCount});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createGroup = async (req, res) => {
  const ProgramId = req.query.ProgramId;
  const TeacherId = req.body.TeacherId;
  const Name = req.body.Name;
  const Status = 1;

  try {
    const pool = await sql.connect(config);

    // Check if ProgramId exists
    const program = await pool.request().input('ProgramId', sql.Int, ProgramId).query('SELECT * FROM Program WHERE Id = @ProgramId AND Status = 1');
    if (program.recordset.length === 0) {
      res.status(404).json({ error: "Program not found" });
      return;
    }

    // Check if TeacherId exists
    const teacher = await pool.request().input('TeacherId', sql.Int, TeacherId).query('SELECT * FROM Teacher WHERE Id = @TeacherId AND Status = 1');
    if (teacher.recordset.length === 0) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    // Generate unique Code
    const lastGroup = await pool.request().query('SELECT TOP 1 Code FROM [Group] WHERE Status = 1 ORDER BY Code DESC');
    const lastCode = lastGroup.recordset.length > 0 ? parseInt(lastGroup.recordset[0].Code.slice(3)) : 0;
    const Code = 'GRO' + String(lastCode + 1).padStart(3, '0');

    // Check if Name is unique
    const existingGroup = await pool.request().input('Name', sql.NVarChar, Name).query('SELECT * FROM [Group] WHERE Name = @Name AND Status = 1');
    if (existingGroup.recordset.length > 0) {
      res.status(400).json({ error: "Group name already exists" });
      return;
    }

    // Create new group
    const result = await pool.request()
      .input('Code', sql.NVarChar, Code)
      .input('Name', sql.NVarChar, Name)
      .input('ProgramId', sql.Int, ProgramId)
      .input('TeacherId', sql.Int, TeacherId)
      .input('Status', sql.Int, Status)
      .query(
        "INSERT INTO [Group] (Code, Name, ProgramId, TeacherId, Status) OUTPUT INSERTED.* VALUES (@Code, @Name, @ProgramId, @TeacherId, @Status)"
      );

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getGroups: getGroups,
  getGroupById: getGroupById,
  countGroupsInProgram: countGroupsInProgram,
  createGroup: createGroup,
  getGroupByProgramId: getGroupByProgramId,
  getAvailableGroupsInSchool: getAvailableGroupsInSchool,
  getGroupOfATeacherInProgram: getGroupOfATeacherInProgram,
};
