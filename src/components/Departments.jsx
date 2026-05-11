import { useState, useEffect } from 'react';
import ApiRequest from '../helpers/ApiManager';
import '../styles/Departments.css';

export default function Departments({ onSelectDepartment }) {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [refreshTick, setRefreshTick] = useState(0); 

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await ApiRequest('api/department', 'GET');
            if (response && response.ok) {
                const data = await response.json();
                setDepartments(data);
            }
        };
        fetchDepartments();
    }, [refreshTick]);

    const handleAdd = async (e) => {
        e.preventDefault();
        
        await ApiRequest('api/department', 'POST', { name, description });
        
        setName(''); 
        setDescription('');
        setRefreshTick(prev => prev + 1); 
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if(!window.confirm("Departmanı silmek istediğine emin misin?")) return;
        
        await ApiRequest(`api/department/${id}`, 'DELETE');
        setRefreshTick(prev => prev + 1);
    };

    return (
        <div>
            <form onSubmit={handleAdd} className="add-form">
                <input type="text" placeholder="Departman Adı" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="btn-add">+ Departman Ekle</button>
            </form>

            <div className="departments-grid">
                {departments.map(dept => (
                    <div 
                        key={dept.id} 
                        onClick={() => onSelectDepartment(dept)}
                        className="department-card"
                    >
                        <h3>{dept.name}</h3>
                        <p className="desc">{dept.description}</p>
                        <div className="personnel-count">
                            {dept.users?.length || 0} Personel
                        </div>
                        
                        <button 
                            onClick={(e) => handleDelete(e, dept.id)}
                            className="btn-delete"
                        >
                            Sil
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}