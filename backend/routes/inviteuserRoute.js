const express = require('express');
const { body, validationResult } = require('express-validator');
const {
    addInvitedUser,
    getInvitedUsers,
    deleteInvitedUser,
    updateInvite,
    generateInviteOTP,
    verifyInviteOTP
} = require('../controllers/inviteuserController');

const router = express.Router();

// Add an invited user with validation
router.post(
    '/invite',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('mobile').notEmpty().withMessage('Mobile number is required'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    addInvitedUser
);

// Fetch all invited users
router.get('/invited-users', getInvitedUsers);

// Delete an invited user
router.delete('/invite/:id', deleteInvitedUser);
router.put('/:id', updateInvite);

// Generate OTP route
router.post('/generate-otp', generateInviteOTP);

// Verify OTP route
router.post('/verify-otp', verifyInviteOTP);

module.exports = router;
