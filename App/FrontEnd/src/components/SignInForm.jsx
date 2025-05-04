export default function SignInForm() {
  return (
    <form>
      <h1>Sign In</h1>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
      </div>
      <span>or use your email and password</span>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forget Your Password?</a>
      <button type="submit">Sign In</button>
    </form>
  );
}
