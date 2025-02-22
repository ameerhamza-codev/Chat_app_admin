const db = require("../config/database");

// Add a new user
exports.addUser = async (userData) => {
  const query = `
      INSERT INTO alluser (
          mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code, 
          name, fatherName, displayName, DOB, landline, companyName, workingCountry, 
          workingCity, occupation, email, mobile, gender, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Prepare values, ensure nulls for optional fields
  const values = [
    userData.mainGroupCode || null,
    userData.subGroup1Code || null,
    userData.subGroup2Code || null,
    userData.subGroup3Code || null,
    userData.subGroup4Code || null,
    userData.name || '',  // Ensure name is never null
    userData.fatherName || '',
    userData.displayName || '',
    userData.DOB || null,
    userData.landline || '',
    userData.companyName || '',
    userData.workingCountry || '',
    userData.workingCity || '',
    userData.occupation || '',
    userData.email || '',
    userData.mobile || '',  // Ensure mobile is never null
    userData.gender || 'Male',  // Default to Male
    userData.password || '',  // Ensure password is provided
  ];

  try {
    console.log('Executing query:', query);
    console.log('With values:', values);
    return await db.execute(query, values);
  } catch (error) {
    console.error('Error in addUser query:', error.message);
    throw error;
  }
};



  

// Fetch dropdown options with code, id, and name
exports.fetchDropdownData = async (tableName) => {
  const tablesWithCode = ['main_Groups', 'sub_Group1', 'sub_Group2', 'sub_Group3', 'sub_Group4'];
  const query = tablesWithCode.includes(tableName)
    ? `SELECT id, code, name FROM ${tableName}`
    : `SELECT id, name FROM ${tableName}`;
  return db.execute(query);
};

// Search users
exports.searchUsers = async (searchParams) => {
    const query = `
      SELECT * FROM alluser
      WHERE name LIKE ? OR email LIKE ? OR mobile LIKE ? OR workingCity LIKE ? OR workingCountry LIKE ?
    `;
    const values = [
      `%${searchParams.keyword}%`,
      `%${searchParams.keyword}%`,
      `%${searchParams.keyword}%`,
      `%${searchParams.keyword}%`,
      `%${searchParams.keyword}%`,
    ];
  
    console.log("Search Query:", query); // Log the query
    console.log("Query Values:", values); // Log the substituted values
  
    try {
      return await db.execute(query, values);
    } catch (error) {
      console.error("Error in searchUsers:", error.message);
      throw error;
    }
  };
  

// Export users
exports.exportUsers = async () => {
  const query = `
    SELECT 
      mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code, 
      name, fatherName, displayName, DOB, landline, companyName, workingCountry, workingCity, occupation, email, mobile, gender, password
    FROM alluser
  `;
  return db.execute(query);
};
exports.deleteUser = async (id) => {
  const query = `DELETE FROM alluser WHERE id = ?`;
  try {
      return await db.execute(query, [id]);
  } catch (error) {
      console.error("Error in deleteUser query:", error.message);
      throw error;
  }
};
exports.updateUser = async (id, userData) => {
  try {
      // Map frontend fields to backend column names if needed
      const fieldMapping = {
          referToFriend: 'refer_to_friend',
          groupCode: 'group_code',
          action: 'action',
          subGroup1Representative: 'sub_group1_representative',
          subGroup2Representative: 'sub_group2_representative',
          subGroup3Representative: 'sub_group3_representative',
          subGroup4Representative: 'sub_group4_representative',
      };

      // Map userData keys to the database column names
      const dbUserData = Object.fromEntries(
          Object.entries(userData).map(([key, value]) => [
              fieldMapping[key] || key, // Replace key if mapping exists
              value,
          ])
      );

      // Dynamically build the SET clause
      const keys = Object.keys(dbUserData);
      const setClause = keys.map((key) => `${key} = ?`).join(', ');
      const values = [...keys.map((key) => dbUserData[key]), id];

      const query = `UPDATE alluser SET ${setClause} WHERE id = ?`;

      console.log('Generated Query:', query); // Debugging
      console.log('Query Values:', values); // Debugging

      return await db.execute(query, values);
  } catch (error) {
      console.error('Error in updateUser query:', error.message);
      throw error;
  }
};


