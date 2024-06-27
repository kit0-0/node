
const db = require('../config/db');

const getAssignments = (req, res) => {
  const userId = req.userId;

  const query = `
    SELECT project_activity.*, CONCAT(employee.name,' ', employee.last_name) as emp_added_by_name, client.name as client_name,
           project.title as project_title, project.status as project_status, project.service_id as project_service_id, service.name as category_name
    FROM project_activity 
    INNER JOIN employee ON project_activity.added_by = employee.id
    INNER JOIN project ON project_activity.project_id = project.id
    INNER JOIN service ON project.service_id = service.id
    INNER JOIN client ON project.client_id = client.id
    WHERE project_activity.added_by = ? AND project_activity.assignment_status != 2
    ORDER BY project_activity.id DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Failed to fetch assignments:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
};

module.exports = { getAssignments };
