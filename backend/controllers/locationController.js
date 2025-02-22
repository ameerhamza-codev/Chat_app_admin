const Location = require('../models/locationModel');

// Add Location
exports.addLocation = async (req, res) => {
  const { name, code } = req.body;
  try {
    const [result] = await Location.add(name, code);
    return res
      .status(201)
      .json({ message: 'Location added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding location:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      // Return 409 Conflict for duplicates
      return res
        .status(409)
        .json({ error: 'Duplicate location entry. Please use a unique code or name.' });
    }
    
    return res.status(500).json({ error: 'Error adding location' });
  }
};


  // Get all locations
  exports.getAllLocations = async (req, res) => {
    try {
      const rows = await Location.getAll();
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching locations:', err);
      res.status(500).json({ error: 'Error fetching locations' });
    }
  };

// Update Location
exports.updateLocation = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Location.update(id, name, (err) => {
    if (err) return res.status(500).json({ error: 'Error updating location' });
    res.status(200).json({ message: 'Location updated successfully' });
  });
};

// Delete Location
exports.deleteLocation = async (req, res) => {
    const { id } = req.params;
    try {
      await Location.delete(id);
      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
      console.error('Error deleting location:', err);
      res.status(500).json({ error: 'Error deleting location' });
    }
  };

// Export Locations
exports.exportLocations = async (req, res) => {
    try {
      const rows = await Location.export();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(rows));
    } catch (err) {
      console.error('Error exporting locations:', err);
      res.status(500).json({ error: 'Error exporting locations' });
    }
  };
exports.editLocation = async (req , res ) => {
    const {id} = re.params;
    const {name, code } = req.body;
    try {
        await Location.update(id, name, code);
        res.status(200).json({message: 'Location updated successfully'});
    } catch (error) {
        console.error('Error editing location:',err);
        res.status(500).json({error: 'Error editing location'});
        
    }

};
// Import Locations
exports.importLocations = (req, res) => {
  const { locations } = req.body;
  Location.import(locations, (err) => {
    if (err) return res.status(500).json({ error: 'Error importing locations' });
    res.status(200).json({ message: 'Locations imported successfully' });
  });
};
