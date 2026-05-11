import { useState } from "react";
import ApiRequest from '../helpers/ApiManager';
import '../styles/TaskForm.css';

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title: title,
            description: description,
            isCompleted: false
        };

        try {
            const response = await ApiRequest('api/task', 'POST', newTask);

            if (response && response.ok) {
                setTitle('');
                setDescription('');
                onTaskAdded();
            } else {
                console.error("Görev eklenirken hata oluştu");
            }
        } catch (error) {
            console.error("Sunucuya ulaşılamadı:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form-container">
            <h3>Yeni Görev Ekle</h3>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Görev Başlığı" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                    className="task-input"
                />
            </div>
            <div className="form-group">
                <textarea 
                    placeholder="Açıklama" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="task-input"
                />
            </div>
            <button type="submit" className="btn-submit-task">
                Kaydet
            </button>
        </form>
    );
}

export default TaskForm;