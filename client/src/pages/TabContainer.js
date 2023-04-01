import React, { useState } from 'react';

function TabContainer() {
  const [currentTab, setCurrentTab] = useState(1);

  const handleNext = () => {
    setCurrentTab(currentTab + 1);
  }

  return (
    <div>
      <div style={{display: currentTab === 1 ? 'block' : 'none'}}>
        Tab 1 Content
      </div>
      <div style={{display: currentTab === 2 ? 'block' : 'none'}}>
        Tab 2 Content
      </div>
      <div style={{display: currentTab === 3 ? 'block' : 'none'}}>
        Tab 3 Content
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default TabContainer