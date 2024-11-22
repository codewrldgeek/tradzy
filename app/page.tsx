import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/stats-card";
import { RecentTrades } from "@/components/recent-trades";
import { TradeDistribution } from "@/components/trade-distribution";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="NET P&L"
          value="+$12,234"
          trend="up"
          percentage="+12.3%"
        />
        <StatsCard
          title="Day Win"
          value="78%"
          trend="up"
          percentage="+2.5%"
        />
        <StatsCard
          title="AVG Win Trade"
          value="$1,240"
          trend="up"
          percentage="+8.1%"
        />
        <StatsCard
          title="AVG Loss Trade"
          value="$450"
          trend="down"
          percentage="-3.2%"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <RecentTrades />
        </Card>
        <Card className="col-span-3">
          <TradeDistribution />
        </Card>
      </div>
    </div>
  );
}