export default function SignUpForm({ onGeneratePassword }) {
  return (
    <form>
      <h1>Create Account</h1>

      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
      </div>

      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button type="submit">Sign Up</button>

      {/* Botón estilo texto como en la imagen */}
      <button
        type="button"
        onClick={onGeneratePassword}
        className="plain-link"
      >
        Generate Password!
      </button>
    </form>
  );
}
