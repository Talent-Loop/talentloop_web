import AuthNavbar from "../components/auth/AuthNavbar";
import LoginLeftPanel from "../components/auth/LoginLeftPanel";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthNavbar />

      <main className="grid min-h-[calc(100vh-118px)] grid-cols-1 lg:grid-cols-2">
        <LoginLeftPanel
  title="Welcome Back!"
  subtitle="Login into your account and continue connecting with trusted professionals"
  image="/src/assets/auth/login-illustration.png"
/>
        <LoginForm />
      </main>
    </>
  );
}