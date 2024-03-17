const sql = require("mssql");
const config = require("../dbConfig");

const getStudents = async (req, res) => {
  const {search, page = 1, limit = 10, sortField = 'Id', sortOrder = 'ASC' } = req.query
  
  try {
    const pool = await sql.connect(config);
    let query = "SELECT st.Id, st.SchoolYearId, st.StudentCode, st.FullName, st.Email, st.ClassCode, sc.Name AS SchoolName, st.DateOfBirth, st.Gender, st.Address AS StudentAddress FROM Student AS st JOIN School AS sc on st.SchoolId = sc.Id WHERE st.Status = 1 AND sc.Status = 1";

    // Adding search filter
    if (search) {
      query += ` AND st.FullName LIKE '%${search}%'`;
    }

    // Adding sorting
    if (sortField && sortOrder) {
      const validSortFields = ["Id", "StudentCode", "FullName", "Email", "ClassCode", "SchoolName", "DateOfBirth", "Gender", "StudentAddress"];
      const validSortOrders = ["asc", "desc"];
      if (
        validSortFields.includes(sortField) &&
        validSortOrders.includes(sortOrder.toLowerCase())
      ) {
        query += ` ORDER BY ${sortField} ${sortOrder}`;
      }
    }

    // Adding paging
    if (page && limit) {
      const offset = (page - 1) * limit;
      query += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }

    const students = await pool.request().query(query);

    res.status(200).json(students.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStudentByStudentCode = async (req, res) => {
  const StudentCode = req.params.StudentCode;
  try {
    const pool = await sql.connect(config);
    const student = await pool
      .request()
      .input("StudentCode", sql.NVarChar, StudentCode)
      .query(
        "SELECT st.Id, st.SchoolYearId, st.StudentCode, st.FullName, st.Email, st.ClassCode, sc.Name AS SchoolName, st.DateOfBirth, st.Gender, st.Address AS StudentAddress FROM Student AS st JOIN School AS sc on st.SchoolId = sc.Id WHERE st.StudentCode = @StudentCode AND st.Status = 1 AND sc.Status = 1"
      );
    if (student.recordset.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json(student.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStudentByEmail = async (req, res) => {
  const Email = req.query.Email;
  try {
    const pool = await sql.connect(config);
    const student = await pool
      .request()
      .input("Email", sql.NVarChar, Email)
      .query(
        "SELECT st.Id, st.SchoolYearId, st.StudentCode, st.FullName, st.Email, st.ClassCode, sc.Name AS SchoolName, st.DateOfBirth, st.Gender, st.Address AS StudentAddress FROM Student AS st JOIN School AS sc on st.SchoolId = sc.Id WHERE st.Email = @Email AND st.Status = 1 AND sc.Status = 1"
      );
    if (student.recordset.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json(student.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getStudents: getStudents,
  getStudentByStudentCode: getStudentByStudentCode,
  getStudentByEmail: getStudentByEmail,
};
