const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Données temporaires
const tasks = [
    { id: 1, titre: "Tâche 1", statutCheck: false },
    { id: 2, titre: "Tâche 2", statutCheck: true },
    { id: 3, titre: "Tâche 3", statutCheck: false }
];

// Route POST pour ajouter une tache
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, titre: req.body.titre, statutCheck: req.body.statutCheck };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route GET pour récupérer toutes les taches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// route PUT pour mettre à jour une tache
app.put('/tasks/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let task = tasks.find(task => task.id === id)
    task.titre =req.body.titre,
    task.statutCheck =req.body.statutCheck,
    res.status(200).json(task)
});


// Route DELETE pour supprimer une tache
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Tache supprimée' });
});



app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
