// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// const ProtectedRoute = ({loggedIn, component: Component, ...props }) => {
//   return (
//     <Route>
//       {() =>
//         loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
//       }
//     </Route>
//   );
// };

// export default ProtectedRoute;

import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
}