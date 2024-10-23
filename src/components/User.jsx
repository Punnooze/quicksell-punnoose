import React from 'react';
import Card from './Card';

import plus from '../assets/add.svg';
import threeDots from '../assets/3 dot menu.svg';

function Users({ data, users, ordering }) {
  const filterByUser = (userId) => {
    return data.filter((ticket) => ticket.userId === userId);
  };
  console.log('users', users);

  const sortData = (tickets) => {
    if (ordering === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority); // Descending by priority
    } else if (ordering === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical by title
    }
    return tickets;
  };

  const renderColumn = (user) => {
    const filteredTickets = filterByUser(user.id);
    const sortedTickets = sortData(filteredTickets);
    const ticketCount = filteredTickets.length;
    const nameParts = typeof user.name === 'string' ? user.name.split(' ') : [];
    const initials =
      nameParts.length >= 2
        ? nameParts[0].charAt(0) + nameParts[1].charAt(0)
        : nameParts.length === 1
        ? nameParts[0].charAt(0)
        : '';
    console.log(user.available);
    return (
      <div className="kanban-column">
        <p className="column-header">
          <div className="sub-column-header">
            <div className="avatar">
              <p>{initials}</p>
              <div
                className={` ${
                  user.available ? 'avatar-dot-available' : 'avatar-dot'
                }`}
              />
            </div>
            {user.name} <span className="column-counter">{ticketCount}</span>
          </div>
          <div className="">
            <img src={plus} alt="plus" />
            <img src={threeDots} alt="dots" />
          </div>
        </p>
        {sortedTickets.map((ticket) => (
          <Card key={ticket.id} data={ticket} page="users" />
        ))}
      </div>
    );
  };

  return (
    <div className="kanban-board">
      {users.map((user) => renderColumn(user))}
    </div>
  );
}

export default Users;
