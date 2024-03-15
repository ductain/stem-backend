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
    res.status(500).json({ error: "Internal Server Error" })
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
        "SELECT m.Id, m.StudentId, st.ClassCode, st.FullName, m.ProgramId, pr.Code AS ProgramCode, pr.Name AS ProgramName, pr.CreatedDate, pr.UpdatedDate, pr.Description, pr.Image, m.GroupId, gr.Code AS GroupCode, gr.Name AS GroupName FROM Member AS m JOIN Program as pr ON m.ProgramId = pr.Id JOIN Student AS st on m.StudentId = st.Id JOIN [Group] AS gr on m.GroupId = gr.Id WHERE m.StudentId = @StudentId AND m.Status = 1 AND pr.Status = 1 AND st.Status = 1"
      );
    if (members.recordset.length === 0) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json(members.recordset);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
};

const createMember = (req, res) => {
  const { StudentId, ProgramId } = req.body;

  // Query the SchoolId based on the StudentId
  const schoolQuery = "SELECT SchoolId FROM Student WHERE StudentId = @StudentId";
  const schoolParameters = { StudentId: StudentId };

  // Query the GroupId based on the ProgramId
  const groupQuery = "SELECT Id FROM [Group] WHERE ProgramId = @ProgramId";
  const groupParameters = { ProgramId: ProgramId };

  // Check if member already exists
  const memberQuery = "SELECT * FROM Member WHERE StudentId = @StudentId";
  const memberParameters = { StudentId: StudentId };

  // Replace this part with your actual database query code
  // For example, using the "mssql" library:
  sql.connect(config, (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const request = new sql.Request();

    // Execute the query to retrieve the SchoolId
    request.input("StudentId", sql.Int, StudentId);
    request.query(schoolQuery, (schoolResults) => {
      if (!schoolResults || !schoolResults.recordset || schoolResults.recordset.length === 0) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      const SchoolId = schoolResults.recordset[0].SchoolId;

      // Execute the query to retrieve the GroupId
      request.input("ProgramId", sql.Int, ProgramId);
      request.query(groupQuery, (groupResults) => {
        if (!groupResults || !groupResults.recordset || groupResults.recordset.length === 0) {
          return res.status(404).json({
            message: "Group not found",
          });
        }

        const GroupId = groupResults.recordset[0].Id;

        // Check if member already exists
        request.input("StudentId", sql.Int, StudentId);
        request.query(memberQuery, (error, memberResults) => {
          if (memberResults && memberResults.recordset && memberResults.recordset.length > 0) {
            return res.status(409).json({
              message: "Member already exists",
            });
          }

          // Create the member in the Member table
          const createMemberQuery = "INSERT INTO Member (StudentId, SchoolId, GroupId, ProgramId, Status) VALUES (@StudentId, @SchoolId, @GroupId, @ProgramId, 1)";
          const createMemberParameters = {
            StudentId: StudentId,
            SchoolId: SchoolId,
            GroupId: GroupId,
            ProgramId: ProgramId,
          };

          request.query(createMemberQuery, createMemberParameters, (error) => {
            res.status(200).json({
              message: "Member created successfully",
            });
          });
        });
      });
    });
  });
};

module.exports = {
    getMembersInGroup: getMembersInGroup,
    getProgramsOfAMember: getProgramsOfAMember,
    createMember: createMember,
}
