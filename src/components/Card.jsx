import priority0 from '../assets/No-priority.svg';
import priority1 from '../assets/Img - Low Priority.svg';
import priority2 from '../assets/Img - Medium Priority.svg';
import priority3 from '../assets/Img - High Priority.svg';
import priority4 from '../assets/SVG - Urgent Priority grey.svg';

import cancelled from '../assets/Cancelled.svg';
import todo from '../assets/To-do.svg';
import done from '../assets/Done.svg';
import inProgress from '../assets/in-progress.svg';
import backlog from '../assets/Backlog.svg';

function Card({ data, page }) {
  const nameParts = typeof data.name === 'string' ? data.name.split(' ') : [];
  const initials =
    nameParts.length >= 2
      ? nameParts[0].charAt(0) + nameParts[1].charAt(0)
      : nameParts.length === 1
      ? nameParts[0].charAt(0)
      : '';
  const tlt =
    data.title.length > 40 ? data.title.substring(0, 40) + '...' : data.title;

  const priorities = [priority0, priority1, priority2, priority3, priority4];
  const priority = priorities[data.priority] || null;

  let status = backlog;
  if (data.status === 'Todo') status = todo;
  if (data.status === 'Cancelled') status = cancelled;
  if (data.status === 'In progress') status = inProgress;
  if (data.status === 'Done') status = done;

  return (
    <div className="card">
      <div className="card-top">
        <p className="thin-text">{data.id}</p>
        <div className={`${page === 'users' ? 'hidden' : 'avatar'}`}>
          <p>{initials}</p>
          <div
            className={`${
              data.available ? 'avatar-dot-available' : 'avatar-dot'
            }`}
          />
        </div>
      </div>

      <p className="card-text">
        <img
          src={status}
          alt="todo"
          className={`priority-logo ${page === 'status' ? 'hidden' : ''}`}
        />
        {tlt}
      </p>
      <div className="card-bottom">
        <img src={priority} alt="three dots" className="priority-img" />
        <p className="card-bottom-text thin-text">
          <div className="dot" /> Feature Request
        </p>
      </div>
    </div>
  );
}

export default Card;
