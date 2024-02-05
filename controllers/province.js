const sql = require("mssql");
const config = require("../dbConfig");

const getProvinces = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const provinces = await pool
      .request()
      .query("SELECT Id, Code, Name FROM Province WHERE Status = 1");
    res.status(200).json(provinces.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProvinceById = async (req, res) => {
  const provinceId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const province = await pool
      .request()
      .input("Id", sql.Int, provinceId)
      .query(
        "SELECT Id, Code, Name FROM Province WHERE Id = @Id AND Status = 1"
      );
    if (province.recordset.length === 0) {
      res.status(404).json({ error: "Province not found" });
    } else {
      res.status(200).json(province.recordset[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProvince = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const codeRegex = /^PRV\d+$/;  // Regex pattern to match "PRV" followed by one or more digits

    // Query the database to find the highest existing code
    const highestCodeResult = await pool
      .request()
      .query("SELECT MAX(CAST(SUBSTRING(Code, 4, 100) AS INT)) AS MaxCode FROM Province WHERE Status = 1");

    let code = "PRV1" // Initial province code;
    const maxCode = highestCodeResult.recordset[0].MaxCode;
    if (maxCode) {
      code = `PRV${(maxCode + 1).toString()}`;
    }

    if (!codeRegex.test(code)) {
      throw new Error("Invalid Code format. Code should be in the format PRV followed by a number (e.g., PRV1, PRV2).");
    }
    await pool
      .request()
      .input("Code", sql.NVarChar, code)
      .input("Name", sql.NVarChar, req.body.Name)
      .input("Status", sql.Int, 1)
      .query(
        "INSERT INTO Province (Code, Name, Status) VALUES (@Code, @Name, @Status)"
      );
    res.status(200).json({ message: "Province created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProvince = async (req, res) => {
  const provinceId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Name", sql.NVarChar, req.body.Name)
      .input("Id", sql.Int, provinceId)
      .query("UPDATE Province SET Name = @Name WHERE Id = @Id AND Status = 1");
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Province not found" });
    } else {
      res.status(200).json({ message: "Province updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const deleteProvince = async (req, res) => {
  const provinceId = req.params.Id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, provinceId)
      .query("UPDATE Province SET Status = 0 WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "Province not found" });
    } else {
      res.status(200).json({ message: "Province deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getProvinces: getProvinces,
  getProvinceById: getProvinceById,
  createProvince: createProvince,
  updateProvince: updateProvince,
  deleteProvince: deleteProvince,
};
