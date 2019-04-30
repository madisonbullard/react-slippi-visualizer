import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SlippiVisualizer.module.css";

const propTypes = {
  /*
      Iframe Attributes
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
      React Supported Attributes
      https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
      Note: attributes are camelCase, not all lowercase as usually defined.
  */
  attributes: PropTypes.shape({
    allowFullScreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    frameBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    scrolling: PropTypes.string,
    // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
    sandbox: PropTypes.string,
    srcDoc: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),

  // Callback function called when iFrame sends the parent window a message.
  handleReceiveMessage: PropTypes.func,

  // The replay file
  replay: PropTypes.object
};

const defaultProps = {
  attributes: {
    allowFullScreen: false,
    frameBorder: 0
  },
  replay: null
};

class SlippiVisualizer extends Component {
  componentDidMount() {
    window.addEventListener("message", this.onReceiveMessage);
    this.visualizer.addEventListener("load", this.onLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.onReceiveMessage, false);
  }

  componentDidUpdate(prevProps) {
    const { replay } = this.props;
    if (prevProps.replay !== replay) {
      this.visualizer.contentWindow.postMessage(replay);
    }
  }

  onReceiveMessage = event => {
    const { handleReceiveMessage } = this.props;
    if (handleReceiveMessage) {
      handleReceiveMessage(event);
    }
  };

  onLoad = () => {
    const { replay } = this.props;
    this.visualizer.contentWindow.postMessage(replay);
  };

  render() {
    const { attributes } = this.props;

    return (
      <iframe
        ref={c => (this.visualizer = c)}
        title="slippiVisualizer"
        className={styles.visualiser}
        src="/visualizer/index.html"
        {...attributes}
      />
    );
  }
}

SlippiVisualizer.propTypes = propTypes;
SlippiVisualizer.defaultProps = defaultProps;

export default SlippiVisualizer;
