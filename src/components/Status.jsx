import React from 'react';
import Card from './Card';
import cancelled from '../assets/Cancelled.svg';
import todo from '../assets/To-do.svg';
import done from '../assets/Done.svg';
import inProgress from '../assets/in-progress.svg';
import backlog from '../assets/Backlog.svg';
import plus from '../assets/add.svg';
import threeDots from '../assets/3 dot menu.svg';

function Status({ data, ordering }) {
  const filterByStatus = (status) => {
    return data.filter((ticket) => ticket.status === status);
  };

  const sortData = (tickets) => {
    if (ordering === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const renderColumn = (status) => {
    const filteredTickets = filterByStatus(status);
    const sortedTickets = sortData(filteredTickets);
    const ticketCount = filteredTickets.length;

    let statusImg = backlog;
    if (status === 'Todo') statusImg = todo;
    if (status === 'Cancelled') statusImg = cancelled;
    if (status === 'In progress') statusImg = inProgress;
    if (status === 'Done') statusImg = done;
    return (
      <div className="kanban-column">
        <p className="column-header">
          <div className="sub-column-header">
            <img src={statusImg} alt="status-images" />
            {status} <span className="column-counter">{ticketCount}</span>
          </div>
          <div className="">
            <img src={plus} alt="plus" />
            <img src={threeDots} alt="dots" />
          </div>
        </p>
        {sortedTickets.map((ticket) => (
          <Card key={ticket.id} data={ticket} page="status" />
        ))}
      </div>
    );
  };

  return (
    <div className="kanban-board">
      {renderColumn('Backlog')}
      {renderColumn('Todo')}
      {renderColumn('In progress')}
      {renderColumn('Done')}
      {renderColumn('Cancelled')}
    </div>
  );
}

export default Status;
