import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, AreaChart, Area, ComposedChart } from 'recharts';
import accenturelogo from './assets/logos/accenture.jpg';
import RedeploymentDashboard from './RD';
import CSMDashboard from './CSM';
//import logo
import apexonlogo from './assets/logos/apexon.jpg';
import avanadelogo from './assets/logos/avanade.png';
import cognizantlogo from './assets/logos/cognizant.jpg';
import hcllogo from './assets/logos/hcl.png';
import hexawarelogo from './assets/logos/hexaware.png';
import ltimindtreelogo from './assets/logos/ltimindtree.png';
import nttdatalogo from './assets/logos/nttdata.png';
import techmlogo from './assets/logos/techm.png';
import rhtlogo from './assets/logos/rht.png';




const CompleteCXDashboard = () => {
  // Main navigation state
  const [activeTab, setActiveTab] = useState('rm');

  // Resource Management state variables
  const [activeMetricsMonth, setActiveMetricsMonth] = useState('all');
  const [activeAccountMonth, setActiveAccountMonth] = useState('all');
  const [activeStatusMonth, setActiveStatusMonth] = useState('all');
  const [activeIssueMonth, setActiveIssueMonth] = useState('all');
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  // Redeployment state variables
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Candidate summary data
  const candidateSummaryData = {
    totalCandidates: 754,
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
    { name: 'Accenture', value: 59, active: 53, outOfVDart: 6 },
    { name: 'Apexon', value: 18, active: 16, outOfVDart: 2 },
    { name: 'Avanade', value: 46, active: 44, outOfVDart: 2 },
    { name: 'Cognizant', value: 61, active: 57, outOfVDart: 4 },
    { name: 'HCL', value: 207, active: 193, outOfVDart: 14 },
    { name: 'Hexaware', value: 27, active: 25, outOfVDart: 2 },
    { name: 'LTI Mindtree', value: 100, active: 97, outOfVDart: 3 },
    { name: 'NTT Data', value: 106, active: 101, outOfVDart: 5 },
    { name: 'RHT', value: 54, active: 50, outOfVDart: 4 },
    { name: 'TechM', value: 69, active: 66, outOfVDart: 3 },
    { name: 'UST Global', value: 7, active: 7, outOfVDart: 0 }
  ];
  // Monthly metrics data
  const keyMetricsData = [
    { month: 'Jan', touchBase: 509, noResponse: 176, outOfVDart: 33 },
    { month: 'Feb', touchBase: 514, noResponse: 106, outOfVDart: 37 },
    { month: 'Mar', touchBase: 367, noResponse: 155, outOfVDart: 37 },
    { month: 'Apr', touchBase: 352, noResponse: 165, outOfVDart: 42 }
  ];

  // Issue data by account and type
  // Updated issuesByAccountAndType data structure with May data
  const issuesByAccountAndType = {
    'Accenture': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 1, Feb: 0, Mar: 1, Apr: 0, May: 1 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 2, May: 1 },
      'Time Sheet': { Jan: 1, Feb: 1, Mar: 2, Apr: 1, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 1 }
    },
    'Apexon': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 1, May: 1 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'Avanade': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 1 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 1, Apr: 0, May: 0 },
      'Contracts': { Jan: 1, Feb: 0, Mar: 1, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Payroll': { Jan: 0, Feb: 1, Mar: 2, Apr: 2, May: 1 },
      'Time Sheet': { Jan: 1, Feb: 1, Mar: 2, Apr: 1, May: 1 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'Cognizant': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 2 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 3, Apr: 3, May: 3 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 1, Apr: 0, May: 1 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'HCL': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 1 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 1 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 2 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 3 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 2 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 6 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 3 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'Hexaware': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 1, Apr: 1, May: 1 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'LTI Mindtree': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 1 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Time Sheet': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'NTT Data': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 1, May: 1 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 1, Mar: 1, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 1, May: 1 },
      'Pay Raise': { Jan: 0, Feb: 1, Mar: 2, Apr: 0, May: 0 },
      'Payroll': { Jan: 1, Feb: 1, Mar: 4, Apr: 2, May: 0 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'RHT': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 1, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 3 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 0, Mar: 1, Apr: 0, May: 0 },
      'Payroll': { Jan: 0, Feb: 0, Mar: 4, Apr: 2, May: 0 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0, May: 0 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
    },
    'TechM': {
      'Address Change': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Benefits': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Change Of Employer': { Jan: 0, Feb: 0, Mar: 1, Apr: 2, May: 2 },
      'Contracts': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Incorrect Number': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 },
      'Pay Cut': { Jan: 0, Feb: 0, Mar: 0, Apr: 1, May: 0 },
      'Pay Raise': { Jan: 0, Feb: 1, Mar: 1, Apr: 0, May: 0 },
      'Payroll': { Jan: 1, Feb: 1, Mar: 5, Apr: 2, May: 4 },
      'Time Sheet': { Jan: 0, Feb: 1, Mar: 1, Apr: 0, May: 1 },
      'Vacation': { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0 }
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
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const issueTypes = ['Address Change', 'Benefits', 'Change Of Employer', 'Contracts', 'Incorrect Number',
      'Pay Cut', 'Pay Raise', 'Payroll', 'Time Sheet', 'Vacation'];
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
    }).filter(item => item.value > 0);


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
    }).filter(account => account.total > 0)
      .sort((a, b) => b.total - a.total);

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

  // Custom label for bar charts
  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#333"
        textAnchor="middle"
        fontSize="10"
        fontWeight="500"
      >
        {value}
      </text>
    );
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
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Header - Full Width */}
      <div className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CX Functions Executive Dashboard</h1>
              <p className="text-gray-600 text-lg mt-1">Performance Overview - 2025</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-bold shadow-sm transition-all duration-200">
                Export
              </button>
              <button className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold shadow-sm transition-all duration-200">
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Function tabs - Full Width */}
      <div className="bg-white border-b border-gray-200 w-full shadow-sm">
        <div className="px-8">
          <div className="flex space-x-1">
            <button
              className={`relative py-4 px-6 text-sm font-semibold rounded-t-lg transition-all duration-300 ${activeTab === 'rm'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200 border-b-0'
                }`}
              onClick={() => setActiveTab('rm')}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Resource Management</span>
              </div>
              {activeTab === 'rm' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-sm"></div>
              )}
            </button>

            <button
              className={`relative py-4 px-6 text-sm font-semibold rounded-t-lg transition-all duration-300 ${activeTab === 'rd'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200 border-b-0'
                }`}
              onClick={() => setActiveTab('rd')}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>Redeployment</span>
              </div>
              {activeTab === 'rd' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-sm"></div>
              )}
            </button>

            <button
              className={`relative py-4 px-6 text-sm font-semibold rounded-t-lg transition-all duration-300 ${activeTab === 'csm'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200 border-b-0'
                }`}
              onClick={() => setActiveTab('csm')}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Customer Success Management</span>
              </div>
              {activeTab === 'csm' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-sm"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RESOURCE MANAGEMENT CONTENT */}
      {activeTab === 'rm' && (
        <div className="w-full">
          {/* Summary cards - Full Width */}
          <div className="px-2 py-4">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg text-gray-500 font-bold">Total Candidates</div>
                    <div className="text-4xl font-bold text-gray-800 mt-2">{candidateSummaryData.totalCandidates}</div>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg text-gray-500 font-bold">Active Candidates</div>
                    <div className="text-4xl font-bold text-gray-800 mt-2">{candidateSummaryData.activeCount}</div>
                  </div>
                  <div className="p-3 rounded-full bg-green-50">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${candidateSummaryData.activePercentage}%` }}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-bold">{candidateSummaryData.activePercentage}%</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg text-gray-500 font-bold">Inactive Candidates</div>
                    <div className="text-4xl font-bold text-gray-800 mt-2">{candidateSummaryData.inactiveCount}</div>
                  </div>
                  <div className="p-3 rounded-full bg-red-50">
                    <div className="w-6 h-6 bg-red-600 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${candidateSummaryData.inactivePercentage}%` }}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-bold">{candidateSummaryData.inactivePercentage}%</span>
                </div>
                <div className="mt-2 flex flex-wrap text-sm text-gray-500">
                  <span className="mr-3 font-bold">• Will reach out: {candidateSummaryData.inactiveReasons.willReachOut}</span>
                  <span className="mr-3 font-bold">• Do not contact: {candidateSummaryData.inactiveReasons.doNotContact}</span>
                  <span className="font-bold">• Other: {candidateSummaryData.inactiveReasons.other}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Key Insights for Resource Management
                    <div className="px-8 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 pt-6 pb-3 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-900">Key Insights</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
                                    <span className="font-bold">Key Finding:</span> Despite multiple contact attempts, 65 candidates (23%) have either requested not to be contacted or indicated they will reach out for any issues themselves. This suggests a need for improved engagement strategies with inactive candidates.
                                </div>
                            </div>
                        </div>
                    </div> */}

          {/* Key Metrics Trend Analysis */}
          <div className="px-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 pt-6 pb-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Key Metrics - Monthly Comparison</h3>

                  <div className="flex items-center">
                    <div className="flex space-x-2">
                      {['all', 'jan', 'feb', 'mar', 'apr', 'may'].map(month => (
                        <button
                          key={month}
                          onClick={() => setActiveMetricsMonth(month)}
                          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${activeMetricsMonth === month
                            ? 'text-gray-100'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                            }`}
                          style={activeMetricsMonth === month ? {
                            background: 'linear-gradient(90deg, #4F4FFF 0%)',
                            border: '1px solid #4F4FFF'
                          } : {
                            border: '1px solid #E5E7EB'
                          }}
                        >
                          {month === 'all' ? 'All' : month.charAt(0).toUpperCase() + month.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6 text-sm text-blue-800">
                  <span className="font-bold">Trend Analysis:</span> Touch Base interactions show a decreasing trend from {keyMetricsData[0].touchBase} in January to {keyMetricsData[2].touchBase} in March,
                  while No Response cases increased from {keyMetricsData[1].noResponse} in February to {keyMetricsData[2].noResponse} in March.
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getFilteredMetricsData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: '#6B7280', fontWeight: 'bold' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={{ stroke: '#D1D5DB' }} />
                      <YAxis tick={{ fill: '#6B7280', fontWeight: 'bold' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={{ stroke: '#D1D5DB' }} />
                      <Tooltip />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                      <Bar dataKey="touchBase" name="Touch Base" fill="#106EBE" radius={[2, 2, 0, 0]}>
                        <LabelList content={renderCustomLabel} />
                      </Bar>
                      <Bar dataKey="noResponse" name="No Response" fill="#F59E0B" radius={[2, 2, 0, 0]}>
                        <LabelList content={renderCustomLabel} />
                      </Bar>
                      <Bar dataKey="outOfVDart" name="Out of VDart" fill="#DC2626" radius={[2, 2, 0, 0]}>
                        <LabelList content={renderCustomLabel} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Account Engagement Metrics Section with Company Logos */}
          <div className="px-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Account Engagement Metrics</h3>

                {/* <div className="flex space-x-3">
                  <div className="flex bg-gray-100 rounded-xl p-2 shadow-inner mr-4">
                    {['all', 'jan', 'feb', 'mar', 'apr','may'].map((month) => (
                      <button
                        key={month}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${activeAccountMonth === month
                          ? 'bg-blue-600 text-black shadow-lg'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                          }`}
                        onClick={() => setActiveAccountMonth(month)}
                      >
                        {month === 'all' ? 'All' : month.charAt(0).toUpperCase() + month.slice(1)}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Account cards with logos */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {getFilteredAccountData().slice(0, showAllAccounts ? 10 : 4).map((account, idx) => {
                  const engagementPercentage = Math.round((account.active / account.value) * 100);

                  // Logo path mapping
                  const getLogoPath = (companyName) => {
                    const logoMap = {
                      'Accenture': accenturelogo,
                      'Apexon': apexonlogo,
                      'Avanade': avanadelogo,
                      'Cognizant': cognizantlogo,
                      'HCL': hcllogo,
                      'Hexaware': hexawarelogo,
                      'LTI Mindtree': ltimindtreelogo,
                      'NTT Data': nttdatalogo,
                      'RHT': rhtlogo,
                      'TechM': techmlogo,
                      'UST Global': '/logos/ust-global.png'
                    };
                    return logoMap[companyName];
                  };

                  // Fallback initials
                  const getCompanyInitials = (companyName) => {
                    return companyName.split(' ').map(word => word[0]).join('').toUpperCase();
                  };

                  return (
                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center flex-1">
                          {/* Company Logo */}
                          <div className="w-12 h-12 mr-3 flex-shrink-0 relative">
                            <img
                              src={getLogoPath(account.name)}
                              alt={`${account.name} logo`}
                              className="w-full h-full object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100"
                              onError={(e) => {
                                // Hide image and show initials fallback
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                            {/* Fallback initials - hidden by default */}
                            <div
                              className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm absolute top-0 left-0"
                              style={{ display: 'none' }}
                            >
                              {getCompanyInitials(account.name)}
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-800 text-lg truncate">{account.name}</h4>
                          </div>
                        </div>

                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                          {activeAccountMonth !== 'all' ? activeAccountMonth.toUpperCase() : 'ALL'}
                        </span>
                      </div>

                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-gray-900">{account.value}</span>
                        <span className="ml-2 text-sm text-gray-600 font-semibold">total headcount</span>
                      </div>

                      {/* Progress bar for active */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-gray-700">Active</span>
                          <span className="font-bold text-green-600">
                            {account.active} ({engagementPercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                          <div className="bg-green-500 h-2 rounded-full shadow-sm transition-all duration-300"
                            style={{ width: `${engagementPercentage}%` }}></div>
                        </div>
                      </div>

                      {/* No Response metric */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-gray-700">No Response</span>
                          <span className="text-orange-600 font-bold">{account.inactive}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                          <div className="bg-orange-500 h-2 rounded-full shadow-sm transition-all duration-300"
                            style={{ width: `${(account.inactive / account.value) * 100}%` }}></div>
                        </div>
                      </div>

                      {/* Out of VDart metric */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-gray-700">Out of VDart</span>
                          <span className="text-red-600 font-bold">{account.outOfVDart}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                          <div className="bg-red-500 h-2 rounded-full shadow-sm transition-all duration-300"
                            style={{ width: `${(account.outOfVDart / account.value) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View all button */}
              <div className="text-center">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
                  onClick={() => setShowAllAccounts(!showAllAccounts)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllAccounts ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                  {showAllAccounts ? 'Show Less' : 'View All Accounts'}
                </button>
              </div>
            </div>
          </div>

          {/* Account Headcount Analysis */}
          <div className="px-2 mb-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Account Headcount Analysis (Jan - May 2025)</h3>
                  {/* <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <button
                      className={`px-3 py-1.5 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('all')}
                    >All</button>
                    <button
                      className={`px-3 py-1.5 border-l border-gray-300 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'jan' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('jan')}
                    >Jan</button>
                    <button
                      className={`px-3 py-1.5 border-l border-gray-300 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'feb' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('feb')}
                    >Feb</button>
                    <button
                      className={`px-3 py-1.5 border-l border-gray-300 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'mar' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('mar')}
                    >Mar</button>
                    <button
                      className={`px-3 py-1.5 border-l border-gray-300 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'apr' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('apr')}
                    >Apr</button>
                    <button
                      className={`px-3 py-1.5 border-l border-gray-300 text-xs font-bold transition-all duration-200 ${activeStatusMonth === 'may' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setActiveStatusMonth('may')}
                    >May</button>
                  </div> */}
                </div>
              </div>

              <div className="p-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4 text-xs text-blue-800 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-bold">Analysis:</span> Company-wise distribution showing
                  <span className="font-bold text-green-600 mx-1">Active candidates</span> and
                  <span className="font-bold text-red-600 mx-1">Out of VDart candidates</span> across all accounts.
                  {activeStatusMonth !== 'all' &&
                    <span className="ml-1">
                      Data for <span className="font-bold text-blue-600">{activeStatusMonth.toUpperCase()}</span>.
                    </span>
                  }
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-6 gap-3 mb-4">
                  <div className="col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 text-center shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {getFilteredAccountData().reduce((sum, account) => sum + account.value, 0)}
                    </div>
                    <div className="text-xs text-blue-700 font-bold uppercase">Total Candidates</div>
                    <div className="text-xs text-blue-600 mt-1">Across All Accounts</div>
                  </div>
                  <div className="col-span-2 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 text-center shadow-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {getFilteredAccountData().reduce((sum, account) => sum + account.active, 0)}
                    </div>
                    <div className="text-xs text-green-700 font-bold uppercase">Active Candidates</div>
                    <div className="text-xs text-green-600 mt-1">
                      {Math.round((getFilteredAccountData().reduce((sum, account) => sum + account.active, 0) /
                        getFilteredAccountData().reduce((sum, account) => sum + account.value, 0)) * 100)}% of Total
                    </div>
                  </div>
                  <div className="col-span-2 bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 text-center shadow-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {getFilteredAccountData().reduce((sum, account) => sum + account.outOfVDart, 0)}
                    </div>
                    <div className="text-xs text-red-700 font-bold uppercase">Out of VDart</div>
                    <div className="text-xs text-red-600 mt-1">
                      {Math.round((getFilteredAccountData().reduce((sum, account) => sum + account.outOfVDart, 0) /
                        getFilteredAccountData().reduce((sum, account) => sum + account.value, 0)) * 100)}% of Total
                    </div>
                  </div>
                </div>

                {/* Enhanced Pie Charts with Full Width */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-5 gap-4 p-4">
                    {/* Active Candidates Chart - Takes 3 columns */}
                    <div className="col-span-3 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-lg">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <h5 className="font-bold text-green-800 text-sm">Active Headcount</h5>
                      </div>

                      <div className="flex flex-col">
                        {/* Chart */}
                        <div className="h-72 mb-3">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <defs>
                                <filter id="shadow1" x="-50%" y="-50%" width="200%" height="200%">
                                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020" />
                                </filter>
                              </defs>
                              <Pie
                                data={getFilteredAccountData()
                                  .filter(account => account.active > 0)
                                  .sort((a, b) => b.active - a.active)
                                  .map((account, index) => ({
                                    name: account.name,
                                    value: account.active,
                                    fill: COLORS.chartColors[index % COLORS.chartColors.length],
                                    percentage: Math.round((account.active / getFilteredAccountData().reduce((sum, acc) => sum + acc.active, 0)) * 100)
                                  }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                innerRadius={40}
                                dataKey="value"
                                label={({ name, percentage }) => `${name}\n${percentage}%`}
                                labelLine={true}
                                style={{ filter: "url(#shadow1)" }}
                              >
                                {getFilteredAccountData()
                                  .filter(account => account.active > 0)
                                  .map((entry, index) => (
                                    <Cell
                                      key={`cell-active-${index}`}
                                      fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                                      stroke="#ffffff"
                                      strokeWidth={2}
                                    />
                                  ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [`${value} candidates (${Math.round((value / getFilteredAccountData().reduce((sum, acc) => sum + acc.active, 0)) * 100)}%)`, name]}
                                contentStyle={{
                                  backgroundColor: '#ffffff',
                                  border: '2px solid #10b981',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                  fontSize: '11px',
                                  fontWeight: 'bold'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Legend - Below chart */}
                        <div className="grid grid-cols-3 gap-1">
                          {getFilteredAccountData()
                            .filter(account => account.active > 0)
                            .sort((a, b) => b.active - a.active)
                            .map((account, index) => (
                              <div key={`active-legend-${index}`} className="flex items-center justify-between text-xs bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <div
                                    className="w-3 h-3 rounded-full mr-2 border border-white"
                                    style={{ backgroundColor: COLORS.chartColors[index % COLORS.chartColors.length] }}
                                  ></div>
                                  <span className="font-medium text-gray-700 whitespace-nowrap">{account.name}</span>
                                </div>
                                <span className="font-bold text-green-600">{account.active}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Out of VDart Chart - Takes 2 columns */}
                    <div className="col-span-2 bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 shadow-lg">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <h5 className="font-bold text-red-800 text-sm">Out of VDart </h5>
                      </div>

                      <div className="flex flex-col">
                        {/* Chart */}
                        <div className="h-72 mb-3">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <defs>
                                <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
                                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020" />
                                </filter>
                              </defs>
                              <Pie
                                data={getFilteredAccountData()
                                  .sort((a, b) => b.outOfVDart - a.outOfVDart)
                                  .map((account, index) => ({
                                    name: account.name,
                                    value: account.outOfVDart,
                                    fill: COLORS.chartColors[index % COLORS.chartColors.length],
                                    percentage: Math.round((account.outOfVDart / getFilteredAccountData().reduce((sum, acc) => sum + acc.outOfVDart, 0)) * 100)
                                  }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={35}
                                dataKey="value"
                                label={({ name, percentage, value }) => value > 0 ? `${name}\n${percentage}%` : ''}
                                labelLine={true}
                                style={{ filter: "url(#shadow2)" }}
                              >
                                {getFilteredAccountData().map((entry, index) => (
                                  <Cell
                                    key={`cell-out-${index}`}
                                    fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [`${value} candidates (${Math.round((value / getFilteredAccountData().reduce((sum, acc) => sum + acc.outOfVDart, 0)) * 100)}%)`, name]}
                                contentStyle={{
                                  backgroundColor: '#ffffff',
                                  border: '2px solid #ef4444',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                  fontSize: '11px',
                                  fontWeight: 'bold'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Legend - Below chart */}
                        <div className="grid grid-cols-2 gap-1">
                          {getFilteredAccountData()
                            .filter(account => account.outOfVDart > 0)
                            .sort((a, b) => b.outOfVDart - a.outOfVDart)
                            .map((account, index) => (
                              <div key={`out-legend-${index}`} className="flex items-center justify-between text-xs bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <div
                                    className="w-3 h-3 rounded-full mr-2 border border-white"
                                    style={{ backgroundColor: COLORS.chartColors[index % COLORS.chartColors.length] }}
                                  ></div>
                                  <span className="font-medium text-gray-700 whitespace-nowrap">{account.name}</span>
                                </div>
                                <span className="font-bold text-red-600">{account.outOfVDart}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Issue Log Section */}
          <div className="px-2 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Issue Log</h3>

                  <div className="flex items-center">
                    <div className="flex space-x-2">
                      {['all', 'Jan', 'Feb', 'Mar', 'Apr', 'May'].map(month => (
                        <button
                          key={month}
                          onClick={() => setActiveIssueMonth(month)}
                          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${activeIssueMonth === month
                            ? 'text-gray-100'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                            }`}
                          style={activeIssueMonth === month ? {
                            background: 'linear-gradient(90deg, #4F4FFF 0%)',
                            border: '1px solid #4F4FFF'
                          } : {
                            border: '1px solid #E5E7EB'
                          }}
                        >
                          {month === 'all' ? 'All' : month}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4 text-xs text-orange-800">
                  {activeIssueMonth === 'all' ? (
                    <>
                      Total of <span className="font-medium text-gray-900">{totalIssues} issues</span> logged during Q1 2025.
                      Payroll ({Math.round((issueTypeData.find(i => i.name === 'Payroll')?.value || 0) / totalIssues * 100)}%) and
                      Pay Raise ({Math.round((issueTypeData.find(i => i.name === 'Pay Raise')?.value || 0) / totalIssues * 100)}%) issues make up the majority.
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

                <div className="grid grid-cols-5 gap-4">
                  {/* Issues by Category - Takes 3 columns */}
                  <div className="col-span-3 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-lg">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <h5 className="font-bold text-purple-800 text-sm">
                        {activeIssueMonth === 'all' ?
                          "Issues by Category (All Months)" :
                          `Issues by Category - ${activeIssueMonth} 2025`}
                      </h5>
                    </div>

                    <div className="flex flex-col">
                      {/* Chart */}
                      <div className="h-72 mb-3">
                        {issueTypeData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <defs>
                                <filter id="shadowIssue1" x="-50%" y="-50%" width="200%" height="200%">
                                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020" />
                                </filter>
                              </defs>
                              <Pie
                                data={issueTypeData.sort((a, b) => b.value - a.value)}
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                innerRadius={40}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value, percent }) => value > 0 ? `${name}\n${(percent * 100).toFixed(0)}%` : ''}
                                labelLine={true}
                                style={{ filter: "url(#shadowIssue1)" }}
                              >
                                {issueTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS.chartColors[index % COLORS.chartColors.length]} stroke="#ffffff" strokeWidth={2} />
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

                      {/* Legend - Below chart */}
                      <div className="grid grid-cols-2 gap-1">
                        {issueTypeData.sort((a, b) => b.value - a.value).map((issue, index) => (
                          <div key={`issue-legend-${index}`} className="flex items-center justify-between text-xs bg-white p-2 rounded border">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2 border border-white"
                                style={{ backgroundColor: COLORS.chartColors[index % COLORS.chartColors.length] }}
                              ></div>
                              <span className="font-medium text-gray-700 whitespace-nowrap">{issue.name}</span>
                            </div>
                            <span className="font-bold text-purple-600">{issue.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Company-wise Issues Matrix - Takes 2 columns */}
                  <div className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-100 p-2 rounded-xl border border-teal-200 shadow-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                      <h5 className="font-bold text-teal-800 text-sm">Issues by Company</h5>
                    </div>

                    <div className="h-96">
                      {accountIssueData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={accountIssueData}
                            margin={{ top: 5, right: 5, left: 5, bottom: 50 }}
                            barSize={50}
                          >
                            <CartesianGrid strokeDasharray="2 2" stroke="#D1D5DB" opacity={0.5} />
                            <XAxis
                              dataKey="name"
                              angle={-35}
                              textAnchor="end"
                              height={50}
                              tick={{ fill: '#374151', fontSize: 9, fontWeight: 'bold' }}
                              interval={0}
                              axisLine={{ stroke: '#9CA3AF' }}
                              tickLine={{ stroke: '#9CA3AF' }}
                            />
                            <YAxis
                              tick={{ fill: '#374151', fontSize: 10, fontWeight: 'bold' }}
                              width={25}
                              axisLine={{ stroke: '#9CA3AF' }}
                              tickLine={{ stroke: '#9CA3AF' }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '2px solid #14b8a6',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                              }}
                            />

                            {/* All 10 Issue Categories - Field Names Match Image Exactly */}
                            <Bar dataKey="AddressChange" name="Address Change" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="AddressChange" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="Benefits" name="Benefits" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="Benefits" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="ChangeOfEmployer" name="Change Of Employer" stackId="a" fill="#8B5CF6" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="ChangeOfEmployer" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="Contracts" name="Contracts" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="Contracts" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="IncorrectNumber" name="Incorrect Number" stackId="a" fill="#EC4899" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="IncorrectNumber" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="PayCut" name="Pay Cut" stackId="a" fill="#06B6D4" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="PayCut" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="PayRaise" name="Pay Raise" stackId="a" fill="#84CC16" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="PayRaise" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="Payroll" name="Payroll" stackId="a" fill="#F97316" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="Payroll" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="Timesheet" name="Time sheet" stackId="a" fill="#6366F1" radius={[0, 0, 0, 0]}>
                              <LabelList dataKey="Timesheet" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                            <Bar dataKey="Vacation" name="Vacation" stackId="a" fill="#14B8A6" radius={[2, 2, 0, 0]}>
                              <LabelList dataKey="Vacation" position="inside" fill="#fff" fontSize={9} fontWeight="bold" formatter={(value) => value > 0 ? value : ''} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                          No issues reported for {activeIssueMonth === 'all' ? 'the selected period' : activeIssueMonth}
                        </div>
                      )}
                    </div>

                    {/* Updated Legend with Exact Names from Image */}
                    <div className="grid grid-cols-5 gap-1 mt-2 text-xs">
                      <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded mr-1"></div>Address Change</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded mr-1"></div>Benefits</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded mr-1"></div>Change Employer</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-amber-500 rounded mr-1"></div>Contracts</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-pink-500 rounded mr-1"></div>Incorrect Number</div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 mt-1 text-xs">
                      <div className="flex items-center"><div className="w-2 h-2 bg-cyan-500 rounded mr-1"></div>Pay Cut</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-lime-500 rounded mr-1"></div>Pay Raise</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded mr-1"></div>Payroll</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-indigo-500 rounded mr-1"></div>Time sheet</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-teal-500 rounded mr-1"></div>Vacation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*footer*/}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center text-gray-600 text-xs">
              © 2025 Complete CX Dashboard. All rights reserved.
            </div>
          </div>
        </div>
      )}


      {/* REDEPLOYMENT CONTENT */}
      {activeTab === 'rd' && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <RedeploymentDashboard />
        </div>
      )}

      {/* CUSTOMER SUCCESS MANAGEMENT CONTENT */}
      {activeTab === 'csm' && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <CSMDashboard />
        </div>
      )}


    </div>
  );
}
export default CompleteCXDashboard;