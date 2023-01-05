import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static defaultProps = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('componentDidMount');

    window.addEventListener('keydown', this.handleKeydownEscape);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeydownEscape);
  }

  handleKeydownEscape = evt => {
    const { onClose } = this.props;
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  handleOverlayClick = evt => {
    console.log('BD click');

    const { onClose } = this.props;
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  render() {
    const { largeImageURL, imageAlt } = this.props;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContainer>
          <ModalImage src={largeImageURL} alt={imageAlt} />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}
