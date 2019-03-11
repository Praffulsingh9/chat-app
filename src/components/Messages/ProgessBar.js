import React from "react";
import { Progress } from "semantic-ui-react";
const ProgessBar = ({ uploadState, percentUpload }) =>
  uploadState && (
    <Progress
      className="progress__bar"
      percent={percentUpload}
      progress
      indicating
      size="medium"
      inverted
    />
  );

export default ProgessBar;
