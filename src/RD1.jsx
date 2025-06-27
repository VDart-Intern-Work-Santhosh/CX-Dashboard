import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area, ComposedChart, LabelList, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calendar, TrendingUp, Users, Phone, Target, BarChart3, Activity } from 'lucide-react';

const RedeploymentDashboard = () => {
    // State variables for original functionality
    const [selectedMonth, setSelectedMonth] = useState('All Months');

    // New state variables for analytics
    const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');
    const [selectedPeriod, setSelectedPeriod] = useState('All Periods');
    const [selectedEmployee, setSelectedEmployee] = useState('All Employees');
    const [customMetric1, setCustomMetric1] = useState('profilesShared');
    const [customMetric2, setCustomMetric2] = useState('candidatesStarts');
    const [customChartType, setCustomChartType] = useState('bar');

    // Original monthly data (keeping all existing data)
    const monthlyData = {
        'Jan-25': {
            totalBenchCandidates: 820,
            activeBenchCandidates: 568,
            passiveBenchCandidates: 252,
            newCandidatesAdded: 36,
            profilesShared: 556,
            internalSubmission: 495,
            clientSubmission: 61,
            interviewsScheduled: 4,
            candidatesClosure: 0,
            candidatesStarts: 2,
            accountsSubmitted: 11,
            candidatesProjectEnd: 15,
            candidatesNotWorkedWithVDart: 324,
            totalReferrals: 29,
            totalRedeployed: 0
        },
        'Feb-25': {
            totalBenchCandidates: 665,
            activeBenchCandidates: 456,
            passiveBenchCandidates: 209,
            newCandidatesAdded: 41,
            profilesShared: 488,
            internalSubmission: 417,
            clientSubmission: 71,
            interviewsScheduled: 9,
            candidatesClosure: 2,
            candidatesStarts: 1,
            accountsSubmitted: 13,
            candidatesProjectEnd: 24,
            candidatesNotWorkedWithVDart: 320,
            totalReferrals: 20,
            totalRedeployed: 2
        },
        'Mar-25': {
            totalBenchCandidates: 692,
            activeBenchCandidates: 484,
            passiveBenchCandidates: 208,
            newCandidatesAdded: 28,
            profilesShared: 304,
            internalSubmission: 262,
            clientSubmission: 42,
            interviewsScheduled: 7,
            candidatesClosure: 1,
            candidatesStarts: 2,
            accountsSubmitted: 11,
            candidatesProjectEnd: 20,
            candidatesNotWorkedWithVDart: 144,
            totalReferrals: 15,
            totalRedeployed: 1
        },
        'Apr-25': {
            totalBenchCandidates: 737,
            activeBenchCandidates: 529,
            passiveBenchCandidates: 208,
            newCandidatesAdded: 43,
            profilesShared: 419,
            internalSubmission: 366,
            clientSubmission: 53,
            interviewsScheduled: 9,
            candidatesClosure: 3,
            candidatesStarts: 1,
            accountsSubmitted: 12,
            candidatesProjectEnd: 28,
            candidatesNotWorkedWithVDart: 151,
            totalReferrals: 15,
            totalRedeployed: 2
        }
    };

    // Enhanced analytics data with different timeframes
    const analyticsData = {
        Weekly: {
            'W1-Jan-25': { totalBenchCandidates: 820, activeBenchCandidates: 568, passiveBenchCandidates: 252, profilesShared: 140, candidatesStarts: 0, interviewsScheduled: 1, candidatesClosure: 0, internalSubmission: 124, clientSubmission: 16, newCandidatesAdded: 9, accountsSubmitted: 3, candidatesProjectEnd: 4, candidatesNotWorkedWithVDart: 81, totalReferrals: 7, totalRedeployed: 0 },
            'W2-Jan-25': { totalBenchCandidates: 815, activeBenchCandidates: 565, passiveBenchCandidates: 250, profilesShared: 145, candidatesStarts: 1, interviewsScheduled: 1, candidatesClosure: 0, internalSubmission: 129, clientSubmission: 16, newCandidatesAdded: 10, accountsSubmitted: 3, candidatesProjectEnd: 4, candidatesNotWorkedWithVDart: 85, totalReferrals: 8, totalRedeployed: 0 },
            'W3-Jan-25': { totalBenchCandidates: 812, activeBenchCandidates: 562, passiveBenchCandidates: 250, profilesShared: 135, candidatesStarts: 0, interviewsScheduled: 1, candidatesClosure: 0, internalSubmission: 120, clientSubmission: 15, newCandidatesAdded: 8, accountsSubmitted: 2, candidatesProjectEnd: 3, candidatesNotWorkedWithVDart: 79, totalReferrals: 7, totalRedeployed: 0 },
            'W4-Jan-25': { totalBenchCandidates: 810, activeBenchCandidates: 560, passiveBenchCandidates: 250, profilesShared: 136, candidatesStarts: 1, interviewsScheduled: 1, candidatesClosure: 0, internalSubmission: 122, clientSubmission: 14, newCandidatesAdded: 9, accountsSubmitted: 3, candidatesProjectEnd: 4, candidatesNotWorkedWithVDart: 79, totalReferrals: 7, totalRedeployed: 0 }
        },
        Monthly: monthlyData,
        Quarterly: {
            'Q1-2025': { totalBenchCandidates: 726, activeBenchCandidates: 503, passiveBenchCandidates: 223, profilesShared: 1348, candidatesStarts: 5, interviewsScheduled: 20, candidatesClosure: 3, internalSubmission: 1174, clientSubmission: 174, newCandidatesAdded: 105, accountsSubmitted: 35, candidatesProjectEnd: 59, candidatesNotWorkedWithVDart: 788, totalReferrals: 64, totalRedeployed: 3 },
            'Q2-2025': { totalBenchCandidates: 737, activeBenchCandidates: 529, passiveBenchCandidates: 208, profilesShared: 419, candidatesStarts: 1, interviewsScheduled: 9, candidatesClosure: 3, internalSubmission: 366, clientSubmission: 53, newCandidatesAdded: 43, accountsSubmitted: 12, candidatesProjectEnd: 28, candidatesNotWorkedWithVDart: 151, totalReferrals: 15, totalRedeployed: 2 }
        },
        Yearly: {
            '2025': { totalBenchCandidates: 729, activeBenchCandidates: 509, passiveBenchCandidates: 220, profilesShared: 1767, candidatesStarts: 6, interviewsScheduled: 29, candidatesClosure: 6, internalSubmission: 1540, clientSubmission: 227, newCandidatesAdded: 148, accountsSubmitted: 47, candidatesProjectEnd: 87, candidatesNotWorkedWithVDart: 939, totalReferrals: 79, totalRedeployed: 5 }
        }
    };

    // Employee performance data with enhanced metrics
    const employeeData = {
        'Risi': {
            'Jan-25': { calls: 105, profilesShared: 280, interviews: 2, closures: 0, efficiency: 2.67, touchPhase: 'Initial Contact', successRate: 1.9 },
            'Feb-25': { calls: 120, profilesShared: 244, interviews: 5, closures: 1, efficiency: 4.17, touchPhase: 'Follow-up', successRate: 4.1 },
            'Mar-25': { calls: 98, profilesShared: 152, interviews: 4, closures: 1, efficiency: 4.08, touchPhase: 'Closure', successRate: 4.1 },
            'Apr-25': { calls: 135, profilesShared: 210, interviews: 5, closures: 2, efficiency: 3.70, touchPhase: 'Initial Contact', successRate: 3.7 }
        },
        'Swarna': {
            'Jan-25': { calls: 97, profilesShared: 276, interviews: 2, closures: 0, efficiency: 2.84, touchPhase: 'Initial Contact', successRate: 2.1 },
            'Feb-25': { calls: 115, profilesShared: 244, interviews: 4, closures: 1, efficiency: 3.48, touchPhase: 'Follow-up', successRate: 3.5 },
            'Mar-25': { calls: 102, profilesShared: 152, interviews: 3, closures: 0, efficiency: 2.94, touchPhase: 'Closure', successRate: 2.9 },
            'Apr-25': { calls: 128, profilesShared: 209, interviews: 4, closures: 1, efficiency: 3.13, touchPhase: 'Initial Contact', successRate: 3.1 }
        }
    };

    const months = Object.keys(monthlyData);
    const availableMonths = ['All Months', ...months];

    // Calculate aggregated data for All Months (original logic)
    const allMonthsData = {
        totalBenchCandidates: Math.round(months.reduce((sum, month) => sum + monthlyData[month].totalBenchCandidates, 0) / months.length),
        activeBenchCandidates: Math.round(months.reduce((sum, month) => sum + monthlyData[month].activeBenchCandidates, 0) / months.length),
        passiveBenchCandidates: Math.round(months.reduce((sum, month) => sum + monthlyData[month].passiveBenchCandidates, 0) / months.length),
        newCandidatesAdded: months.reduce((sum, month) => sum + monthlyData[month].newCandidatesAdded, 0),
        profilesShared: months.reduce((sum, month) => sum + monthlyData[month].profilesShared, 0),
        internalSubmission: months.reduce((sum, month) => sum + monthlyData[month].internalSubmission, 0),
        clientSubmission: months.reduce((sum, month) => sum + monthlyData[month].clientSubmission, 0),
        interviewsScheduled: months.reduce((sum, month) => sum + monthlyData[month].interviewsScheduled, 0),
        candidatesClosure: months.reduce((sum, month) => sum + monthlyData[month].candidatesClosure, 0),
        candidatesStarts: 6,
        accountsSubmitted: months.reduce((sum, month) => sum + monthlyData[month].accountsSubmitted, 0),
        candidatesProjectEnd: months.reduce((sum, month) => sum + monthlyData[month].candidatesProjectEnd, 0),
        candidatesNotWorkedWithVDart: Math.round(months.reduce((sum, month) => sum + monthlyData[month].candidatesNotWorkedWithVDart, 0) / months.length),
        totalReferrals: months.reduce((sum, month) => sum + monthlyData[month].totalReferrals, 0),
        totalRedeployed: months.reduce((sum, month) => sum + monthlyData[month].totalRedeployed, 0)
    };

    // Get available periods based on timeframe
    const getAvailablePeriods = () => {
        const periods = Object.keys(analyticsData[selectedTimeframe] || {});
        return ['All Periods', ...periods];
    };

    // Get current data based on original selection
    const getCurrentData = () => {
        if (selectedMonth === 'All Months') {
            return allMonthsData;
        }
        return monthlyData[selectedMonth];
    };

    // Get analytics data based on new selection
    const getAnalyticsData = () => {
        const timeframeData = analyticsData[selectedTimeframe] || {};

        if (selectedPeriod === 'All Periods') {
            const periods = Object.keys(timeframeData);
            if (periods.length === 0) return {};

            const aggregated = {};
            const metricsToSum = ['profilesShared', 'candidatesStarts', 'interviewsScheduled', 'candidatesClosure', 'internalSubmission', 'clientSubmission', 'newCandidatesAdded', 'accountsSubmitted', 'candidatesProjectEnd', 'totalReferrals', 'totalRedeployed'];
            const metricsToAverage = ['totalBenchCandidates', 'activeBenchCandidates', 'passiveBenchCandidates', 'candidatesNotWorkedWithVDart'];

            Object.keys(timeframeData[periods[0]]).forEach(metric => {
                if (metricsToSum.includes(metric)) {
                    aggregated[metric] = periods.reduce((sum, period) => sum + (timeframeData[period][metric] || 0), 0);
                } else if (metricsToAverage.includes(metric)) {
                    aggregated[metric] = Math.round(periods.reduce((sum, period) => sum + (timeframeData[period][metric] || 0), 0) / periods.length);
                }
            });

            return aggregated;
        }

        return timeframeData[selectedPeriod] || {};
    };

    const currentData = getCurrentData();
    const analyticsCurrentData = getAnalyticsData();

    // Custom metrics options
    const metricOptions = [
        { value: 'totalBenchCandidates', label: 'Total Bench Candidates' },
        { value: 'activeBenchCandidates', label: 'Active Bench Candidates' },
        { value: 'profilesShared', label: 'Profiles Shared' },
        { value: 'candidatesStarts', label: 'Candidate Starts' },
        { value: 'interviewsScheduled', label: 'Interviews Scheduled' },
        { value: 'candidatesClosure', label: 'Candidate Closures' },
        { value: 'internalSubmission', label: 'Internal Submissions' },
        { value: 'clientSubmission', label: 'Client Submissions' },
        { value: 'newCandidatesAdded', label: 'New Candidates Added' },
        { value: 'accountsSubmitted', label: 'Accounts Submitted' },
        { value: 'totalReferrals', label: 'Total Referrals' },
        { value: 'totalRedeployed', label: 'Total Redeployed' }
    ];

    // Chart type options
    const chartTypeOptions = [
        { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
        { value: 'line', label: 'Line Chart', icon: TrendingUp },
        { value: 'area', label: 'Area Chart', icon: Activity },
        { value: 'pie', label: 'Pie Chart', icon: Target }
    ];

    // Calculate key metrics (original logic)
    const submissionToInterviewRate = Math.round((currentData.interviewsScheduled / currentData.clientSubmission) * 100);
    const interviewToClosureRate = currentData.interviewsScheduled > 0 ? Math.round((currentData.candidatesClosure / currentData.interviewsScheduled) * 100) : 0;
    const closureToStartRate = currentData.candidatesClosure > 0 ? Math.round((currentData.candidatesStarts / currentData.candidatesClosure) * 100) : 0;
    const overallConversionRate = Math.round((currentData.candidatesStarts / currentData.profilesShared) * 100);

    // For trend analysis (original logic)
    const trendData = months.map(month => ({
        name: month,
        totalBench: monthlyData[month].totalBenchCandidates,
        activeBench: monthlyData[month].activeBenchCandidates,
        passiveBench: monthlyData[month].passiveBenchCandidates,
        profilesShared: monthlyData[month].profilesShared,
        internalSubmission: monthlyData[month].internalSubmission,
        clientSubmission: monthlyData[month].clientSubmission,
        interviews: monthlyData[month].interviewsScheduled,
        closures: monthlyData[month].candidatesClosure,
        starts: monthlyData[month].candidatesStarts,
        projectEnd: monthlyData[month].candidatesProjectEnd,
        notWorkedWithVDart: monthlyData[month].candidatesNotWorkedWithVDart
    }));

    // Color palettes
    const COLORS = {
        blue: '#4F4FFF',
        green: '#00AD5B',
        orange: '#FFA500',
        purple: '#8F00FF',
        red: '#FF4F4F',
        teal: '#00BAAD',
        pink: '#FF007F',
        chartColors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
    };

    // Bench metrics (original logic)
    const benchMetricsData = [
        { name: 'Active', value: currentData.activeBenchCandidates, fill: '#4F4FFF' },
        { name: 'Passive', value: currentData.passiveBenchCandidates, fill: '#FF4F4F' }
    ];

    // Recruitment funnel data (original logic)
    const funnelData = [
        { name: 'Profiles', value: currentData.profilesShared, fill: '#4F4FFF' },
        { name: 'Internal', value: currentData.internalSubmission, fill: '#00AD5B' },
        { name: 'Client', value: currentData.clientSubmission, fill: '#FFA500' },
        { name: 'Interviews', value: currentData.interviewsScheduled, fill: '#8F00FF' },
        { name: 'Closures', value: currentData.candidatesClosure, fill: '#FF007F' },
        { name: 'Starts', value: currentData.candidatesStarts, fill: '#00BAAD' },
        { name: 'Not Worked with VDart', value: currentData.candidatesNotWorkedWithVDart, fill: '#8884d8' }
    ];

    // Enhanced PowerBI style gauge component
    const GaugeChart = ({ value, max, color, label, percentage, subtitle, trend }) => {
        const percent = Math.min((value / max) * 100, 100);

        return (
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center items-center min-h-0">
                    <div className="text-center mb-2">
                        <div className="text-2xl font-bold" style={{ color, lineHeight: '1' }}>
                            {value?.toLocaleString() || 0}
                            {trend && (
                                <span className={`ml-2 text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
                                </span>
                            )}
                        </div>
                        {percentage && (
                            <div className="text-xs font-medium mt-0.5" style={{ color: '#666' }}>
                                {percentage}%
                            </div>
                        )}
                    </div>
                    <div className="w-full px-2">
                        <div className="bg-gray-200 w-full h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-300 ease-out"
                                style={{
                                    backgroundColor: color,
                                    width: `${percent}%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-center flex-shrink-0">
                    <div className="text-xs font-semibold text-gray-700 leading-tight">{label}</div>
                    {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
                </div>
            </div>
        );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 shadow-md rounded border border-gray-200" style={{ fontSize: '12px' }}>
                    <p className="font-bold" style={{ color: '#333' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, margin: '3px 0' }}>
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom label renderer for bar chart
    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;
        return (
            <text
                x={x + width / 2}
                y={y - 5}
                fill="#666"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="500"
            >
                {value}
            </text>
        );
    };

    // Get analytics trend data
    const getAnalyticsTrendData = () => {
        const timeframeData = analyticsData[selectedTimeframe] || {};
        return Object.keys(timeframeData).map(period => ({
            name: period,
            ...timeframeData[period]
        }));
    };

    // Get employee performance data for charts
    const getEmployeePerformanceData = () => {
        const periods = Object.keys(employeeData.Risi);

        if (selectedEmployee === 'Risi') {
            return periods.map(period => ({
                period,
                calls: employeeData.Risi[period].calls,
                efficiency: employeeData.Risi[period].efficiency,
                interviews: employeeData.Risi[period].interviews,
                closures: employeeData.Risi[period].closures,
                successRate: employeeData.Risi[period].successRate
            }));
        } else if (selectedEmployee === 'Swarna') {
            return periods.map(period => ({
                period,
                calls: employeeData.Swarna[period].calls,
                efficiency: employeeData.Swarna[period].efficiency,
                interviews: employeeData.Swarna[period].interviews,
                closures: employeeData.Swarna[period].closures,
                successRate: employeeData.Swarna[period].successRate
            }));
        } else {
            // All Employees - comparison data
            return periods.map(period => ({
                period,
                Risi: employeeData.Risi[period].calls,
                Swarna: employeeData.Swarna[period].calls,
                RisiEfficiency: employeeData.Risi[period].efficiency,
                SwarnaEfficiency: employeeData.Swarna[period].efficiency
            }));
        }
    };

    // Generate custom chart data
    const getCustomChartData = () => {
        const trendData = getAnalyticsTrendData();
        if (customChartType === 'pie') {
            return trendData.map((item, index) => ({
                name: item.name,
                value: item[customMetric1] || 0,
                fill: COLORS.chartColors[index % COLORS.chartColors.length]
            }));
        }
        return trendData;
    };

    // Render custom chart
    const renderCustomChart = () => {
        const data = getCustomChartData();
        const metric1Label = metricOptions.find(m => m.value === customMetric1)?.label || customMetric1;
        const metric2Label = metricOptions.find(m => m.value === customMetric2)?.label || customMetric2;

        switch (customChartType) {
            case 'line':
                return (
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        <Line type="monotone" dataKey={customMetric1} stroke={COLORS.blue} strokeWidth={2} name={metric1Label} />
                        <Line type="monotone" dataKey={customMetric2} stroke={COLORS.green} strokeWidth={2} name={metric2Label} />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorMetric1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey={customMetric1} stroke={COLORS.blue} fill="url(#colorMetric1)" name={metric1Label} />
                    </AreaChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="value"
                            paddingAngle={2}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                );
            default: // bar
                return (
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        <Bar dataKey={customMetric1} fill={COLORS.blue} name={metric1Label} />
                        <Bar dataKey={customMetric2} fill={COLORS.green} name={metric2Label} />
                    </BarChart>
                );
        }
    };

    return (
        <div className="bg-gray-100 w-full">
            <div className="p-4 bg-white font-sans">
                {/* Enhanced Header with Analytics Controls */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 mb-2">RD Analytics Dashboard</h1>
                        <p className="text-xs text-gray-600">Monthly Performance Overview & Advanced Analytics</p>
                    </div>
                    <div className="flex space-x-2">
                        {/* Original Month Selection */}
                        <div className="flex items-center space-x-2 px-2 py-1 bg-gray-50 rounded-lg border">
                            <span className="text-xs text-gray-600 font-medium">Original View:</span>
                            {availableMonths.map(month => (
                                <button
                                    key={month}
                                    onClick={() => setSelectedMonth(month)}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${selectedMonth === month
                                        ? 'bg-blue-500 text-black'
                                        : 'text-gray-700 bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>

                        {/* Analytics Controls */}
                        <div className="flex items-center space-x-2 px-2 py-1 bg-green-50 rounded-lg border">
                            <span className="text-xs text-gray-600 font-medium">Analytics:</span>
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <select
                                value={selectedTimeframe}
                                onChange={(e) => setSelectedTimeframe(e.target.value)}
                                className="px-2 py-1 text-xs font-medium rounded border bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map(timeframe => (
                                    <option key={timeframe} value={timeframe}>{timeframe}</option>
                                ))}
                            </select>

                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-2 py-1 text-xs font-medium rounded border bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {getAvailablePeriods().map(period => (
                                    <option key={period} value={period}>{period}</option>
                                ))}
                            </select>

                            <Users className="w-4 h-4 text-gray-500" />
                            <select
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="px-2 py-1 text-xs font-medium rounded border bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {['All Employees', 'Risi', 'Swarna'].map(employee => (
                                    <option key={employee} value={employee}>{employee}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Original Bench Overview - All Stats Cards Preserved */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-32">
                        <GaugeChart
                            value={currentData.totalBenchCandidates}
                            max={1000}
                            color={COLORS.blue}
                            label="Total Bench Candidates"
                        />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-32">
                        <GaugeChart
                            value={currentData.activeBenchCandidates}
                            max={currentData.totalBenchCandidates}
                            color={COLORS.green}
                            label="Active Candidates"
                            percentage={Math.round((currentData.activeBenchCandidates / currentData.totalBenchCandidates) * 100)}
                        />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-32">
                        <GaugeChart
                            value={currentData.passiveBenchCandidates}
                            max={currentData.totalBenchCandidates}
                            color={COLORS.red}
                            label="Passive Candidates"
                            percentage={Math.round((currentData.passiveBenchCandidates / currentData.totalBenchCandidates) * 100)}
                        />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-32">
                        <GaugeChart
                            value={currentData.totalReferrals}
                            max={100}
                            color={COLORS.orange}
                            label="Total Referrals"
                        />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-32">
                        <GaugeChart
                            value={currentData.totalRedeployed}
                            max={50}
                            color={COLORS.purple}
                            label="Total Redeployed"
                        />
                    </div>
                </div>

                {/* Original Recruitment Funnel - Preserved */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm font-semibold text-gray-800">Recruitment Funnel</h2>
                                {selectedMonth === 'All Months' ?
                                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">Jan-Apr 2025</span> :
                                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{selectedMonth}</span>
                                }
                            </div>
                        </div>

                        <div className="mb-3 px-2">
                            <div className="p-2 rounded-sm text-xs bg-blue-50 text-gray-800 border border-blue-100">
                                <span className="font-bold">Key Insight:</span> {selectedMonth === 'All Months' ?
                                    `Only ${Math.round((currentData.candidatesStarts / currentData.profilesShared) * 100)}% of profiles (${currentData.candidatesStarts} out of ${currentData.profilesShared}) convert to starts. The biggest drop occurs between client submissions (${currentData.clientSubmission}) and interviews (${currentData.interviewsScheduled}).` :
                                    `In ${selectedMonth}, the conversion from submissions to interviews was ${submissionToInterviewRate}%, indicating ${submissionToInterviewRate < 15 ? 'a need for better client matching' : 'good profile alignment with client needs'}.`}
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart
                                data={funnelData}
                                margin={{ top: 25, right: 30, left: 5, bottom: 5 }}
                                barSize={40}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" name="Count" radius={[2, 2, 0, 0]}>
                                    <LabelList dataKey="value" content={renderCustomizedLabel} />
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Recruitment Metrics</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Profiles Shared</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.blue }}>{currentData.profilesShared}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.blue, width: '100%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Internal Submissions</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.green }}>{currentData.internalSubmission}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.green, width: `${(currentData.internalSubmission / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Client Submissions</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.orange }}>{currentData.clientSubmission}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.orange, width: `${(currentData.clientSubmission / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Interviews Scheduled</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.purple }}>{currentData.interviewsScheduled}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.purple, width: `${(currentData.interviewsScheduled / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Candidates Closure</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.pink }}>{currentData.candidatesClosure}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.pink, width: `${(currentData.candidatesClosure / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Candidates Starts</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.teal }}>{currentData.candidatesStarts}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.teal, width: `${(currentData.candidatesStarts / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">Not Worked with VDart</span>
                                    <span className="text-xs font-bold" style={{ color: COLORS.chartColors[4] }}>{currentData.candidatesNotWorkedWithVDart}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-sm overflow-hidden">
                                    <div className="h-full rounded-sm" style={{ backgroundColor: COLORS.chartColors[4], width: `${(currentData.candidatesNotWorkedWithVDart / currentData.profilesShared) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Original Trend Analysis - Preserved */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Bench Trend (Jan-Apr 2025)</h2>
                        </div>

                        <div className="mb-3 px-2">
                            <div className="p-2 rounded-sm text-xs bg-blue-50 text-gray-800 border border-blue-100">
                                <span className="font-bold">Key Insight:</span> Bench size decreased from 820 in Jan to 737 in Apr, an overall reduction of 10.1%. However, the proportion of active candidates improved from 69.3% to 71.8%, indicating better candidate quality and engagement.
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                                data={trendData}
                                margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
                            >
                                <defs>
                                    <linearGradient id="totalBenchFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                                <Area type="monotone" dataKey="totalBench" fill="url(#totalBenchFill)" stroke={COLORS.blue} fillOpacity={1} name="Total Bench" />
                                <Line
                                    type="monotone"
                                    dataKey="activeBench"
                                    stroke={COLORS.green}
                                    strokeWidth={2}
                                    dot={{ stroke: COLORS.green, strokeWidth: 2, r: 4, fill: 'white' }}
                                    activeDot={{ r: 6 }}
                                    name="Active"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="passiveBench"
                                    stroke={COLORS.red}
                                    strokeWidth={2}
                                    dot={{ stroke: COLORS.red, strokeWidth: 2, r: 4, fill: 'white' }}
                                    activeDot={{ r: 6 }}
                                    name="Passive"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Recruitment Activity</h2>
                        </div>

                        <div className="mb-3 px-2">
                            <div className="p-2 rounded-sm text-xs bg-blue-50 text-gray-800 border border-blue-100">
                                <span className="font-bold">Key Insight:</span> February had the highest interview-to-closure efficiency (22.2%) while April showed the best closure-to-start rate (100%). Overall, there's a downward trend in profile sharing (556 → 419) but improved quality metrics in the later stages.
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart
                                data={trendData}
                                margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                                <Line
                                    type="monotone"
                                    dataKey="profilesShared"
                                    stroke={COLORS.blue}
                                    strokeWidth={2}
                                    dot={{ stroke: COLORS.blue, r: 4, strokeWidth: 2, fill: 'white' }}
                                    activeDot={{ r: 6 }}
                                    name="Profiles"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="clientSubmission"
                                    stroke={COLORS.orange}
                                    strokeWidth={2}
                                    dot={{ stroke: COLORS.orange, r: 4, strokeWidth: 2, fill: 'white' }}
                                    activeDot={{ r: 6 }}
                                    name="Submissions"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="interviews"
                                    stroke={COLORS.purple}
                                    strokeWidth={2.5}
                                    dot={{ stroke: COLORS.purple, r: 5, strokeWidth: 2, fill: 'white' }}
                                    activeDot={{ r: 7 }}
                                    name="Interviews"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="starts"
                                    stroke={COLORS.teal}
                                    strokeWidth={2.5}
                                    dot={{ stroke: COLORS.teal, r: 5, strokeWidth: 2, fill: 'white' }}
                                    activeDot={{ r: 7 }}
                                    name="Starts"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* NEW: Employee Performance Section - Separate Charts */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm font-semibold text-gray-800 flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Employee Touch Phase Calls
                                </h2>
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                                    {selectedEmployee}
                                </span>
                            </div>
                        </div>

                        <div className="mb-3 px-2">
                            <div className="p-2 rounded-sm text-xs bg-green-50 text-gray-800 border border-green-100">
                                <span className="font-bold">Employee Insight:</span>
                                {selectedEmployee === 'Risi' ? ' Risi shows consistent performance with peak in April (135 calls). Average efficiency: 3.65.' :
                                    selectedEmployee === 'Swarna' ? ' Swarna maintains steady performance with best efficiency in February. Average efficiency: 3.10.' :
                                        ' Combined employee performance shows complementary strengths with total 900+ calls across all periods.'}
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={280}>
                            {selectedEmployee === 'All Employees' ? (
                                <ComposedChart data={getEmployeePerformanceData()} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <YAxis yAxisId="calls" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    <Bar yAxisId="calls" dataKey="Risi" fill={COLORS.blue} name="Risi Calls" />
                                    <Bar yAxisId="calls" dataKey="Swarna" fill={COLORS.green} name="Swarna Calls" />
                                </ComposedChart>
                            ) : (
                                <BarChart data={getEmployeePerformanceData()} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    <Bar dataKey="calls" fill={selectedEmployee === 'Risi' ? COLORS.blue : COLORS.green} name={`${selectedEmployee} Calls`} />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm font-semibold text-gray-800 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Employee Efficiency Trends
                                </h2>
                                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                                    Performance Metrics
                                </span>
                            </div>
                        </div>

                        <div className="mb-3 px-2">
                            <div className="p-2 rounded-sm text-xs bg-purple-50 text-gray-800 border border-purple-100">
                                <span className="font-bold">Efficiency Insight:</span>
                                {selectedEmployee === 'All Employees' ? ' Risi leads in peak performance (4.17 efficiency in Feb), while Swarna shows consistent delivery across all periods.' :
                                    `${selectedEmployee} shows ${selectedEmployee === 'Risi' ? 'variable but high-peak' : 'consistent and reliable'} performance patterns with strong client engagement.`}
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={280}>
                            {selectedEmployee === 'All Employees' ? (
                                <LineChart data={getEmployeePerformanceData()} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    <Line type="monotone" dataKey="RisiEfficiency" stroke={COLORS.blue} strokeWidth={2} name="Risi Efficiency" />
                                    <Line type="monotone" dataKey="SwarnaEfficiency" stroke={COLORS.green} strokeWidth={2} name="Swarna Efficiency" />
                                </LineChart>
                            ) : (
                                <LineChart data={getEmployeePerformanceData()} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    <Line type="monotone" dataKey="efficiency" stroke={selectedEmployee === 'Risi' ? COLORS.blue : COLORS.green} strokeWidth={2} name={`${selectedEmployee} Efficiency`} />
                                    <Line type="monotone" dataKey="successRate" stroke={COLORS.purple} strokeWidth={2} name="Success Rate" />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* NEW: Custom Metrics Visualization */}
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3 mb-4">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-semibold text-gray-800 flex items-center">
                                <Target className="w-4 h-4 mr-2" />
                                Custom Analytics Visualization
                            </h2>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={customMetric1}
                                    onChange={(e) => setCustomMetric1(e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    {metricOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>

                                <span className="text-xs text-gray-500">vs</span>

                                <select
                                    value={customMetric2}
                                    onChange={(e) => setCustomMetric2(e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    {metricOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>

                                <div className="flex space-x-1">
                                    {chartTypeOptions.map(option => {
                                        const IconComponent = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setCustomChartType(option.value)}
                                                className={`p-1 rounded ${customChartType === option.value
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                                title={option.label}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 px-2">
                        <div className="p-2 rounded-sm text-xs bg-blue-50 text-gray-800 border border-blue-100">
                            <span className="font-bold">Custom Insight:</span> Analyzing {metricOptions.find(m => m.value === customMetric1)?.label} vs {metricOptions.find(m => m.value === customMetric2)?.label} across {selectedTimeframe.toLowerCase()} periods using {chartTypeOptions.find(c => c.value === customChartType)?.label.toLowerCase()}. This helps identify correlations and optimization opportunities.
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={350}>
                        {renderCustomChart()}
                    </ResponsiveContainer>
                </div>

                {/* Complete Performance Metrics - All 5 Key Metrics */}
                <div className="mb-4">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                        <h2 className="text-sm font-semibold text-gray-800">Performance Metrics - Complete Overview</h2>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                            <div className="text-xs text-center text-gray-600 mb-2">Submission → Interview Rate</div>
                            <div className="flex justify-center items-center h-16">
                                <div className="text-3xl font-semibold" style={{ color: COLORS.blue }}>{submissionToInterviewRate}%</div>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                {currentData.interviewsScheduled} of {currentData.clientSubmission}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                            <div className="text-xs text-center text-gray-600 mb-2">Interview → Closure Rate</div>
                            <div className="flex justify-center items-center h-16">
                                <div className="text-3xl font-semibold" style={{ color: COLORS.green }}>{interviewToClosureRate}%</div>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                {currentData.candidatesClosure} of {currentData.interviewsScheduled}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                            <div className="text-xs text-center text-gray-600 mb-2">Closure → Start Rate</div>
                            <div className="flex justify-center items-center h-16">
                                <div className="text-3xl font-semibold" style={{ color: COLORS.purple }}>{closureToStartRate}%</div>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                {currentData.candidatesStarts} of {currentData.candidatesClosure || 1}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                            <div className="text-xs text-center text-gray-600 mb-2">Overall Conversion Rate</div>
                            <div className="flex justify-center items-center h-16">
                                <div className="text-3xl font-semibold" style={{ color: COLORS.orange }}>{overallConversionRate}%</div>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                {currentData.candidatesStarts} of {currentData.profilesShared}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                            <div className="text-xs text-center text-gray-600 mb-2">Internal Submission Rate</div>
                            <div className="flex justify-center items-center h-16">
                                <div className="text-3xl font-semibold" style={{ color: COLORS.teal }}>
                                    {Math.round((currentData.internalSubmission / currentData.profilesShared) * 100)}%
                                </div>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                {currentData.internalSubmission} of {currentData.profilesShared}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Distribution Charts with Inactive Pipeline and Client Metrics */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Bench Status</h2>
                        </div>

                        <div className="flex h-48">
                            <div className="w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={benchMetricsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            fill="#8884d8"
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={-180}
                                            paddingAngle={2}
                                        >
                                            {benchMetricsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center px-4">
                                <div className="mb-4">
                                    <div className="flex items-center mb-1">
                                        <div className="w-2 h-2 rounded-full mr-2 bg-blue-600"></div>
                                        <span className="text-xs text-gray-600">Active</span>
                                    </div>
                                    <div className="text-sm font-semibold text-blue-600">{currentData.activeBenchCandidates} ({Math.round((currentData.activeBenchCandidates / currentData.totalBenchCandidates) * 100)}%)</div>
                                </div>
                                <div>
                                    <div className="flex items-center mb-1">
                                        <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                                        <span className="text-xs text-gray-600">Passive</span>
                                    </div>
                                    <div className="text-sm font-semibold text-red-500">{currentData.passiveBenchCandidates} ({Math.round((currentData.passiveBenchCandidates / currentData.totalBenchCandidates) * 100)}%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Client vs Internal</h2>
                        </div>

                        <div className="flex h-48">
                            <div className="w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Internal', value: currentData.internalSubmission, fill: COLORS.green },
                                                { name: 'Client', value: currentData.clientSubmission, fill: COLORS.orange }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            fill="#8884d8"
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={-180}
                                            paddingAngle={2}
                                        >
                                            <Cell fill={COLORS.green} />
                                            <Cell fill={COLORS.orange} />
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center px-4">
                                <div className="mb-4">
                                    <div className="flex items-center mb-1">
                                        <div className="w-2 h-2 rounded-full mr-2 bg-green-600"></div>
                                        <span className="text-xs text-gray-600">Internal</span>
                                    </div>
                                    <div className="text-sm font-semibold text-green-600">{currentData.internalSubmission} ({Math.round((currentData.internalSubmission / (currentData.internalSubmission + currentData.clientSubmission)) * 100)}%)</div>
                                </div>
                                <div>
                                    <div className="flex items-center mb-1">
                                        <div className="w-2 h-2 rounded-full mr-2 bg-orange-500"></div>
                                        <span className="text-xs text-gray-600">Client</span>
                                    </div>
                                    <div className="text-sm font-semibold text-orange-500">{currentData.clientSubmission} ({Math.round((currentData.clientSubmission / (currentData.internalSubmission + currentData.clientSubmission)) * 100)}%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Inactive Pipeline</h2>
                        </div>

                        <div className="space-y-3 h-48 overflow-y-auto">
                            <div className="bg-red-50 p-2 rounded border border-red-200">
                                <div className="text-xs text-red-700 font-medium">Not Worked with VDart</div>
                                <div className="text-lg font-bold text-red-600">{currentData.candidatesNotWorkedWithVDart}</div>
                                <div className="text-xs text-red-500">
                                    {Math.round((currentData.candidatesNotWorkedWithVDart / currentData.totalBenchCandidates) * 100)}% of total
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                                <div className="text-xs text-yellow-700 font-medium">Project Ended</div>
                                <div className="text-lg font-bold text-yellow-600">{currentData.candidatesProjectEnd}</div>
                                <div className="text-xs text-yellow-500">Recently available</div>
                            </div>

                            <div className="bg-gray-50 p-2 rounded border border-gray-200">
                                <div className="text-xs text-gray-700 font-medium">Passive Candidates</div>
                                <div className="text-lg font-bold text-gray-600">{currentData.passiveBenchCandidates}</div>
                                <div className="text-xs text-gray-500">Need reactivation</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                        <div className="border-b border-gray-200 pb-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">Touch Phase Calls Summary</h2>
                        </div>

                        <div className="space-y-3 h-48">
                            <div className="bg-blue-50 p-2 rounded border border-blue-200">
                                <div className="text-xs text-blue-700 font-medium">Total Calls Made</div>
                                <div className="text-lg font-bold text-blue-600">
                                    {(employeeData.Risi[selectedMonth] || employeeData.Risi['Jan-25']).calls +
                                        (employeeData.Swarna[selectedMonth] || employeeData.Swarna['Jan-25']).calls}
                                </div>
                                <div className="text-xs text-blue-500">This period</div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-green-50 p-1.5 rounded border border-green-200">
                                    <div className="text-xs text-green-700 font-medium">Risi</div>
                                    <div className="text-sm font-bold text-green-600">
                                        {(employeeData.Risi[selectedMonth] || employeeData.Risi['Jan-25']).calls}
                                    </div>
                                </div>
                                <div className="bg-purple-50 p-1.5 rounded border border-purple-200">
                                    <div className="text-xs text-purple-700 font-medium">Swarna</div>
                                    <div className="text-sm font-bold text-purple-600">
                                        {(employeeData.Swarna[selectedMonth] || employeeData.Swarna['Jan-25']).calls}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 p-2 rounded border border-orange-200">
                                <div className="text-xs text-orange-700 font-medium">Avg Efficiency</div>
                                <div className="text-lg font-bold text-orange-600">
                                    {(((employeeData.Risi[selectedMonth] || employeeData.Risi['Jan-25']).efficiency +
                                        (employeeData.Swarna[selectedMonth] || employeeData.Swarna['Jan-25']).efficiency) / 2).toFixed(1)}
                                </div>
                                <div className="text-xs text-orange-500">Combined rate</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                        <div className="text-xs text-gray-500">
                            Data as of: {new Date().toLocaleDateString()} | Analytics View: {selectedTimeframe} - {selectedPeriod} | Employee: {selectedEmployee}
                        </div>
                        <div className="text-xs text-gray-500">
                            RD Analytics Dashboard v2.0
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center text-gray-400 text-xs">
                <p>© 2025 VDart CX Team | Enhanced RD Analytics Dashboard with Multi-timeframe Analysis & Employee Performance Tracking</p>
            </div>
        </div>
    );
};

export default RedeploymentDashboard; 