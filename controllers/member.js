const sql = require("mssql");
const config = require("../dbConfig");

const getMembersInGroup = async (req, res) => {
  const groupId = req.query.GroupId;
  try {
    const pool = await sql.connect(config);
    const members = await pool
      .request()
      .input("GroupId", sql.Int, groupId)
      .query(
        "SELECT m.Id, m.GroupId, gr.Code AS GroupCode, gr.Name, m.SchoolId, m.StudentId, st.StudentCode, st.FullName FROM Member AS m JOIN [Group] AS gr ON m.GroupId = gr.Id JOIN Student AS st ON m.StudentId = st.Id WHERE gr.Id = @GroupId AND m.Status = 1 AND gr.Status = 1 AND st.Status = 1"
      );
    if (members.recordset.length === 0) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json(members.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProgramsOfAMember = async (req, res) => {
  const studentId = req.query.StudentId;
  try {
    const pool = await sql.connect(config);
    const members = await pool
      .request()
      .input("StudentId", sql.Int, studentId)
      .query(
        "SELECT m.Id, m.StudentId, st.ClassCode, st.FullName, m.ProgramId, pr.Code AS ProgramCode, pr.Name AS ProgramName, pr.SchoolYearId, pr.CreatedDate, pr.UpdatedDate, pr.Description, pr.Image FROM Member AS m JOIN Program as pr ON m.ProgramId = pr.Id JOIN Student AS st on m.StudentId = st.Id WHERE m.StudentId = @StudentId AND m.Status = 1 AND pr.Status = 1 AND st.Status = 1"
      );
    if (members.recordset.length === 0) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json(members.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGroupsOfAMember = async (req, res) => {
  const studentId = req.query.StudentId;
  try {
    const pool = await sql.connect(config);
    const members = await pool
      .request()
      .input("StudentId", sql.Int, studentId)
      .query(
        "SELECT m.Id, m.StudentId, st.ClassCode, st.FullName, m.GroupId, gr.Code AS GroupCode, gr.Name AS GroupName FROM Member AS m JOIN [Group] as gr ON m.GroupId = gr.Id JOIN Student AS st on m.StudentId = st.Id WHERE m.StudentId = @StudentId AND m.GroupId IS NOT NULL AND m.Status = 1 AND st.Status = 1 AND gr.Status = 1"
      );
    if (members.recordset.length === 0) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json(members.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAvailableProgramsOfAMember = async (req, res) => {
  const studentId = req.query.StudentId;
  try {
    const pool = await sql.connect(config);
    const programs = await pool
      .request()
      .input("StudentId", sql.Int, studentId)
      .query(
        "SELECT p.Id, p.Code, p.Name, p.Description, p.Image, p.CreatedDate, p.UpdatedDate, p.SchoolYearId, s.StartDate, s.EndDate FROM Program AS p JOIN SchoolYear AS s ON p.SchoolYearId = s.Id WHERE p.Status = 1 AND s.Status = 1 AND p.Id NOT IN (SELECT ProgramId FROM Member WHERE StudentId = @StudentId AND Status = 1)"
      );
    if (programs.recordset.length === 0) {
      res.status(404).json({ error: "No available programs found for this member" });
    } else {
      res.status(200).json(programs.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMember = async (req, res) => {
  const StudentId = req.query.StudentId;
  const ProgramId = req.query.ProgramId;
  try {
    const pool = await sql.connect(config);
    const studentQuery =
      "SELECT * FROM Student WHERE Id = @StudentId AND Status = 1";
    const studentResult = await pool
      .request()
      .input("StudentId", sql.Int, StudentId)
      .query(studentQuery);

    if (studentResult.recordset.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    const schoolQuery =
      "SELECT SchoolId FROM Student WHERE Id = @StudentId AND Status = 1";
    const schoolResult = await pool
      .request()
      .input("StudentId", sql.Int, StudentId)
      .query(schoolQuery);

    if (schoolResult.recordset.length === 0) {
      return res.status(404).json({ error: "School not found" });
    }

    const SchoolId = schoolResult.recordset[0].SchoolId

    const programQuery =
      "SELECT * FROM Program WHERE Id = @ProgramId AND Status = 1";
    const programResult = await pool
      .request()
      .input("ProgramId", sql.Int, ProgramId)
      .query(programQuery);
    if (programResult.recordset.length === 0) {
      return res.status(404).json({ error: "Program not found" });
    }

    const memberQuery =
      "SELECT Id FROM Member WHERE StudentId = @StudentId AND ProgramId = @ProgramId AND Status = 1";
    const memberResult = await pool
      .request()
      .input("StudentId", sql.Int, StudentId)
      .input("ProgramId", sql.Int, ProgramId)
      .query(memberQuery);
    if (memberResult.recordset.length > 0) {
      return res.status(404).json({ error: "This member already existed in this program!" });
    }

    await pool
      .request()
      .input("StudentId", sql.Int, StudentId)
      .input("SchoolId", sql.Int, SchoolId)
      .input("ProgramId", sql.Int, ProgramId)
      .input("Status", sql.Int, 1)
      .query(
        "INSERT INTO Member (StudentId, SchoolId, ProgramId, Status) VALUES (@StudentId, @SchoolId, @ProgramId, @Status)"
      );

    res.status(200).json({ message: "Member created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getMembersInGroup: getMembersInGroup,
  getProgramsOfAMember: getProgramsOfAMember,
  createMember: createMember,
  getAvailableProgramsOfAMember: getAvailableProgramsOfAMember,
  getGroupsOfAMember: getGroupsOfAMember,
};
