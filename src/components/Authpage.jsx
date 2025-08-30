import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

export default function Authpage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Add your authentication logic here
    console.log("Login attempt")
    // Redirect to dashboard after successful login
    navigate("/dashboard")
  }

  const handleSignup = (e) => {
    e.preventDefault()
    // Add your signup logic here
    console.log("Signup attempt")
    // Redirect to dashboard after successful signup
    navigate("/dashboard")
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Left Panel */}
        <div className={`auth-left-panel ${isLogin ? "login-active" : "signup-active"}`}>
          {isLogin ? (
            <>
              <h2 className="auth-left-title">Hello, Friend!</h2>
              <p className="auth-left-text">Register with your personal details to use all site features</p>
              <button onClick={() => setIsLogin(false)} className="auth-left-btn">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="auth-left-title">Welcome Back!</h2>
              <p className="auth-left-text">Enter your details to login</p>
              <button onClick={() => setIsLogin(true)} className="auth-left-btn">
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Forms */}
        <div className="auth-forms">
          <div className={`login-form-container ${isLogin ? "visible" : "hidden"}`}>
            <form className="login-form" onSubmit={handleLogin}>
              <h2 className="form-title">Sign In</h2>
              <input type="email" placeholder="Email" className="form-input" required />
              <input type="password" placeholder="Password" className="form-input" required />
              <button type="submit" className="form-btn">Login</button>
            </form>
          </div>

          <div className={`signup-form-container ${isLogin ? "hidden" : "visible"}`}>
            <form className="signup-form" onSubmit={handleSignup}>
              <h2 className="form-title">Create Account</h2>
              <input type="text" placeholder="Name" className="form-input" required />
              <input type="email" placeholder="Email" className="form-input" required />
              <input type="password" placeholder="Password" className="form-input" required />
              <button type="submit" className="form-btn">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}