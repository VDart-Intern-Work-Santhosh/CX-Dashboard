import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area, ComposedChart, LabelList } from 'recharts';

const RedeploymentDashboard = () => {
    // Redeployment state variables
    const [selectedMonth, setSelectedMonth] = useState('All Months');

    // Redeployment monthly data
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

    const months = Object.keys(monthlyData);
    const availableMonths = ['All Months', ...months];

    // Calculate aggregated data for All Months
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

    // Get current data based on selection for Redeployment
    const getCurrentData = () => {
        if (selectedMonth === 'All Months') {
            return allMonthsData;
        }
        return monthlyData[selectedMonth];
    };

    const currentData = getCurrentData();

    // Calculate key metrics for Redeployment
    const submissionToInterviewRate = Math.round((currentData.interviewsScheduled / currentData.clientSubmission) * 100);
    const interviewToClosureRate = currentData.interviewsScheduled > 0 ? Math.round((currentData.candidatesClosure / currentData.interviewsScheduled) * 100) : 0;
    const closureToStartRate = currentData.candidatesClosure > 0 ? Math.round((currentData.candidatesStarts / currentData.candidatesClosure) * 100) : 0;
    const overallConversionRate = Math.round((currentData.candidatesStarts / currentData.profilesShared) * 100);

    // For trend analysis
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

    // Bench metrics
    const benchMetricsData = [
        { name: 'Active', value: currentData.activeBenchCandidates, fill: '#4F4FFF' },
        { name: 'Passive', value: currentData.passiveBenchCandidates, fill: '#FF4F4F' }
    ];

    // Recruitment funnel data
    const funnelData = [
        { name: 'Profiles', value: currentData.profilesShared, fill: '#4F4FFF' },
        { name: 'Internal', value: currentData.internalSubmission, fill: '#00AD5B' },
        { name: 'Client', value: currentData.clientSubmission, fill: '#FFA500' },
        { name: 'Interviews', value: currentData.interviewsScheduled, fill: '#8F00FF' },
        { name: 'Closures', value: currentData.candidatesClosure, fill: '#FF007F' },
        { name: 'Starts', value: currentData.candidatesStarts, fill: '#00BAAD' },
        {name:'Not Worked with VDart', value: currentData.candidatesNotWorkedWithVDart, fill: '#8884d8' }
    ];

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

    // Enhanced PowerBI style gauge component with better alignment
    const GaugeChart = ({ value, max, color, label, percentage, subtitle }) => {
        const percent = Math.min((value / max) * 100, 100);

        return (
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center items-center min-h-0">
                    <div className="text-center mb-2">
                        <div className="text-2xl font-bold" style={{ color, lineHeight: '1' }}>{value.toLocaleString()}</div>
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

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            {/* REDEPLOYMENT CONTENT */}
            <div className="p-4 bg-white font-sans">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 mb-2">Monthly Performance Overview</h1>
                        <p className="text-xs text-gray-600">Candidate Pipeline & Bench Utilization</p>
                    </div>
                    <div className="flex space-x-2">
                        {availableMonths.map(month => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(month)}
                                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${selectedMonth === month
                                        ? 'text-gray-100'
                                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                    }`}
                                style={selectedMonth === month ? {
                                    background: 'linear-gradient(90deg, #4F4FFF 0%)',
                                    border: '1px solid #4F4FFF'
                                } : {
                                    border: '1px solid #E5E7EB'
                                }}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bench Overview - Fixed alignment */}
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

                {/* Recruitment Funnel */}
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

                {/* Trend Analysis */}
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

                {/* Performance Metrics */}
                <div className="mb-4">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                        <h2 className="text-sm font-semibold text-gray-800">Performance Metrics</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
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
                    </div>
                </div>

                {/* Distribution Charts */}
                <div className="grid grid-cols-3 gap-4">
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
                            <h2 className="text-sm font-semibold text-gray-800">Submission Type</h2>
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
                            <h2 className="text-sm font-semibold text-gray-800">Activity Summary</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-2 h-48 content-center">
                            <div className="bg-gray-50 p-2 rounded-sm flex flex-col items-center justify-center border border-gray-100">
                                <div className="text-xs mb-1 text-gray-600 font-medium">New Candidates</div>
                                <div className="text-xl font-semibold text-blue-600">{currentData.newCandidatesAdded}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-sm flex flex-col items-center justify-center border border-gray-100">
                                <div className="text-xs mb-1 text-gray-600 font-medium">Project Ends</div>
                                <div className="text-xl font-semibold text-red-500">{currentData.candidatesProjectEnd}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-sm flex flex-col items-center justify-center border border-gray-100">
                                <div className="text-xs mb-1 text-gray-600 font-medium">Accounts Submitted</div>
                                <div className="text-xl font-semibold text-purple-600">{currentData.accountsSubmitted}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-sm flex flex-col items-center justify-center border border-gray-100">
                                <div className="text-xs mb-1 text-gray-600 font-medium">Total Redeployed</div>
                                <div className="text-xl font-semibold text-green-600">{currentData.totalRedeployed}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                        <div className="text-xs text-gray-500">
                            Data as of: May 22, 2025
                        </div>
                        <div className="text-xs text-gray-500">
                            Redeployment Dashboard v1.0
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center text-gray-400 text-xs">
                <p>© 2025 VDart CX Team | Redeployment Dashboard v1.0</p>
            </div>
        </div>
    );
};

export default RedeploymentDashboard;