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

module.exports = {
    getMembersInGroup: getMembersInGroup,
}
