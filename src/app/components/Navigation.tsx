import { Link, useLocation } from "react-router";
import { Home, Map, Zap, Database, Network, ExternalLink } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/energy-poverty-map", label: "Energy Poverty Map", icon: Map },
  { path: "/tariff-simulator", label: "Tariff Simulator", icon: Zap },
  { path: "/data-architecture", label: "Data Architecture", icon: Database },
  { path: "/system-architecture", label: "System Architecture", icon: Network },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="EquiGrid Kenya Logo" className="w-8 h-8" />
              <div>
                <div className="font-bold text-xl text-gray-900">EquiGrid Kenya</div>
                <div className="text-xs text-gray-500">AI-Powered Energy Equity Platform</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-1 -mb-px overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://epraproject.ct.ws/?i=2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 whitespace-nowrap transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            EquiTariff
          </a>
        </div>
      </div>
    </nav>
  );
}
