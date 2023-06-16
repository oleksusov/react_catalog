import './BackButton.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      type="button"
      className="button-back"
      onClick={() => navigate(-1)}
    >
      <img
        src="img/icons/arrow_left.svg"
        alt="arrow left"
      />
    </button>
  );
};
