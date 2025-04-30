const baseController = (Model) => ({
  getAll: (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
  
    Model.getAll(page, limit, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener los datos" });
      } else {
        res.json(results); // Ahora results contiene { data, totalItems }
      }
    });
  },
  

  create: (req, res) => {
    const newData = req.body;
    if (req.file) {
      newData.documento_pdf = req.file.filename; // Guardamos el nombre del archivo
    }

    Model.create(newData, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Creado correctamente", id: results.insertId });
    });
  },

  update: (req, res) => {
    const updateData = req.body;
    if (req.file) {
      updateData.documento_pdf = req.file.filename; // Guardamos el nombre del nuevo archivo
    }

    Model.update(req.params.id, updateData, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Actualizado correctamente" });
    });
  },

  delete: (req, res) => {
    Model.delete(req.params.id, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Eliminado correctamente" });
    });
  },
});

module.exports = baseController;
