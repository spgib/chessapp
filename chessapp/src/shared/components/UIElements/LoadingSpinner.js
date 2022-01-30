import React from 'react';

import Modal from './Modal';
import Rook from '../../chessboard/components/pieces/Rook';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <Modal>
      <div className='lds'>
        <div className='lds__center'>
          <Rook color='black'/>
        </div>
      </div>
    </Modal>);
};

export default LoadingSpinner;