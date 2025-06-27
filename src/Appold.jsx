import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, AreaChart, Area, ComposedChart } from 'recharts';

const CompleteCXDashboard = () => {
  // Main navigation state
  const [activeTab, setActiveTab] = useState('rm');

  // Resource Management state variables
  const [activeMetricsMonth, setActiveMetricsMonth] = useState('all');
  const [activeAccountMonth, setActiveAccountMonth] = useState('all');
  const [activeStatusMonth, setActiveStatusMonth] = useState('all');
  const [activeIssueMonth, setActiveIssueMonth] = useState('all');
  const [showTopAccountsOnly, setShowTopAccountsOnly] = useState(false);

  // Redeployment state variables
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Candidate summary data
  const candidateSummaryData = {
    totalCandidates: 733,
    activeCount: 421,
    inactiveCount: 280,
    activePercentage: Math.round((421 / 733) * 100),
    inactivePercentage: Math.round((280 / 733) * 100),
    outOfVDartCount: 65,
    outOfVDartPercentage: Math.round((65 / 733) * 100),
    inactiveReasons: {
      willReachOut: 48,
      doNotContact: 17,
      other: 280 - 48 - 17
    }
  };

  // Account headcount data
  const accountWiseHeadcount = [
    { name: 'Cognizant', value: 60, active: 60 - 24 - 16, inactive: 24, outOfVDart: 16 },
    { name: 'RHT', value: 52, active: 52 - 26 - 24, inactive: 26, outOfVDart: 24 },
    { name: 'Accenture', value: 58, active: 58 - 14 - 14, inactive: 14, outOfVDart: 14 },
    { name: 'NTT Data', value: 104, active: 104 - 29 - 19, inactive: 29, outOfVDart: 19 },
    { name: 'Avanade', value: 46, active: 46 - 12 - 12, inactive: 12, outOfVDart: 12 },
    { name: 'Apexon', value: 17, active: 17 - 3 - 4, inactive: 3, outOfVDart: 4 },
    { name: 'UST Global', value: 7, active: 7 - 2 - 2, inactive: 2, outOfVDart: 2 },
    { name: 'Hexaware', value: 27, active: 27 - 6 - 5, inactive: 6, outOfVDart: 5 },
    { name: 'TechM', value: 68, active: 68 - 11 - 13, inactive: 11, outOfVDart: 13 },
    { name: 'LTI Mindtree', value: 90, active: 90 - 89 - 0, inactive: 89, outOfVDart: 0 }
  ];

  // Monthly metrics data
  const keyMetricsData = [
    { month: 'Jan', touchBase: 509, noResponse: 176, outOfVDart: 33 },
    { month: 'Feb', touchBase: 514, noResponse: 106, outOfVDart: 37 },
    { month: 'Mar', touchBase: 367, noResponse: 155, outOfVDart: 37 },
    { month: 'Apr', touchBase: 352, noResponse: 165, outOfVDart: 42 }
  ];

  // Issue data by account and type
  const issuesByAccountAndType = {
    'Cognizant': {
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 3, Apr: 3 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 1, Mar: 0, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'Apexon': {
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'Accenture': {
      'Allowance': { Jan: 0, Feb: 1, Mar: 0, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Contracts': { Jan: 1, Feb: 0, Mar: 1, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 2 },
      'Time Sheet': { Jan: 1, Feb: 1, Mar: 2, Apr: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'Avanade': {
      'Allowance': { Jan: 0, Feb: 1, Mar: 0, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Contracts': { Jan: 1, Feb: 0, Mar: 1, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 2 },
      'Time Sheet': { Jan: 1, Feb: 1, Mar: 2, Apr: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'TechM': {
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 1, Apr: 2 },
      'Pay Raise': { Jan: 0, Feb: 1, Mar: 1, Apr: 0 },
      'Payroll': { Jan: 1, Feb: 1, Mar: 5, Apr: 2 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'RHT': {
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 1, Apr: 0 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 4, Apr: 2 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'NTT': {
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 1 },
      'Contracts': { Jan: 0, Feb: 1, Mar: 1, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 1, Mar: 2, Apr: 0 },
      'Payroll': { Jan: 1, Feb: 1, Mar: 4, Apr: 2 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 1 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    },
    'Hexaware': {
      'Payroll': { Jan: 0, Feb: 0, Mar: 1, Apr: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Project Location Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'IT and Hardware Issue': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 },
      'Allowance': { Jan: 0, Feb: 0, Mar: 0, Apr: 0 }
    }
  };

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
    { name: 'Starts', value: currentData.candidatesStarts, fill: '#00BAAD' }
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

  // Filter metrics data based on selected month
  const getFilteredMetricsData = () => {
    if (activeMetricsMonth === 'all') {
      return keyMetricsData;
    } else {
      const monthIndex =
        activeMetricsMonth === 'jan' ? 0 :
          activeMetricsMonth === 'feb' ? 1 :
            activeMetricsMonth === 'mar' ? 2 : 3;

      return [keyMetricsData[monthIndex]];
    }
  };

  // Filter account data based on selected month
  const getFilteredAccountData = () => {
    if (activeAccountMonth === 'all') {
      return accountWiseHeadcount;
    } else {
      const modifier =
        activeAccountMonth === 'jan' ? 0.9 :
          activeAccountMonth === 'feb' ? 0.95 :
            activeAccountMonth === 'mar' ? 1.05 : 1.1;

      return accountWiseHeadcount.map(account => ({
        ...account,
        active: Math.round(account.active * modifier),
        inactive: Math.round(account.inactive * modifier),
        outOfVDart: Math.round(account.outOfVDart * modifier),
        value: Math.round(account.value * modifier)
      }));
    }
  };

  // Function to get filtered issue data based on selected month
  const getFilteredIssueData = () => {
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr'];
    const issueTypes = ['Benefits', 'Change Of Employer', 'Pay Raise', 'Payroll', 'Time Sheet', 'Pay Cut',
      'Project Location Change', 'IT and Hardware Issue', 'Contracts', 'Allowance'];
    const accounts = Object.keys(issuesByAccountAndType);

    // Aggregate by issue type
    const issueTypeData = issueTypes.map(type => {
      let value = 0;

      if (activeIssueMonth === 'all') {
        accounts.forEach(account => {
          allMonths.forEach(month => {
            if (issuesByAccountAndType[account][type] && issuesByAccountAndType[account][type][month]) {
              value += issuesByAccountAndType[account][type][month];
            }
          });
        });
      } else {
        accounts.forEach(account => {
          if (issuesByAccountAndType[account][type] && issuesByAccountAndType[account][type][activeIssueMonth]) {
            value += issuesByAccountAndType[account][type][activeIssueMonth];
          }
        });
      }

      return { name: type, value };
    }).filter(item => item.value > 0); // Only show issue types with values > 0

    // Aggregate by account
    const accountIssueData = accounts.map(account => {
      const accountData = { name: account };

      if (activeIssueMonth === 'all') {
        issueTypes.forEach(type => {
          const fieldName = type.replace(/\s+/g, '');
          accountData[fieldName] = 0;
          if (issuesByAccountAndType[account][type]) {
            allMonths.forEach(month => {
              accountData[fieldName] += issuesByAccountAndType[account][type][month] || 0;
            });
          }
        });
      } else {
        issueTypes.forEach(type => {
          const fieldName = type.replace(/\s+/g, '');
          accountData[fieldName] = 0;
          if (issuesByAccountAndType[account][type] && issuesByAccountAndType[account][type][activeIssueMonth]) {
            accountData[fieldName] = issuesByAccountAndType[account][type][activeIssueMonth];
          }
        });
      }

      // Calculate total issues for this account
      accountData.total = issueTypes.reduce((sum, type) => {
        return sum + (accountData[type.replace(/\s+/g, '')] || 0);
      }, 0);

      return accountData;
    }).filter(account => account.total > 0) // Only show accounts with issues
      .sort((a, b) => b.total - a.total); // Sort by total issues descending

    return { issueTypeData, accountIssueData };
  };

  // Get the filtered issue data
  const { issueTypeData, accountIssueData } = getFilteredIssueData();

  // Calculate total issues
  const totalIssues = issueTypeData.reduce((sum, item) => sum + item.value, 0);

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

  // PowerBI style gauge component
  const GaugeChart = ({ value, max, color, label, percentage, subtitle }) => {
    const percent = (value / max) * 100;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full h-16 flex items-end">
          <div className="absolute inset-0 flex flex-col justify-end items-center">
            <div className="text-3xl font-semibold" style={{ color }}>{value}</div>
            {percentage && <div className="text-xs" style={{ color: '#666' }}>{percentage}%</div>}
          </div>
          <div className="bg-gray-200 w-full h-2 rounded-full">
            <div className="h-full rounded-full" style={{ backgroundColor: color, width: `${percent}%`, maxWidth: '100%' }}></div>
          </div>
        </div>
        <div className="mt-2 text-xs font-semibold" style={{ color: '#666' }}>{label}</div>
        {subtitle && <div className="text-xs" style={{ color: '#999' }}>{subtitle}</div>}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      {/* Header */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">CX Functions Executive Dashboard</h1>
          <p className="text-gray-500 text-sm">Performance Overview - 2025</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Export
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 text-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Function tabs */}
      <div className="mb-4 border-b border-gray-300 flex">
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'rm' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          onClick={() => setActiveTab('rm')}
        >
          Resource Management
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'rd' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          onClick={() => setActiveTab('rd')}
        >
          Redeployment
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'csm' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          onClick={() => setActiveTab('csm')}
        >
          Customer Success Management
        </button>
      </div>

      {/* RESOURCE MANAGEMENT CONTENT */}
      {activeTab === 'rm' && (
        <div>
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 font-medium">Total Candidates</div>
                  <div className="text-3xl font-semibold text-gray-800 mt-1">{candidateSummaryData.totalCandidates}</div>
                </div>
                <div className="p-2 rounded-full bg-blue-50">
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 font-medium">Active Candidates</div>
                  <div className="text-3xl font-semibold text-gray-800 mt-1">{candidateSummaryData.activeCount}</div>
                </div>
                <div className="p-2 rounded-full bg-green-50">
                  <div className="w-5 h-5 bg-green-600 rounded"></div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${candidateSummaryData.activePercentage}%` }}></div>
                </div>
                <span className="ml-2 text-xs text-gray-600 font-medium">{candidateSummaryData.activePercentage}%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 font-medium">Inactive Candidates</div>
                  <div className="text-3xl font-semibold text-gray-800 mt-1">{candidateSummaryData.inactiveCount}</div>
                </div>
                <div className="p-2 rounded-full bg-red-50">
                  <div className="w-5 h-5 bg-red-600 rounded"></div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${candidateSummaryData.inactivePercentage}%` }}></div>
                </div>
                <span className="ml-2 text-xs text-gray-600 font-medium">{candidateSummaryData.inactivePercentage}%</span>
              </div>
              <div className="mt-1 flex flex-wrap text-xs text-gray-500">
                <span className="mr-2">• Will reach out: {candidateSummaryData.inactiveReasons.willReachOut}</span>
                <span className="mr-2">• Do not contact: {candidateSummaryData.inactiveReasons.doNotContact}</span>
                <span>• Other: {candidateSummaryData.inactiveReasons.other}</span>
              </div>
            </div>
          </div>

          {/* Month-wise Issue Summary */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Month-wise Issue Summary by Account</h3>
            </div>

            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Account</th>
                      <th className="text-center py-2 px-2 font-semibold text-gray-700">Jan</th>
                      <th className="text-center py-2 px-2 font-semibold text-gray-700">Feb</th>
                      <th className="text-center py-2 px-2 font-semibold text-gray-700">Mar</th>
                      <th className="text-center py-2 px-2 font-semibold text-gray-700">Apr</th>
                      <th className="text-center py-2 px-2 font-semibold text-gray-700 bg-gray-50">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(issuesByAccountAndType).map((account, index) => {
                      const months = ['Jan', 'Feb', 'Mar', 'Apr'];
                      const monthlyTotals = months.map(month => {
                        return Object.keys(issuesByAccountAndType[account]).reduce((sum, issueType) => {
                          return sum + issuesByAccountAndType[account][issueType][month];
                        }, 0);
                      });
                      const total = monthlyTotals.reduce((sum, val) => sum + val, 0);

                      if (total === 0) return null; // Don't show accounts with no issues

                      return (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-2 font-medium text-gray-800">{account}</td>
                          <td className="text-center py-2 px-2 text-gray-700">{monthlyTotals[0] || '-'}</td>
                          <td className="text-center py-2 px-2 text-gray-700">{monthlyTotals[1] || '-'}</td>
                          <td className="text-center py-2 px-2 text-gray-700">{monthlyTotals[2] || '-'}</td>
                          <td className="text-center py-2 px-2 text-gray-700">{monthlyTotals[3] || '-'}</td>
                          <td className="text-center py-2 px-2 font-semibold text-gray-900 bg-gray-50">{total}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="py-2 px-2 text-gray-800">Total</td>
                      {['Jan', 'Feb', 'Mar', 'Apr'].map((month, idx) => {
                        const monthTotal = Object.keys(issuesByAccountAndType).reduce((sum, account) => {
                          return sum + Object.keys(issuesByAccountAndType[account]).reduce((issueSum, issueType) => {
                            return issueSum + issuesByAccountAndType[account][issueType][month];
                          }, 0);
                        }, 0);
                        return <td key={idx} className="text-center py-2 px-2 text-gray-800">{monthTotal}</td>;
                      })}
                      <td className="text-center py-2 px-2 text-gray-900 bg-gray-200">
                        {Object.keys(issuesByAccountAndType).reduce((totalSum, account) => {
                          return totalSum + ['Jan', 'Feb', 'Mar', 'Apr'].reduce((monthSum, month) => {
                            return monthSum + Object.keys(issuesByAccountAndType[account]).reduce((issueSum, issueType) => {
                              return issueSum + issuesByAccountAndType[account][issueType][month];
                            }, 0);
                          }, 0);
                        }, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Total Active Across Accounts Scorecard */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Active Candidates Across Accounts</h3>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-50 mr-3">
                  <div className="w-5 h-5 bg-green-600 rounded"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Total Active Candidates</div>
                  <div className="text-xs text-gray-500">Across {accountWiseHeadcount.length} accounts</div>
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-800">
                {accountWiseHeadcount.reduce((sum, account) => sum + account.active, 0)}
              </div>
            </div>

            <div className="px-4 pb-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{
                  width: `${Math.round((accountWiseHeadcount.reduce((sum, account) => sum + account.active, 0) /
                    accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)) * 100)}%`
                }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{Math.round((accountWiseHeadcount.reduce((sum, account) => sum + account.active, 0) /
                  accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)) * 100)}% of total headcount</span>
                <span>Total Headcount: {accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)}</span>
              </div>
            </div>
          </div>

          {/* Key Insights for Resource Management */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Key Insights</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 p-3 rounded-sm border-l-2 border-blue-600 mb-2 text-xs text-gray-700">
                Despite multiple contact attempts, 65 candidates (23%) have either requested not to be contacted or indicated they will reach out for any issues themselves. This suggests a need for improved engagement strategies with inactive candidates.
              </div>
            </div>
          </div>

          {/* Key Metrics Trend Analysis */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Key Metrics - Monthly Comparison</h3>

                <div className="flex items-center text-xs">
                  <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                    <button
                      className={`px-2 py-1 ${activeMetricsMonth === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveMetricsMonth('all')}
                    >All</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeMetricsMonth === 'jan' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveMetricsMonth('jan')}
                    >Jan</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeMetricsMonth === 'feb' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveMetricsMonth('feb')}
                    >Feb</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeMetricsMonth === 'mar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveMetricsMonth('mar')}
                    >Mar</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeMetricsMonth === 'apr' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveMetricsMonth('apr')}
                    >Apr</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 p-3 rounded-sm border-l-2 border-blue-600 mb-4 text-xs text-gray-700">
                Touch Base interactions show a decreasing trend from {keyMetricsData[0].touchBase} in January to {keyMetricsData[2].touchBase} in March,
                while No Response cases increased from {keyMetricsData[1].noResponse} in February to {keyMetricsData[2].noResponse} in March.
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getFilteredMetricsData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={{ stroke: '#D1D5DB' }} />
                    <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={{ stroke: '#D1D5DB' }} />
                    <Tooltip />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="touchBase" name="Touch Base" fill="#106EBE" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="noResponse" name="No Response" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="outOfVDart" name="Out of VDart" fill="#DC2626" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Account Engagement Metrics */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Account Engagement Metrics</h3>

                <div className="flex space-x-2 text-xs">
                  <button
                    className={`px-2 py-1 rounded-sm border ${showTopAccountsOnly ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-100" : "border-blue-600 bg-blue-600 text-white"}`}
                    onClick={() => setShowTopAccountsOnly(false)}
                  >All Accounts</button>
                  <button
                    className={`px-2 py-1 rounded-sm border ${!showTopAccountsOnly ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-100" : "border-blue-600 bg-blue-600 text-white"}`}
                    onClick={() => setShowTopAccountsOnly(true)}
                  >Top 5</button>
                </div>
              </div>
            </div>

            <div className="p-4">
              Month selector
              <div className="flex mb-4 mt-0">
                <div className="flex border border-gray-300 rounded-sm overflow-hidden text-xs">
                  <button
                    className={`px-2 py-1 ${activeAccountMonth === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveAccountMonth('all')}
                  >All</button>
                  <button
                    className={`px-2 py-1 border-l border-gray-300 ${activeAccountMonth === 'jan' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveAccountMonth('jan')}
                  >Jan</button>
                  <button
                    className={`px-2 py-1 border-l border-gray-300 ${activeAccountMonth === 'feb' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveAccountMonth('feb')}
                  >Feb</button>
                  <button
                    className={`px-2 py-1 border-l border-gray-300 ${activeAccountMonth === 'mar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveAccountMonth('mar')}
                  >Mar</button>
                  <button
                    className={`px-2 py-1 border-l border-gray-300 ${activeAccountMonth === 'apr' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveAccountMonth('apr')}
                  >Apr</button>
                </div>
              </div>

              {/* Account cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {getFilteredAccountData().slice(0, showTopAccountsOnly ? 5 : 3).map((account, idx) => {
                  const engagementPercentage = Math.round((account.active / account.value) * 100);

                  return (
                    <div key={idx} className="bg-white rounded-sm border border-gray-200 shadow-sm p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-700 text-sm">{account.name}</h4>
                        <span className="text-xs text-gray-500">{activeAccountMonth !== 'all' ? activeAccountMonth.toUpperCase() : 'ALL'}</span>
                      </div>

                      <div className="flex items-center mb-3">
                        <span className="text-xl font-semibold text-gray-900">{account.value}</span>
                        <span className="ml-2 text-xs text-gray-500">total headcount</span>
                      </div>

                      {/* Progress bar for active */}
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-600">Active</span>
                          <span className={engagementPercentage >= 75 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            {account.active} ({engagementPercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-1.5">
                          <div className={`${engagementPercentage >= 75 ? "bg-green-500" : "bg-red-500"} h-1.5 rounded-sm`}
                            style={{ width: `${engagementPercentage}%` }}></div>
                        </div>
                      </div>

                      {/* No Response metric */}
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-600">No Response</span>
                          <span className="text-orange-600 font-medium">{account.inactive}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-1.5">
                          <div className="bg-orange-500 h-1.5 rounded-sm"
                            style={{ width: `${(account.inactive / account.value) * 100}%` }}></div>
                        </div>
                      </div>

                      {/* Out of VDart metric */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-600">Out of VDart</span>
                          <span className="text-red-600 font-medium">{account.outOfVDart}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-sm"
                            style={{ width: `${(account.outOfVDart / account.value) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* See all button */}
              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center mx-auto">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View All Accounts
                </button>
              </div>
            </div>
          </div>

          {/* Account Headcount Analysis */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Account Headcount Analysis (Jan - Apr 2025)</h3>

                <div className="flex gap-2 text-xs">
                  <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                    <button
                      className={`px-2 py-1 ${activeStatusMonth === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveStatusMonth('all')}
                    >All</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeStatusMonth === 'jan' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveStatusMonth('jan')}
                    >Jan</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeStatusMonth === 'feb' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveStatusMonth('feb')}
                    >Feb</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeStatusMonth === 'mar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveStatusMonth('mar')}
                    >Mar</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeStatusMonth === 'apr' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveStatusMonth('apr')}
                    >Apr</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 p-3 rounded-sm border-l-2 border-blue-600 mb-4 text-xs text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tracking key metrics: <span className="font-medium text-gray-900 mx-1">Total headcount</span>,
                <span className="font-medium text-red-600 mx-1">Out of VDart candidates</span>, and
                <span className="font-medium text-green-600 mx-1">Redeployed candidates</span> across all accounts.
                {activeStatusMonth !== 'all' &&
                  <span className="ml-1">
                    Showing data for <span className="font-medium text-blue-600">{activeStatusMonth.toUpperCase()}</span>.
                  </span>
                }
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Headcount Comparison Chart */}
                <div className="bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Account Headcount Comparison</h4>

                  <div className="mb-3 p-2 bg-gray-50 rounded-sm border-l-2 border-blue-600 text-xs text-gray-700">
                    <span className="font-medium">Total Headcount: </span>
                    {accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)} candidates across all accounts
                  </div>

                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getFilteredAccountData()}
                        margin={{ top: 5, right: 20, left: 5, bottom: 40 }}
                        barSize={12}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: '#6B7280', fontSize: 9 }}
                          interval={0}
                          tickLine={{ stroke: '#D1D5DB' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis
                          tick={{ fill: '#6B7280', fontSize: 10 }}
                          tickLine={{ stroke: '#D1D5DB' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                        />
                        <Tooltip />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                        <Bar
                          dataKey="value"
                          name="Total Headcount"
                          fill="#106EBE"
                          radius={[2, 2, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Out of VDart and Redeployed Comparison */}
                <div className="bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Out of VDart vs Active Status</h4>

                  <div className="mb-3 p-2 bg-gray-50 rounded-sm border-l-2 border-red-500 text-xs text-gray-700">
                    <span className="font-medium text-red-600">Total Out of VDart: </span>
                    {accountWiseHeadcount.reduce((sum, account) => sum + account.outOfVDart, 0)} candidates (
                    {Math.round((accountWiseHeadcount.reduce((sum, account) => sum + account.outOfVDart, 0) /
                      accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)) * 100)}% of total headcount)
                  </div>

                  <div className="mb-3 p-2 bg-gray-50 rounded-sm border-l-2 border-green-600 text-xs text-gray-700">
                    <span className="font-medium text-green-600">Total Active: </span>
                    {accountWiseHeadcount.reduce((sum, account) => sum + account.active, 0)} candidates (
                    {Math.round((accountWiseHeadcount.reduce((sum, account) => sum + account.active, 0) /
                      accountWiseHeadcount.reduce((sum, account) => sum + account.value, 0)) * 100)}% of total headcount)
                  </div>

                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getFilteredAccountData()}
                        margin={{ top: 5, right: 20, left: 5, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: '#6B7280', fontSize: 9 }}
                          interval={0}
                          tickLine={{ stroke: '#D1D5DB' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis
                          tick={{ fill: '#6B7280', fontSize: 10 }}
                          tickLine={{ stroke: '#D1D5DB' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="outOfVDart"
                          stroke="#DC2626"
                          name="Out of VDart"
                          strokeWidth={2}
                          dot={{ r: 3, strokeWidth: 1 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="active"
                          stroke="#059669"
                          name="Active"
                          strokeWidth={2}
                          dot={{ r: 3, strokeWidth: 1 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issue Log Section */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 pt-4 pb-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Issue Log</h3>

                <div className="flex items-center text-xs">
                  <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                    <button
                      className={`px-2 py-1 ${activeIssueMonth === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveIssueMonth('all')}
                    >All</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeIssueMonth === 'Jan' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveIssueMonth('Jan')}
                    >Jan</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeIssueMonth === 'Feb' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveIssueMonth('Feb')}
                    >Feb</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeIssueMonth === 'Mar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveIssueMonth('Mar')}
                    >Mar</button>
                    <button
                      className={`px-2 py-1 border-l border-gray-300 ${activeIssueMonth === 'Apr' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveIssueMonth('Apr')}
                    >Apr</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 p-3 rounded-sm border-l-2 border-orange-500 mb-4 text-xs text-gray-700">
                {activeIssueMonth === 'all' ? (
                  <>
                    Total of <span className="font-medium text-gray-900">{totalIssues} issues</span> logged during Q1 2025.
                    Pay Raise ({Math.round((issueTypeData.find(i => i.name === 'Pay Raise')?.value || 0) / totalIssues * 100)}%) and
                    Payroll ({Math.round((issueTypeData.find(i => i.name === 'Payroll')?.value || 0) / totalIssues * 100)}%) issues make up the majority.
                  </>
                ) : (
                  <>
                    In <span className="font-medium text-blue-600">{activeIssueMonth}</span>, there were
                    <span className="font-medium text-gray-900"> {totalIssues} issues</span> logged across all accounts.
                    {totalIssues > 0 ? (
                      <>
                        <span className="font-medium text-gray-900"> {issueTypeData.sort((a, b) => b.value - a.value)[0]?.name}</span> was the most common issue type
                        ({Math.round((issueTypeData.sort((a, b) => b.value - a.value)[0]?.value || 0) / totalIssues * 100)}%).
                      </>
                    ) : (
                      " No major issues were reported."
                    )}
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Total Issues Pie Chart */}
                <div className="bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">
                    {activeIssueMonth === 'all' ?
                      "Total Issues by Category" :
                      `Issues by Category - ${activeIssueMonth} 2025`}
                  </h4>
                  <div className="h-60">
                    {issueTypeData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={issueTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {issueTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No issues reported for {activeIssueMonth === 'all' ? 'the selected period' : activeIssueMonth}
                      </div>
                    )}
                  </div>
                </div>

                {/* Account-wise Issues */}
                <div className="bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">
                    {activeIssueMonth === 'all' ?
                      "Issues by Account (Top 5)" :
                      `Issues by Account - ${activeIssueMonth} 2025`}
                  </h4>
                  <div className="h-60">
                    {accountIssueData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={accountIssueData.slice(0, 5)}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          barSize={12}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 10 }} />
                          <YAxis type="category" dataKey="name" width={70} tick={{ fill: '#6B7280', fontSize: 10 }} />
                          <Tooltip />
                          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                          {issueTypeData.find(i => i.name === 'Benefits') &&
                            <Bar dataKey="Benefits" name="Benefits" stackId="a" fill="#0088FE">
                              <LabelList dataKey="Benefits" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Change Of Employer') &&
                            <Bar dataKey="ChangeOfEmployer" name="Change Of Employer" stackId="a" fill="#00C49F">
                              <LabelList dataKey="ChangeOfEmployer" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Pay Raise') &&
                            <Bar dataKey="PayRaise" name="Pay Raise" stackId="a" fill="#FFBB28">
                              <LabelList dataKey="PayRaise" position="inside" fill="#333" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Payroll') &&
                            <Bar dataKey="Payroll" name="Payroll" stackId="a" fill="#FF8042">
                              <LabelList dataKey="Payroll" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Time Sheet') &&
                            <Bar dataKey="TimeSheet" name="Time Sheet" stackId="a" fill="#8884d8">
                              <LabelList dataKey="TimeSheet" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Pay Cut') &&
                            <Bar dataKey="PayCut" name="Pay Cut" stackId="a" fill="#82ca9d">
                              <LabelList dataKey="PayCut" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Project Location Change') &&
                            <Bar dataKey="ProjectLocationChange" name="Project Location Change" stackId="a" fill="#FF6B6B">
                              <LabelList dataKey="ProjectLocationChange" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'IT and Hardware Issue') &&
                            <Bar dataKey="ITandHardwareIssue" name="IT and Hardware Issue" stackId="a" fill="#4ECDC4">
                              <LabelList dataKey="ITandHardwareIssue" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Contracts') &&
                            <Bar dataKey="Contracts" name="Contracts" stackId="a" fill="#45B7D1">
                              <LabelList dataKey="Contracts" position="inside" fill="#fff" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                          {issueTypeData.find(i => i.name === 'Allowance') &&
                            <Bar dataKey="Allowance" name="Allowance" stackId="a" fill="#96CEB4">
                              <LabelList dataKey="Allowance" position="inside" fill="#333" fontSize={10} formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          }
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No issues reported for {activeIssueMonth === 'all' ? 'the selected period' : activeIssueMonth}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REDEPLOYMENT CONTENT */}
      {activeTab === 'rd' && (
        <div className="p-4 bg-white font-sans">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Redeployment Dashboard</h1>
              <p className="text-xs text-gray-600">Candidate Pipeline & Bench Utilization</p>
            </div>
            <div className="flex space-x-1">
              {availableMonths.map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors`}
                  style={{
                    backgroundColor: selectedMonth === month ? COLORS.blue : '#F2F2F2',
                    color: selectedMonth === month ? 'white' : '#333',
                    border: 'none',
                    boxShadow: selectedMonth === month ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Bench Overview */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
              <GaugeChart
                value={currentData.totalBenchCandidates}
                max={1000}
                color={COLORS.blue}
                label="Total Bench Candidates"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
              <GaugeChart
                value={currentData.activeBenchCandidates}
                max={currentData.totalBenchCandidates}
                color={COLORS.green}
                label="Active Candidates"
                percentage={Math.round((currentData.activeBenchCandidates / currentData.totalBenchCandidates) * 100)}
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
              <GaugeChart
                value={currentData.passiveBenchCandidates}
                max={currentData.totalBenchCandidates}
                color={COLORS.red}
                label="Passive Candidates"
                percentage={Math.round((currentData.passiveBenchCandidates / currentData.totalBenchCandidates) * 100)}
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
              <GaugeChart
                value={currentData.totalRedeployed}
                max={50}
                color={COLORS.purple}
                label="Total Redeployed"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
              <GaugeChart
                value={currentData.totalReferrals}
                max={100}
                color={COLORS.orange}
                label="Total Referrals"
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
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Count" radius={[2, 2, 0, 0]}>
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
                <div className="text-xs text-center text-gray-600">Submission → Interview Rate</div>
                <div className="flex justify-center items-center h-16">
                  <div className="text-3xl font-semibold" style={{ color: COLORS.blue }}>{submissionToInterviewRate}%</div>
                </div>
                <div className="text-xs text-center text-gray-500">
                  {currentData.interviewsScheduled} of {currentData.clientSubmission}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                <div className="text-xs text-center text-gray-600">Interview → Closure Rate</div>
                <div className="flex justify-center items-center h-16">
                  <div className="text-3xl font-semibold" style={{ color: COLORS.green }}>{interviewToClosureRate}%</div>
                </div>
                <div className="text-xs text-center text-gray-500">
                  {currentData.candidatesClosure} of {currentData.interviewsScheduled}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                <div className="text-xs text-center text-gray-600">Closure → Start Rate</div>
                <div className="flex justify-center items-center h-16">
                  <div className="text-3xl font-semibold" style={{ color: COLORS.purple }}>{closureToStartRate}%</div>
                </div>
                <div className="text-xs text-center text-gray-500">
                  {currentData.candidatesStarts} of {currentData.candidatesClosure || 1}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3">
                <div className="text-xs text-center text-gray-600">Overall Conversion Rate</div>
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
                <div className="bg-gray-100 p-2 rounded-sm flex flex-col items-center justify-center">
                  <div className="text-xs mb-1 text-gray-600">New Candidates</div>
                  <div className="text-xl font-semibold text-blue-600">{currentData.newCandidatesAdded}</div>
                </div>
                <div className="bg-gray-100 p-2 rounded-sm flex flex-col items-center justify-center">
                  <div className="text-xs mb-1 text-gray-600">Project Ends</div>
                  <div className="text-xl font-semibold text-red-500">{currentData.candidatesProjectEnd}</div>
                </div>
                <div className="bg-gray-100 p-2 rounded-sm flex flex-col items-center justify-center">
                  <div className="text-xs mb-1 text-gray-600">Accounts Submitted</div>
                  <div className="text-xl font-semibold text-purple-600">{currentData.accountsSubmitted}</div>
                </div>
                <div className="bg-gray-100 p-2 rounded-sm flex flex-col items-center justify-center">
                  <div className="text-xs mb-1 text-gray-600">Total Redeployed</div>
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
      )}

      {/* CUSTOMER SUCCESS MANAGEMENT CONTENT */}
      {activeTab === 'csm' && (
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-gray-500 text-sm">Customer Success Management dashboard will be available soon.</p>
        </div>
      )}

      <div className="mt-4 text-center text-gray-400 text-xs">
        <p>© 2025 VDart CX Team | Executive Dashboard v1.0</p>
      </div>
    </div>
  );
};

export default CompleteCXDashboard;