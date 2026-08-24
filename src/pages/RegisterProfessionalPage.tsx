import AuthNavbar from "../components/auth/AuthNavbar";
import RegisterProfessionalForm from "../components/auth/RegisterProfessionalForm";
import RegisterProfessionalLeftPanel from "../components/auth/RegisterProfessionalLeftPanel";

export default function RegisterProfessional() {
  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />

      <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-2">
        <RegisterProfessionalLeftPanel />
        <RegisterProfessionalForm />
      </main>
    </div>
  );
}