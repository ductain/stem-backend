const sql = require("mssql");
const config = require("../dbConfig");
const { getList } = require("../config/Utils");


const getTeachers = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    let query =
      "SELECT t.Id, t.Code AS TeacherCode, t.Name AS TeacherName, t.Email, t.Gender,t.DateOfBirth, t.Address, t.SchoolId, sc.Code AS SchoolCode, sc.Name AS SchoolName FROM Teacher AS t JOIN School AS sc on t.SchoolId = sc.Id WHERE t.Status = 1 AND sc.Status = 1";

    const listQuery = getList(req, ["t.Name", "t.Code"], ["Id", "TeacherName"]);
    const finalQuery = query + listQuery;
    const teachers = await pool.request().query(finalQuery);

    res.status(200).json(teachers.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
        "SELECT t.Id, t.Code AS TeacherCode, t.Name AS TeacherName, t.Email, t.Gender,t.DateOfBirth, t.Address, t.SchoolId, sc.Code AS SchoolCode, sc.Name AS SchoolName FROM Teacher AS t JOIN School AS sc on t.SchoolId = sc.Id WHERE t.Id = @Id AND t.Status = 1 AND sc.Status = 1"
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

const getTeachersBySchoolId = async (req, res) => {
  const schoolId = req.query.SchoolId;
  try {
    const pool = await sql.connect(config);
    let query =
      "SELECT t.Id, t.Code AS TeacherCode, t.Name AS TeacherName, t.Email, t.Gender,t.DateOfBirth, t.Address, t.SchoolId, sc.Code AS SchoolCode, sc.Name AS SchoolName FROM Teacher AS t JOIN School AS sc on t.SchoolId = sc.Id WHERE t.SchoolId = @SchoolId AND t.Status = 1 AND sc.Status = 1";

    const listQuery = getList(req, ["t.Name", "t.Code"], ["Id", "TeacherName"]);
    const finalQuery = query + listQuery;
    const teachers = await pool
      .request()
      .input("SchoolId", sql.Int, schoolId)
      .query(finalQuery);

    res.status(200).json(teachers.recordset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getTeachers: getTeachers,
    getTeacherById: getTeacherById,
    getTeachersBySchoolId: getTeachersBySchoolId,
}
