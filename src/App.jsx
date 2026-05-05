import { useState } from 'react';
import './App.css';
import Departments from './components/Departments';
import Users from './components/Users';
import UserTasks from './components/UserTasks';

function App() {
  const [currentView, setCurrentView] = useState('departments'); 
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const goToUsers = (dept) => {
    setSelectedDept(dept);
    setCurrentView('users');
  };

  const goToTasks = (user) => {
    setSelectedUser(user);
    setCurrentView('tasks');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#333', borderRadius: '8px', fontSize: '1.2em' }}>
        <span 
          style={{ cursor: 'pointer', color: currentView === 'departments' ? 'white' : '#aaa' }} 
          onClick={() => setCurrentView('departments')}
        >
        Departmanlar
        </span>

        {selectedDept && (currentView === 'users' || currentView === 'tasks') && (
          <>
            <span style={{ margin: '0 10px', color: '#666' }}>/</span>
            <span 
              style={{ cursor: 'pointer', color: currentView === 'users' ? 'white' : '#aaa' }}
              onClick={() => setCurrentView('users')}
            >
            {selectedDept.name}
            </span>
          </>
        )}

        {selectedUser && currentView === 'tasks' && (
          <>
            <span style={{ margin: '0 10px', color: '#666' }}>/</span>
            <span style={{ color: 'white' }}>
              👤 {selectedUser.fullName} (Görevleri)
            </span>
          </>
        )}
      </div>

      {currentView === 'departments' && (
        <>
          <h2>Tüm Departmanlar</h2>
          <Departments onSelectDepartment={goToUsers} />
        </>
      )}

      {currentView === 'users' && selectedDept && (
        <>
          <h2>{selectedDept.name} Personelleri</h2>
          <Users department={selectedDept} onSelectUser={goToTasks} />
        </>
      )}

      {currentView === 'tasks' && selectedUser && (
        <>
          <h2>{selectedUser.fullName} için Görevler</h2>
          <UserTasks user={selectedUser} />
        </>
      )}

    </div>
  );
}

export default App;