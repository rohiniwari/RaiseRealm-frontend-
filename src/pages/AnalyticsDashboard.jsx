import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/helpers';
import { BarChart3, Users, DollarSign, TrendingUp, Filter, Activity } from 'lucide-react';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [activeProject, setActiveProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    if (activeProject) {
      loadAnalytics();
    }
  }, [activeProject, selectedTimeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAnalytics(activeProject, selectedTimeRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };
    totalRaised: 2450000,
    totalBackers: 890,
    avgDonation: 2750,
    progress: 73,
    trends: [
      { date: 'Jan 1', raised: 12000 },
      { date: 'Jan 8', raised: 34000 },
      { date: 'Jan 15', raised: 58000 },
      { date: 'Jan 22', raised: 112000 },
      { date: 'Jan 29', raised: 189000 },
      { date: 'Feb 5', raised: 245000 },
      { date: 'Feb 12', raised: 320000 }
    ],
    donorRanges: [
      { name: '₹100-500', value: 60, color: '#10b981' },
      { name: '₹500-1K', value: 30, color: '#3b82f6' },
      { name: '₹1K+', value: 10, color: '#ef4444' }
    ],
    engagement: { comments: 450, likes: 2100, shares: 320 },
    repeatDonors: 120
  };

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-9 w-9 text-blue-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Campaign Analytics</h1>
                <p className="text-gray-600 dark:text-gray-300">Real-time insights to optimize your campaign</p>
              </div>
            </div>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card className="p-8 hover:shadow-xl transition-all border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Total Backers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{analyticsData.totalBackers.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Total Raised</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(analyticsData.totalRaised)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Avg Donation</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(analyticsData.avgDonation)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Funding Progress</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{analyticsData.progress}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Funding Trend */}
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl">Funding Trend Over Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={analyticsData.trends}>
                    <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#3b82f6" stopOpacity={0.05} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} />
                    <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                    <Tooltip />
                    <Line type="monotone" dataKey="raised" stroke="#3b82f6" strokeWidth={3} dot={false}>
                      <LabelList dataKey="raised" position="top" />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Donor Distribution */}
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-xl">Donor Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={analyticsData.donorRanges}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={3}
                      data={analyticsData.donorRanges.map(d => ({ ...d, fill: d.color }))}
                    >
                      {analyticsData.donorRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value + '%', name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Engagement & Repeat Donors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-0">
                <div className="text-center p-8 border-r md:border-r last:border-r-0">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{analyticsData.engagement.comments}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Comments</div>
                </div>
                <div className="text-center p-8 border-r md:border-r last:border-r-0">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{analyticsData.engagement.likes}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Likes</div>
                </div>
                <div className="text-center p-8">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{analyticsData.engagement.shares}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Shares</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Repeat Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-4">{analyticsData.repeatDonors}</div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">Loyal supporters who backed multiple campaigns</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span>₹2.1M from repeat donors</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>23% of total backers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsDashboard;

