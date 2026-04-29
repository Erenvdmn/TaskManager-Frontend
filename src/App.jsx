import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://localhost:7152/api/task')
        if (!response.ok) {
          throw new Error(`HTTP hatası! Durum: ${response.status}`)
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Veri çekerken hata oluştu:", error);
      }
    };

    fetchTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const response = await fetch('https://localhost:7152/api/task')
      if (!response.ok) throw new Error(`HTTP hatası! Durum: ${response.status}`)
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Veri çekerken hata oluştu:", error);
    }
  };


  const deleteTask = async (id) => {
    if (!window.confirm("Bu görevi silmek istediğine emin misin?")) return;

    try {
      const response = await fetch(`https://localhost:7152/api/task/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) refreshTasks();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`https://localhost:7152/api/task/${id}/toggle`, {
        method: 'PUT',
      });
      if (response.ok) refreshTasks();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }

    return b.id - a.id;
  });


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Kurumsal Task Manager</h1>
      
      <TaskForm onTaskAdded={refreshTasks} />

      <h2>Görev Listesi</h2>
      {sortedTasks.length === 0 ? (
        <p>Henüz görev yok...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sortedTasks.map(task => (
            <li key={task.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '15px', 
                borderBottom: '1px solid #555',
                backgroundColor: task.isCompleted ? '#1a2e1a' : 'transparent',
                opacity: task.isCompleted ? 0.7 : 1
            }}>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <strong style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                </strong>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#ccc' }}>{task.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={() => toggleStatus(task.id)}
                    style={{ backgroundColor: task.isCompleted ? '#ffa500' : '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {task.isCompleted ? "Geri Al" : "Tamamla"}
                </button>
                
                <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App