import { useState, useEffect } from 'react';

export default function Departments({ onSelectDepartment }) {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [refreshTick, setRefreshTick] = useState(0); 

    const API_URL = 'https://localhost:7152/api/department';

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch(API_URL);
            setDepartments(await response.json());
        };
        fetchDepartments();
    }, [refreshTick]);

    const handleAdd = async (e) => {
        e.preventDefault();
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description })
        });
        setName(''); setDescription('');
        setRefreshTick(prev => prev + 1); 
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if(!window.confirm("Departmanı silmek istediğine emin misin?")) return;
        
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setRefreshTick(prev => prev + 1);
    };

    return (
        <div>
            <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Departman Adı" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px' }}>+ Departman Ekle</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {departments.map(dept => (
                    <div 
                        key={dept.id} 
                        onClick={() => onSelectDepartment(dept)}
                        style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#2a2a2a', position: 'relative' }}
                    >
                        <h3 style={{ margin: '0 0 10px 0' }}>{dept.name}</h3>
                        <p style={{ margin: '0', fontSize: '0.9em', color: '#aaa' }}>{dept.description}</p>
                        <div style={{ marginTop: '15px', fontSize: '0.8em', color: '#888' }}>
                            {dept.users?.length || 0} Personel
                        </div>
                        
                        <button 
                            onClick={(e) => handleDelete(e, dept.id)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Sil
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}