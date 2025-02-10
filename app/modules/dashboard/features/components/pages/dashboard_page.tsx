import {
  ArrowUpRightIcon,
  TicketIcon,
  GlobeAltIcon,
  UsersIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { BarChart, Header, LineChart, Stats } from "../molecules";
import { Table } from "../organisms";
export default function DashboardPage() {
  return (
    <div className="px-6 pb-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Stats
          title="Net sales"
          value="$975.50"
          description="$1020.50 gross sales"
          icon={<ArrowUpRightIcon className="w-5 h-5 text-red-500" />}
          bgColor="bg-white"
          iconBgColor="bg-red-100"
          iconTextColor="text-red-500"
        />

        <Stats
          title="Ticket Sold"
          value="300/500"
          description="50 paid • 250 free"
          icon={<TicketIcon className="w-5 h-5 text-pink-500" />}
          bgColor="bg-white"
          iconBgColor="bg-pink-500 bg-opacity-20"
          iconTextColor="text-pink-500"
        />

        <Stats
          title="Page View"
          value="300"
          description="50 from Eventbrite"
          icon={<GlobeAltIcon className="w-5 h-5 text-purple-500" />}
          bgColor="bg-white"
          iconBgColor="bg-purple-100"
          iconTextColor="text-purple-500"
        />

        <Stats
          title="Active Users"
          value="180"
          description="50 via Social Media"
          icon={<UsersIcon className="w-5 h-5 text-green-500" />}
          bgColor="bg-white"
          iconBgColor="bg-green-100"
          iconTextColor="text-green-500"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <LineChart />
        <BarChart />
      </div>

      <Table />
    </div>
  );
}
