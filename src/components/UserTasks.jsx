import { useState, useEffect } from 'react';

export default function UserTasks({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [refreshTick, setRefreshTick] = useState(0);

    const API_URL = 'http://localhost:7152/api/task';

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(API_URL);
            const allTasks = await response.json();
            setTasks(allTasks.filter(t => t.userId === user.id));
        };
        fetchTasks();
    }, [refreshTick, user.id]);

    const handleAdd = async (e) => {
        e.preventDefault();
        const newTask = { title, description, isCompleted: false, priorityLevel: 1, userId: user.id };

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        setTitle(''); setDescription('');
        setRefreshTick(prev => prev + 1);
    };

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setRefreshTick(prev => prev + 1);
    };

    const toggleStatus = async (id) => {
        await fetch(`${API_URL}/${id}/toggle`, { method: 'PUT' });
        setRefreshTick(prev => prev + 1);
    };

    return (
        <div>
            <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Görev Başlığı" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Detay" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '10px' }}>+ Görev Ata</button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #555', backgroundColor: task.isCompleted ? '#1a2e1a' : 'transparent' }}>
                        <div>
                            <strong style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.title}</strong>
                            <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#ccc' }}>{task.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => toggleStatus(task.id)} style={{ backgroundColor: task.isCompleted ? '#ffa500' : '#4CAF50', border: 'none', padding: '5px 10px', color: 'white', cursor: 'pointer' }}>
                                {task.isCompleted ? "Geri Al" : "Tamamla"}
                            </button>
                            <button onClick={() => handleDelete(task.id)} style={{ backgroundColor: '#f44336', border: 'none', padding: '5px 10px', color: 'white', cursor: 'pointer' }}>Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}