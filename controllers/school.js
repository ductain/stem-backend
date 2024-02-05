const sql = require("mssql");
const config = require("../dbConfig");

const getSchools = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const schools = await pool
      .request()
      .query(
        "SELECT s.Id, p.Code AS ProvinceCode, s.ProvinceId, p.Name AS ProvinceName, s.Code AS SchoolCode, s.Name AS SchoolName, s.Address FROM School AS s JOIN Province AS p on s.ProvinceId = p.Id WHERE p.Status = 1 AND s.Status = 1"
      );
    res.status(200).json(schools.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSchoolById = async (req, res) => {
  const schoolId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const school = await pool
      .request()
      .input("Id", sql.Int, schoolId)
      .query(
        "SELECT s.Id, p.Code AS ProvinceCode, s.ProvinceId, p.Name AS ProvinceName, s.Code AS SchoolCode, s.Name AS SchoolName, s.Address FROM School AS s JOIN Province AS p on s.ProvinceId = p.Id WHERE s.Id = @Id AND p.Status = 1 AND s.Status = 1"
      );
    if (school.recordset.length === 0) {
      res.status(404).json({ error: "School not found" });
    } else {
      res.status(200).json(school.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSchools: getSchools,
  getSchoolById: getSchoolById,
};
