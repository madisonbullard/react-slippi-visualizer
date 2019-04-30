# react-slippi-visualizer

> A React component for displaying [slippi](https://github.com/project-slippi/project-slippi) replays in the browser. Based on [slippi-visualiser](https://github.com/schmooblidon/slippi-visualiser) (commit: d19c3bf00474ad57b0d204a3aaf9fd2dcb757b6c) and [react-iframe-comm](https://github.com/pbojinov/react-iframe-comm).

## How it works

The `SlippiVisualizer` component returns an `<iframe>` that renders the contents of the `replay` prop, which should be a Slippi file (a JSON file with specific fields). Currently, the file autoplays with a playback slider that can be used to control playback.

## Installation

```
npm install react-slippi-visualizer
```

or

```
yarn add react-slippi-visualizer
```

## Getting Started

```js
import SlippiVisualizer from 'react-slippi-visualizer';

const MyComponent = { replay } => (
  <SlippiVisualizer replay={replay} />
)
```

## Functionality

Functionality is limited to replaying Slippi files, but future development will allow play/pause, jump-to-frame, better timeline visualization, and more.

## `SlippiVisualizer` Props

```js
//
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
// Not functional, currently.
handleReceiveMessage: PropTypes.func,

// The replay file
replay: PropTypes.object
```

## Contributing

I would love some help with this lol. Feel free to submit PRs, or get in touch to discuss the project.
