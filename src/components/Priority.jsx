import React from 'react';
import Card from './Card';

import priority0 from '../assets/No-priority.svg';
import priority1 from '../assets/Img - Low Priority.svg';
import priority2 from '../assets/Img - Medium Priority.svg';
import priority3 from '../assets/Img - High Priority.svg';
import priority4 from '../assets/SVG - Urgent Priority colour.svg';

import plus from '../assets/add.svg';
import threeDots from '../assets/3 dot menu.svg';

function Priority({ data, ordering }) {
  console.log('ahhhh', data);
  const filterByPriority = (priority) => {
    return data.filter((ticket) => ticket.priority === priority);
  };


  const sortData = (tickets) => {
    if (ordering === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority); // Descending by priority
    } else if (ordering === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical by title
    }
    return tickets;
  };

  const renderColumn = (priority, label) => {
    const filteredTickets = filterByPriority(priority);
    const sortedTickets = sortData(filteredTickets);
    const ticketCount = filteredTickets.length;
    let prior = 'No Priority';
    if (priority === 1) prior = 'Low';
    if (priority === 2) prior = 'Medium';
    if (priority === 3) prior = 'High';
    if (priority === 4) prior = 'Urgent';

    const priorities = [priority0, priority1, priority2, priority3, priority4];
    const priorityImg = priorities[priority] || null;

    return (
      <div className="kanban-column">
        <p className="column-header">
          <div className="sub-column-header">
            <img src={priorityImg} alt="status-images" />
            {prior} <span className="column-counter">{ticketCount}</span>
          </div>
          <div className="">
            <img src={plus} alt="plus" />
            <img src={threeDots} alt="dots" />
          </div>
        </p>
        {sortedTickets.map((ticket) => (
          <Card key={ticket.id} data={ticket} page="priority" />
        ))}
      </div>
    );
  };

  return (
    <div className="kanban-board">
      {renderColumn(0, 'No Priority')}
      {renderColumn(4, 'Urgent')}
      {renderColumn(3, 'High')}
      {renderColumn(2, 'Medium')}
      {renderColumn(1, 'Low')}
    </div>
  );
}

export default Priority;
