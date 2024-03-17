const sql = require("mssql");
const config = require("../dbConfig");

const getLabs = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const labs = await pool
      .request()
      .query(
        "SELECT l.Id, l.Code, l.Topic, l.Image, l.Description, l.CreatedDate, l.EndDate, l.StartDate, l.UpdatedDate, l.ProgramId, p.Name AS ProgramName FROM Lab AS l JOIN Program AS p ON l.ProgramId = p.Id WHERE l.Status = 1 AND p.Status = 1"
      );
    res.status(200).json(labs.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLabById = async (req, res) => {
  const labId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const lab = await pool
      .request()
      .input("Id", sql.Int, labId)
      .query(
        "SELECT l.Id, l.Code, l.Topic, l.Image, l.Description, l.CreatedDate, l.EndDate, l.StartDate, l.UpdatedDate, l.ProgramId, p.Name AS ProgramName FROM Lab AS l JOIN Program AS p ON l.ProgramId = p.Id WHERE l.Id = @Id AND l.Status = 1 AND p.Status = 1"
      );
    if (lab.recordset.length === 0) {
      res.status(404).json({ error: "Lab not found" });
    } else {
      res.status(200).json(lab.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLabByProgramId = async (req, res) => {
  const programId = req.query.ProgramId;
  try {
    const pool = await sql.connect(config);
    const lab = await pool
      .request()
      .input("ProgramId", sql.Int, programId)
      .query(
        "SELECT l.Id, l.Code, l.Topic, l.Image, l.Description, l.CreatedDate, l.EndDate, l.StartDate, l.UpdatedDate, l.ProgramId, p.Name AS ProgramName FROM Lab AS l JOIN Program AS p ON l.ProgramId = p.Id WHERE l.ProgramId = @ProgramId AND l.Status = 1 AND p.Status = 1"
      );
    if (lab.recordset.length === 0) {
      res.status(404).json({ error: "Lab not found" });
    } else {
      res.status(200).json(lab.recordset);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createLab = async (req, res) => {
  try {
    const currentDate = new Date();
    const pool = await sql.connect(config);

    const programQuery =
      "SELECT * FROM Program WHERE Id = @ProgramId AND Status = 1";
    const programResult = await pool
      .request()
      .input("ProgramId", sql.Int, req.query.ProgramId)
      .query(programQuery);

    if (programResult.recordset.length === 0) {
      return res.status(404).json({ error: "Program not found" });
    }

    // Generate the program code
    const labCodeQuery =
      "SELECT TOP 1 Code FROM Lab WHERE Status = 1 ORDER BY Code DESC";
    const lastLab = await pool.request().query(labCodeQuery);
    const lastCode = lastLab.recordset[0]?.Code || "LAB000";
    const lastNumber = parseInt(lastCode.substr(3));
    const newNumber = lastNumber + 1;
    const newCode = "LAB" + newNumber.toString().padStart(3, "0");

    await pool
      .request()
      .input("Code", sql.NVarChar, newCode)
      .input("CreatedDate", sql.DateTime, currentDate)
      .input("UpdatedDate", sql.DateTime, currentDate)
      .input("StartDate", sql.DateTime, req.body.StartDate)
      .input("EndDate", sql.DateTime, req.body.EndDate)
      .input("Topic", sql.NVarChar, req.body.Topic)
      .input("Image", sql.NVarChar, req.body.Image)
      .input("Description", sql.NVarChar, req.body.Description)
      .input("Status", sql.Int, 1)
      .input("ProgramId", sql.Int, req.query.ProgramId)
      .query(
        "INSERT INTO Lab (Code, CreatedDate, UpdatedDate, StartDate, EndDate, Topic, Image, Description, Status, ProgramId) VALUES (@Code, @CreatedDate, @UpdatedDate, @StartDate, @EndDate, @Topic, @Image, @Description, @Status, @ProgramId)"
      );

    res.status(200).json({ message: "Lab created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateLab = async (req, res) => {
  const labId = req.params.Id;
  const currentDate = new Date();
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, labId)
      .input("StartDate", sql.DateTime, req.body.StartDate)
      .input("EndDate", sql.DateTime, req.body.EndDate)
      .input("Topic", sql.NVarChar, req.body.Topic)
      .input("Image", sql.NVarChar, req.body.Image)
      .input("Description", sql.NVarChar, req.body.Description)
      .input("UpdatedDate", sql.DateTime, currentDate)
      .query(
        "UPDATE Lab SET StartDate = @StartDate, EndDate = @EndDate, Topic = @Topic, Image = @Image, Description = @Description, UpdatedDate = @UpdatedDate WHERE Id = @Id AND Status = 1"
      );
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Lab not found" });
    } else {
      res.status(200).json({ message: "Lab updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteLab = async (req, res) => {
  const labId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, labId)
      .query("UPDATE Lab SET Status = 0 WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Lab not found" });
    } else {
      res.status(200).json({ message: "Lab deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLabs: getLabs,
  getLabById: getLabById,
  getLabByProgramId: getLabByProgramId,
  createLab: createLab,
  updateLab: updateLab,
  deleteLab: deleteLab,
};
