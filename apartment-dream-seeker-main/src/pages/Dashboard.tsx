
import { AdminDashboard } from "@/components/AdminDashboard";
import { BookingManager } from "@/components/BookingManager";

interface DashboardProps {
  userRole: string;
}

const Dashboard = ({ userRole }: DashboardProps) => {
  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return <BookingManager userRole={userRole} />;
};

export default Dashboard;
