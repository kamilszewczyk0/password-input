import React from "react";

import {StyledSinglePasswordInput} from "../../styles/SinglePasswordInput/StyledSinglePasswordInput";

const SinglePasswordInput = React.forwardRef((props, ref) => {
  return <StyledSinglePasswordInput {...props} ref={ref} />;
});

export default SinglePasswordInput;
