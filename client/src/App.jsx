import { ThemeContextProvider } from './ThemeContext'
import './App.css'
import { NavbarDemo } from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './components/Auth/RequireAuth'
import Layout from './components/Auth/Layout'
import Signup from './components/Auth/Signup2'
import SignupDoctor from './components/Auth/SignupDoctor'
import LoginFormDemo from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import PublicHome from './pages/PublicHome'
import Home from './pages/Home'
import Dashboard from './pages/priorAuthorization/Dashboard'
import MedicalHistory from './pages/MedicalHistory'
import ViewMedicalHistory from './pages/ViewMedicalHistory';
import Assign from './pages/priorAuthorization/Assign'
import ViewDetails from './pages/ViewDetails'
import ViewDetailsDoctor from './pages/priorAuthorization/viewDetailsDoctor'
function App() {

  return (
    <div className="flex flex-col relative min-h-screen w-full bg-light-background text-light-text  dark:bg-dark-background dark:text-dark-text">
      <ThemeContextProvider>
        <BrowserRouter>
          <NavbarDemo />
          <Routes>

          {/* Public Routes */}
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<PublicHome />} />

          {/* doctor Routes */}
              <Route path="/" element={<RequireAuth allowedRoles={[,'doctor']} />}>
                <Route path="/home" element={<Home />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='add-medical-history/:id' element={<MedicalHistory />} />
                <Route path='view-medical-history/:userId' element={<ViewDetailsDoctor />} />
                <Route path='assign-prior-authorization/:id' element={<Assign />} />

                <Route path='/prior' element={<Layout />}>
                  {/* <Route path='dashboard' element={<Dashboard />} /> */}
                </Route>
              </Route>

              {/* patient routes */}
              <Route path="/" element={<RequireAuth allowedRoles={['user']} />}>
                <Route path="/prior-authorization" element={<p>YOur </p>} />
                <Route path="/view" element={<ViewDetails />} />
              </Route>

            {/* <Route path="/" element={<Layout />}> */}
              <Route path="/" element={<RequireAuth allowedRoles={['null',null]} />}>
                <Route path='signup' element={<Signup />} />
                <Route path='doctor/signup' element={<SignupDoctor />} />
                <Route path='login' element={<LoginFormDemo />} />
              </Route>

            {/* Logged in User Routes */}
              <Route path="/" element={<RequireAuth allowedRoles={["user",'doctor']} />}>
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<h1>404 Not Found</h1>} />

          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </div>
  )
}

export default App