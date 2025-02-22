const db = require('../config/database');
const InviteModel = require('../models/inviteModel');


const toNullable = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === 'Select' ||
        (typeof value === 'string' && !value.trim())
    ) {
        return null;
    }
    return value;
};

// Add an invited user
exports.addInvitedUser = async (req, res) => {
    console.log(`POST /api/invite triggered by IP: ${req.ip}`);
    console.log('addInvitedUser called with:', req.body);

    const {
        mainGroupCode,
        subGroup1Code,
        subGroup2Code,
        subGroup3Code,
        subGroup4Code,
        name,
        email,
        mobile,
        gender,
        additionalResponsibility,
        referrer,
    } = req.body;

    // Basic required fields check
    if (!name || !email || !mobile ) {
        return res
            .status(400)
            .json({ error: 'All required fields must be filled.' });
    }
 
    try {
        // Check for duplicates
        const checkDuplicateSql = `SELECT id FROM invited_users WHERE email = ? OR mobile = ?`;
        const [existingUser] = await db.query(checkDuplicateSql, [email, mobile]);

        if (existingUser.length > 0) {
            return res
                .status(409)
                .json({ error: 'User with this email or mobile already exists.' });
        }

        // Convert group codes to NULL if empty
        const mainGroup = toNullable(mainGroupCode);
        const subGroup1 = toNullable(subGroup1Code);
        const subGroup2 = toNullable(subGroup2Code);
        const subGroup3 = toNullable(subGroup3Code);
        const subGroup4 = toNullable(subGroup4Code);

        const sql = `
            INSERT INTO invited_users 
            (
                main_group_code,
                sub_group1_code,
                sub_group2_code,
                sub_group3_code,
                sub_group4_code,
                name,
                email,
                mobile,
                gender,
                additional_responsibility,
                referrer
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            mainGroup,
            subGroup1,
            subGroup2,
            subGroup3,
            subGroup4,
            name,
            email,
            mobile,
            gender,
            additionalResponsibility || null,
            referrer || null,
        ]);

        res
            .status(201)
            .json({ message: 'User invited successfully', id: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res
                .status(409)
                .json({ error: 'Duplicate entry: User with this email or mobile already exists.' });
        }
        console.error('Database Error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Fetch all invited users
exports.getInvitedUsers = async (req, res) => {
    try {
        const sql = `
          SELECT 
            id, 
            name, 
            email, 
            mobile, 
            gender, 
            main_group_code AS mainGroupCode,
            sub_group1_code AS subGroup1Code,
            sub_group2_code AS subGroup2Code,
            sub_group3_code AS subGroup3Code,
            sub_group4_code AS subGroup4Code,
            additional_responsibility AS additionalResponsibility,
            referrer
          FROM invited_users
          ORDER BY id DESC
        `;
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error('Database Query Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete an invited user
exports.deleteInvitedUser = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `DELETE FROM invited_users WHERE id = ?`;
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};
exports.updateInvite = async (req, res) => {
    console.log('PUT /api/invite/:id triggered');
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    try {
        const { id } = req.params;
        const data = req.body;

        // Example logic: Update the invite in the database
        const result = await InviteModel.updateInviteById(id, data);

        if (!result) {
            console.warn('No invite found with the given ID:', id);
            return res.status(404).json({ message: 'Invite not found' });
        }

        console.log('Invite updated successfully:', result);
        res.status(200).json({ message: 'Invite updated successfully', data: result });
    } catch (error) {
        console.error('Error updating invite:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

  
// 2. Generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // 3. Endpoint to generate OTP (POST /api/invite/generate-otp)
  exports.generateInviteOTP = async (req, res) => {
    try {
      const {
        mainGroupCode,
        subGroup1Code,
        subGroup2Code,
        subGroup3Code,
        subGroup4Code,
        name,
        email,
        mobile,
        gender,
        additionalResponsibility,
        referrer,
      } = req.body;
  
      if (!mobile) {
        return res.status(400).json({ error: 'Mobile is required.' });
      }
  
      const otp = generateOTP();
  
      const sql = `
        INSERT INTO invited_users 
        (
          main_group_code, sub_group1_code, sub_group2_code, sub_group3_code, sub_group4_code,
          name, email, mobile, gender, additional_responsibility, referrer, otp
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          main_group_code = VALUES(main_group_code),
          sub_group1_code = VALUES(sub_group1_code),
          sub_group2_code = VALUES(sub_group2_code),
          sub_group3_code = VALUES(sub_group3_code),
          sub_group4_code = VALUES(sub_group4_code),
          name = VALUES(name),
          email = VALUES(email),
          mobile = VALUES(mobile),
          gender = VALUES(gender),
          additional_responsibility = VALUES(additional_responsibility),
          referrer = VALUES(referrer),
          otp = VALUES(otp),
          updated_at = CURRENT_TIMESTAMP
      `;
  
      await db.query(sql, [
        mainGroupCode || null,
        subGroup1Code || null,
        subGroup2Code || null,
        subGroup3Code || null,
        subGroup4Code || null,
        name || null,
        email || null,
        mobile,
        gender || null,
        additionalResponsibility || null,
        referrer || 0,
        otp,
      ]);
  
      return res.status(200).json({
        message: 'OTP generated successfully',
        otp, // or not
      });
    } catch (error) {
      console.error('Error generating invite OTP:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // 4. Endpoint to verify OTP (POST /api/invite/verify-otp)
  exports.verifyInviteOTP = async (req, res) => {
    try {
      const { mobile, otp } = req.body;
  
      if (!mobile || !otp) {
        return res
          .status(400)
          .json({ error: 'mobile and otp are required.' });
      }
  
      // find in invite_user
      const [rows] = await db.query(
        'SELECT * FROM invited_users WHERE mobile = ? LIMIT 1',
        [mobile]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Invite user not found.' });
      }
  
      const inviteUser = rows[0];
  
      // check OTP
      if (inviteUser.otp !== otp) {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
  
      // Insert into all_user
      const insertSql = `
        INSERT INTO alluser
        (
          mainGroupCode,
          subGroup1Code,
          subGroup2Code,
          subGroup3Code,
          subGroup4Code,
          name,
          email,
          mobile,
          gender,
          refer_to_friend,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
  
      await db.query(insertSql, [
        inviteUser.main_group_code,
        inviteUser.sub_group1_code,
        inviteUser.sub_group2_code,
        inviteUser.sub_group3_code,
        inviteUser.sub_group4_code,
        inviteUser.name,
        inviteUser.email,
        inviteUser.mobile,
        inviteUser.gender,
        inviteUser.referrer,
      ]);
  
      // delete from invite_user
      await db.query('DELETE FROM invited_users WHERE id = ?', [inviteUser.id]);
  
      return res
        .status(200)
        .json({ message: 'OTP verified. User moved to alluser.' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };