const sql = require("mssql");
const config = require("../dbConfig");

const getTeachers = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const teachers = await pool
      .request()
      .query(
        "SELECT t.Id, t.Code AS TeacherCode, t.Name AS TeacherName, t.Email, t.Gender,t.DateOfBirth, t.Address, sc.Code AS SchoolCode, sc.Name AS SchoolName FROM Teacher AS t JOIN School AS sc on t.SchoolId = sc.Id WHERE t.Status = 1 AND sc.Status = 1"
      );
    res.status(200).json(teachers.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTeacherById = async (req, res) => {
  const teacherId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const teacher = await pool
      .request()
      .input("Id", sql.Int, teacherId)
      .query(
        "SELECT t.Id, t.Code AS TeacherCode, t.Name AS TeacherName, t.Email, t.Gender,t.DateOfBirth, t.Address, sc.Code AS SchoolCode, sc.Name AS SchoolName FROM Teacher AS t JOIN School AS sc on t.SchoolId = sc.Id WHERE t.Id = @Id AND t.Status = 1 AND sc.Status = 1"
      );
    if (teacher.recordset.length === 0) {
      res.status(404).json({ error: "Teacher not found" });
    } else {
      res.status(200).json(teacher.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getTeachers: getTeachers,
    getTeacherById: getTeacherById
}
