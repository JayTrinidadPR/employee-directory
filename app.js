import express from 'express';
import employees from "#db/employees";

const app = express();
let lastRandomId = null;

app.get("/", (req, res) => {
    res.send("Hello employees!");
    });
    
app.get("/employees", (req, res) => {
    res.json(employees);
    });

app.get("/employees/random", (req, res) => {
    let randomEmployee;
    do {
        const randomIndex = Math.floor(Math.random() * employees.length);
        randomEmployee = employees[randomIndex];
    } while (employees.length > 1 && randomEmployee.id === lastRandomId);
    
    lastRandomId = randomEmployee.id;
    res.send(randomEmployee);
    });
    
    app.get("/employees/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const employee = employees.find(emp => emp.id === id);

        if (!employee) {
            return res.status(404).send({ message: `Employee with id ${id} not found` });
        }
        res.send(employee);
    });
export default app;