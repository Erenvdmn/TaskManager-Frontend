import { useState } from "react";

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title: title,
            description: description,
            isComplated: false
        };

        try {
            const response = await fetch('https://localhost:7152/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                onTaskAdded();
            } else {
                console.error("Görev eklenirlen hata oluştu")
            }
        } catch (error) {
            console.error("Sunucuya ulaşılamadı:", error)
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #444', borderRadius: '8px' }}>
            <h3>Yeni Görev Ekle</h3>
            <div style={{ marginBottom: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Görev Başlığı" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <textarea 
                    placeholder="Açıklama" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px' }}>
                Kaydet
            </button>
        </form>
    );
}

export default TaskForm;