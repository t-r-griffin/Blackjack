import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Menu from './Menu';
import Play from './Play';
import Settings from './Settings';
import Rules from './Rules';
import LandScape from './LandScape';

function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  document.ontouchmove = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    window.addEventListener('resize', isPortrait);
    return () => window.removeEventListener('resize', isPortrait);
  });

  const isPortrait = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  if (isMobile && width > height) {
    return <LandScape />;
  } else {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Menu} />
        <Route exact path="/Play" component={Play} />
        <Route exact path="/Rules" component={Rules} />
        <Route exact path="/Settings" component={Settings} />
      </BrowserRouter>
    );
  }
}

export default App;
