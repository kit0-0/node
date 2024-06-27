const db = require('../config/db');

const getAssignments = (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT project_activity.*, 
               CONCAT(employee.name, ' ', employee.last_name) as employee_full_name, 
               employee.image as employee_image, 
               project.title as project_title, 
               client.name as client_name, 
               service.name as service_name
        FROM project_activity 
        INNER JOIN employee ON project_activity.added_by = employee.id
        INNER JOIN project ON project_activity.project_id = project.id
        INNER JOIN service ON project.service_id = service.id
        INNER JOIN client ON project.client_id = client.id
        WHERE project_activity.id != 0 
          AND CONCAT('_', project_activity.assigned_to, '_') LIKE '%\\_2\\_%' 
          AND project_activity.assignment_status = 0 
          AND project_activity.assignment_status != 2 
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
