const SubGroup = require('../models/subGroupModel'); // Import model

// Controller to fetch subgroups
exports.getSubGroups = async (req, res) => {
    const { mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code } = req.query;

    try {
        // Call the model to fetch subgroups
        const subGroups = await SubGroup.fetchSubGroups(
            mainGroupCode,
            subGroup1Code,
            subGroup2Code,
            subGroup3Code,
            subGroup4Code
        );

        // Return the response
        res.status(200).json(subGroups);
    } catch (error) {
        console.error('Error fetching subgroups:', error);
        res.status(500).json({ error: 'Failed to fetch subgroups' });
    }
};
