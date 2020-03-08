import React, { useState } from 'react';

import HomePage from '../components/HomePage';

const HomePageContainer = () => {

  const [mod, setMod] = useState(false);

  return (
    <HomePage mod={mod} setMod={setMod} />
  );
};

export default HomePageContainer;
