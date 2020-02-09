import React from 'react';
import { Link } from 'react-router-dom';

export default Card = props => {
  const { title, col, children, to, hoverable, cardColor } = props;
  const _col = `col ${col || 's12'}`;
  const cardClassnames = `card ${hoverable ? 'hoverable' : ''}`;
  const cardContentClassnames = `card-content ${cardColor || 'black-text'}`;

  const content = (
    <div className={cardClassnames}>
      <div className={cardContentClassnames}>
        <span className="card-title">{title}</span>
        {children}
      </div>
    </div>
  );

  return (
    <div className={_col}>{to ? <Link to={to}>{content}</Link> : content}</div>
  );
};
