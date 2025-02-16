import './App.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Status from './components/Status';
import User from './components/User';
import Priority from './components/Priority';
import display from './assets/Display.svg';
import downArrow from './assets/down.svg';

function App() {
  const [data, setData] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        if (response.data.users && response.data.tickets) {
          const tickets = response.data.tickets;
          const users = response.data.users;
          setUsers(users);
          console.log(users);
          const userMap = users.reduce((acc, user) => {
            acc[user.id] = { name: user.name, available: user.available };
            return acc;
          }, {});

          const enrichedData = tickets.map((ticket) => {
            const user = userMap[ticket.userId] || {};
            return {
              ...ticket,
              name: user.name || 'Unknown',
              available: user.available || false,
            };
          });

          setData(enrichedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="button-container">
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropbtn" onClick={toggleDropdown}>
            <img src={display} alt="icon" />
            Display
            <img src={downArrow} alt="arrow" />
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-section">
                <label>Grouping</label>
                <select
                  value={grouping}
                  onChange={(e) => setGrouping(e.target.value)}
                >
                  <option value="status">
                    Status
                    <img src={downArrow} alt="arrow" />
                  </option>

                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="dropdown-section">
                <label>Ordering</label>
                <select
                  value={ordering}
                  onChange={(e) => setOrdering(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      {grouping === 'status' && <Status data={data} ordering={ordering} />}
      {grouping === 'user' && (
        <User data={data} ordering={ordering} users={users} />
      )}
      {grouping === 'priority' && <Priority data={data} ordering={ordering} />}
    </div>
  );
}

export default App;
