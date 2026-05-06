import { useState, useEffect } from 'react';

export default function Users({ department, onSelectUser }) {
    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [refreshTick, setRefreshTick] = useState(0);

    const API_URL = 'https://localhost:7152/api/user';

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(API_URL);
            const allUsers = await response.json();
            setUsers(allUsers.filter(u => u.departmentId === department.id));
        };
        fetchUsers();
    }, [refreshTick, department.id]); 

    const handleAdd = async (e) => {
        e.preventDefault();
        const newUser = { fullName, email, position, departmentId: department.id }; 

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        setFullName(''); setEmail(''); setPosition('');
        setRefreshTick(prev => prev + 1);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if(!window.confirm("Personeli silmek istediğine emin misin?")) return;
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setRefreshTick(prev => prev + 1);
    };

    return (
        <div>
            <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Pozisyon" value={position} onChange={(e) => setPosition(e.target.value)} required />

                <button type="submit" style={{ backgroundColor: '#008CBA', color: 'white', border: 'none', padding: '10px' }}>+ Personel Ekle</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {users.map(user => (
                    <div 
                        key={user.id} 
                        onClick={() => onSelectUser(user)}
                        style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#1e2b3c', position: 'relative' }}
                    >
                        <h3 style={{ margin: '0 0 10px 0' }}>{user.fullName}</h3>
                        <p style={{ margin: '0', fontSize: '0.9em', color: '#aaa' }}>{user.email}</p>
                        <p style={{ margin: '0', fontSize: '0.9em', color: '#aaa' }}>{user.position}</p>
                        
                        <button 
                            onClick={(e) => handleDelete(e, user.id)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Sil
                        </button>
                    </div>
                ))}
            </div>
            {users.length === 0 && <p>Bu departmanda henüz personel yok.</p>}
        </div>
    );
}