import { useContext } from "react";
import { UserContext } from "../tools/UserContext";
import ListUsers from "../components/ListUsers";
import Notes from "../components/Notes";
import AnalyticsCard from "../components/AnalyticsCard";
import WeatherCard from "../components/WeatherCard";

const DashboardPage = () => {
  const { userLogin } = useContext(UserContext) as {
    userLogin: string;
    setUserLogin: (user: string) => void;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Page
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back,{" "}
          <span className="text-blue-600 font-semibold">{userLogin}</span>
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          <ListUsers />
          <Notes />
        </div>

        <div className="space-y-8">
          <AnalyticsCard />
          <WeatherCard />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
