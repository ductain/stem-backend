const sql = require("mssql");
const config = require("../dbConfig");

const getPrograms = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const programs = await pool
      .request()
      .query(
        "SELECT p.Id, p.Code, p.Name, p.Description, p.Image, p.CreatedDate, p.UpdatedDate, p.SchoolYearId, s.StartDate, s.EndDate FROM Program AS p JOIN SchoolYear AS s ON p.SchoolYearId = s.Id WHERE p.Status = 1 AND s.Status = 1"
      );
    res.status(200).json(programs.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProgramById = async (req, res) => {
  const programId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const program = await pool
      .request()
      .input("Id", sql.Int, programId)
      .query(
        "SELECT p.Id, p.Code, p.Name, p.Description, p.Image, p.CreatedDate, p.UpdatedDate, p.SchoolYearId, s.StartDate, s.EndDate FROM Program AS p JOIN SchoolYear AS s ON p.SchoolYearId = s.Id WHERE p.Id = @Id AND p.Status = 1 AND s.Status = 1"
      );
    if (program.recordset.length === 0) {
      res.status(404).json({ error: "Program not found" });
    } else {
      res.status(200).json(program.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProgram = async (req, res) => {
  try {
    const currentDate = new Date();
    const pool = await sql.connect(config);

    const schoolYearQuery =
      "SELECT * FROM SchoolYear WHERE Id = @SchoolYearId AND Status = 1";
    const schoolYearResult = await pool
      .request()
      .input("SchoolYearId", sql.Int, req.query.SchoolYearId)
      .query(schoolYearQuery);

    if (schoolYearResult.recordset.length === 0) {
      return res.status(404).json({ error: "School Year not found" });
    }

    // Generate the program code
    const programCodeQuery =
      "SELECT TOP 1 Code FROM Program WHERE Status = 1 ORDER BY Code DESC";
    const lastProgram = await pool.request().query(programCodeQuery);
    const lastCode = lastProgram.recordset[0]?.Code || "PRO000";
    const lastNumber = parseInt(lastCode.substr(3));
    const newNumber = lastNumber + 1;
    const newCode = "PRO" + newNumber.toString().padStart(3, "0");

    await pool
      .request()
      .input("Code", sql.NVarChar, newCode)
      .input("CreatedDate", sql.DateTime, currentDate)
      .input("UpdatedDate", sql.DateTime, currentDate)
      .input("Name", sql.NVarChar, req.body.Name)
      .input("Description", sql.NVarChar, req.body.Description)
      .input("Status", sql.Int, 1)
      .input("SchoolYearId", sql.Int, req.query.SchoolYearId)
      .input("Image", sql.NVarChar, req.body.Image)
      .query(
        "INSERT INTO Program (Code, CreatedDate, UpdatedDate, Name, Description, Status, SchoolYearId, Image) VALUES (@Code, @CreatedDate, @UpdatedDate, @Name, @Description, @Status, @SchoolYearId, @Image)"
      );

    res.status(200).json({ message: "Program created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProgram = async (req, res) => {
  const programId = req.params.Id;
  const currentDate = new Date();
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, programId)
      .input("Name", sql.NVarChar, req.body.Name)
      .input("Description", sql.NVarChar, req.body.Description)
      .input("Image", sql.NVarChar, req.body.Image)
      .input("UpdatedDate", sql.DateTime, currentDate)
      .query(
        "UPDATE Program SET Name = @Name, Description = @Description, Image = @Image, UpdatedDate = @UpdatedDate WHERE Id = @Id AND Status = 1"
      );
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Program not found" });
    } else {
      res.status(200).json({ message: "Program updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProgram = async (req, res) => {
  const programId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, programId)
      .query("UPDATE Program SET Status = 0 WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Program not found" });
    } else {
      res.status(200).json({ message: "Program deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPrograms: getPrograms,
  getProgramById: getProgramById,
  createProgram: createProgram,
  updateProgram: updateProgram,
  deleteProgram: deleteProgram,
};
