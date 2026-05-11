import { useState, useEffect } from 'react';
import ApiRequest from '../helpers/ApiManager';
import '../styles/Users.css';

export default function Users({ department, onSelectUser }) {
    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [refreshTick, setRefreshTick] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await ApiRequest('api/user', 'GET');
            if(response && response.ok) {
                const allUsers = await response.json();
                setUsers(allUsers.filter(u => u.departmentId === department.id));
            }
        };
        fetchUsers();
    }, [refreshTick, department.id]); 

    const handleAdd = async (e) => {
        e.preventDefault();
        const newUser = { fullName, email, position, departmentId: department.id }; 

        await ApiRequest('api/user', 'POST', newUser);
        
        setFullName(''); 
        setEmail(''); 
        setPosition('');
        setRefreshTick(prev => prev + 1);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if(!window.confirm("Personeli silmek istediğine emin misin?")) return;
        
        await ApiRequest(`api/user/${id}`, 'DELETE');
        setRefreshTick(prev => prev + 1);
    };

    return (
        <div>
            <form onSubmit={handleAdd} className="users-add-form">
                <input type="text" placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Pozisyon" value={position} onChange={(e) => setPosition(e.target.value)} required />

                <button type="submit" className="btn-add-user">+ Personel Ekle</button>
            </form>

            <div className="users-grid">
                {users.map(user => (
                    <div 
                        key={user.id} 
                        onClick={() => onSelectUser(user)}
                        className="user-card"
                    >
                        <h3> {user.fullName}</h3>
                        <p> {user.email}</p>
                        <p>{user.position}</p>
                        
                        <button 
                            onClick={(e) => handleDelete(e, user.id)}
                            className="btn-delete"
                        >
                            Sil
                        </button>
                    </div>
                ))}
            </div>
            {users.length === 0 && <p>Bu departmanda henüz personel yok.</p>}
        </div>
    );
}