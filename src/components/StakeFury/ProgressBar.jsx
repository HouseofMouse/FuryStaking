import React, { useState } from "react";

function ProgressBar(props) {
  const [progress, setProgress] = useState(0);
  const { malus } = props;
  React.useEffect(() => {
    setProgress(malus);
  }, [malus]);

  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
}

export default ProgressBar;
