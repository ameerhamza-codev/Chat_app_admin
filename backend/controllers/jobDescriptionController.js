const JobDescriptionModel = require('../models/jobDescriptionModel');

exports.addJobDescription = async (req, res) => {
    try {
      const { name } = req.body;
      const result = await JobDescriptionModel.addJobDescription(name);
      const newJobDescription = { id: result.insertId, name };
      return res.status(201).json(newJobDescription);
    } catch (error) {
      console.error('Error adding job description:', error);
  
      // MySQL duplicate entry error is typically code = 'ER_DUP_ENTRY'
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          message: 'Job description already exists',
        });
      }
  
      return res.status(500).json({ 
        message: 'Error adding job description', 
        error 
      });
    }
  };
  
  



exports.getAllJobDescriptions = async (req, res) => {
    try {
        const data = await JobDescriptionModel.getAllJobDescriptions();
        res.status(200).json(data); // Always send the latest data back
    } catch (error) {
        console.error('Error fetching job descriptions:', error);
        res.status(500).json({ message: 'Error fetching job descriptions', error });
    }
};


exports.updateJobDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await JobDescriptionModel.updateJobDescription(id, name); // Update database
        if (result.affectedRows > 0) {
            res.status(200).json({ id, name }); // Return updated item
        } else {
            res.status(404).json({ message: 'Job description not found' });
        }
    } catch (error) {
        console.error('Error updating job description:', error);
        res.status(500).json({ message: 'Error updating job description', error });
    }
};


exports.deleteJobDescription = async (req, res) => {
    try {
        const { id } = req.params;
        await JobDescriptionModel.deleteJobDescription(id); // Delete from database
        res.status(200).json({ message: 'Job description deleted successfully' });
    } catch (error) {
        console.error('Error deleting job description:', error);
        res.status(500).json({ message: 'Error deleting job description', error });
    }
};

