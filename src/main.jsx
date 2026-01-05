import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<Home />}/>
            <Route 
              path='/login' 
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route 
              path='/signup' 
              element={
                <AuthLayout authentication={false}>
                  <Signup />
                </AuthLayout>
              }
            />
              <Route 
                path='/add-posts' 
                element={
                  <AuthLayout authentication>
                    <AddPost />
                  </AuthLayout>
                }
              />
            <Route 
              path='/all-posts' 
              element={
                <AuthLayout authentication>
                  <AllPost />
                </AuthLayout>
              }
            />
            <Route 
              path='/edit-post/:slug' 
              element={
                <AuthLayout authentication>
                  <EditPost />
                </AuthLayout>
              }
            />
            <Route 
              path='/post/:slug' 
              element={<Post />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

)
