const getList = (req, searchableFields = ["Name"], sortableFields = ["Id"]) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortField = "Id",
    sortOrder = "ASC",
  } = req.query;
  const offset = (page - 1) * limit;

  let query = "";

  // Adding search filter
  if (search && searchableFields.length > 0) {
    const searchQuery = searchableFields
      .map((field) => `${field} LIKE '%${search}%'`)
      .join(" OR ");
    query += ` AND (${searchQuery})`;
  }

  // Adding sorting
  if (sortField && sortOrder && sortableFields.includes(sortField)) {
    query += ` ORDER BY ${sortField} ${sortOrder}`;
  }

  // Adding paging
  if (page && limit) {
    query += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
  }
  return query;
};

module.exports = {
    getList: getList
}
