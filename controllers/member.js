const sql = require('mssql')
const config = require('../dbConfig')

const getMembersInGroup = async(req, res) => {
    const groupId = req.params.GroupId
    try {
        const pool = await sql.connect(config)
        const members = await pool
            .request()
            .input("GroupId", sql.Int, groupId)
            .query("SELECT m.Id, m.GroupId, gr.Code, gr.Name, m.SchoolId, m.StudentId, st.StudentCode, st.FullName FROM Member AS m JOIN [Group] AS gr ON m.GroupId = gr.Id JOIN Student AS st ON m.StudentId = st.Id WHERE gr.Id = 2")
    } catch (error) {
        
    }
}