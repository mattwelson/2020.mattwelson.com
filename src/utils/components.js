/* eslint react/prop-types: 0 */
/* eslint react/display-name: 0  */
import React from "react"
import { preToCodeBlock } from "mdx-utils"
import Code from "./Code"
import LinkedHeader from "./LinkedHeader"

// components is its own object outside of render so that the references to
// components are stable
export default {
  ...["h1", "h2", "h3"].reduce(
    (acc, level) => ({
      ...acc,
      [level]: props => <LinkedHeader is={level} {...props} />,
    }),
    {}
  ),
  pre: preProps => {
    console.log({ preProps })
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  wrapper: ({ children }) => <>{children}</>,
}
