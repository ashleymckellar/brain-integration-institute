import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { Profile } from '../routes/Profile';
import { Root } from "../routes/Root";
// import { Auth } from '../routes/Auth';
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../routes/Home";
import { AboutUs } from "../routes/AboutUs";
import { Certification } from "../routes/Certification";
import { Practitioner } from "../routes/Practitioner"
import { PaymentSuccessPage } from '../routes/PaymentSuccessPage'
import { NotFound } from "../routes/NotFound";
// import PaymentSuccessPage from "../routes/PaymentSuccessPage";
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      // {
      //   path: '/about',
      //   element: <About />
      // },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/certification',
        element: <Certification />
      },
      {
        path: '/practitioner',
        element: <Practitioner />
      },
      {
        path: '/success',
        element: <PaymentSuccessPage />
      }, 
      {
        path: '*',
        element:<NotFound />
      }
    ]
  },
])

//changed back to Home component.  Auth0 should handle authentication, but we can add secondary way to authenticate/register using this Auth route.  

export const RouteProvider = () => {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>
  return (
    <ReactRouterProvider router={router} />
  )
}
