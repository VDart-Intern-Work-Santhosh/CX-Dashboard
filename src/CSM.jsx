import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const CSMDashboard = () => {
  // Define colors first as they don't depend on state
  const COLORS = {
    primary: '#4F4FFF', // PowerBI blue
    secondary: '#00AD5B', // PowerBI green
    tertiary: '#FFA500', // PowerBI orange
    quaternary: '#8F00FF', // PowerBI purple
    danger: '#FF4F4F',   // PowerBI red
    warning: '#FFA500',  // PowerBI orange
    success: '#00AD5B',  // PowerBI green
    info: '#00B4D1',     // PowerBI cyan
    pink: '#FF007F',     // PowerBI pink
    teal: '#00BAAD',     // PowerBI teal
    charcoal: '#333333', // PowerBI dark gray
    lightGray: '#F2F2F2' // PowerBI light gray
  };

  // Monthly trend data - Based on actual data
  const monthlyTrendData = [
    { name: 'Jan', total: 64, positive: 60, neutral: 3, negative: 1, rating: 4.8 },
    { name: 'Feb', total: 33, positive: 28, neutral: 4, negative: 1, rating: 4.7 },
    { name: 'Mar', total: 44, positive: 32, neutral: 7, negative: 5, rating: 4.2 },
    { name: 'Apr', total: 27, positive: 25, neutral: 1, negative: 1, rating: 4.8 }
  ];

  // Define all data for all months and individual months based on actual data
  const dataByPeriod = {
    'All Months': {
      totalReviews: 168,
      positiveReviews: 145, // 5★ reviews
      neutralReviews: 15, // 4★ reviews
      slightlyNegativeReviews: 1, // 3★ reviews
      negativeReviews: 7, // 1★ + 2★ reviews (6 + 1)
      accountStatus: [
        { name: 'Google US', rating: 4.6, reviews: 120, fiveStarReviews: 115, fourStarReviews: 4, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 1, totalAccountReviews: 1075 },
        { name: 'Google Mannarpuram', rating: 4.5, reviews: 13, fiveStarReviews: 12, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 1, totalAccountReviews: 63 },
        { name: 'Google Raja Colony', rating: 4.0, reviews: 12, fiveStarReviews: 8, fourStarReviews: 2, threeStarReviews: 1, twoStarReviews: 0, oneStarReviews: 1, totalAccountReviews: 260 },
        { name: 'Glassdoor', rating: 4.0, reviews: 16, fiveStarReviews: 5, fourStarReviews: 7, threeStarReviews: 0, twoStarReviews: 1, oneStarReviews: 3, totalAccountReviews: 300 },
        { name: 'Ambition Box', rating: 4.5, reviews: 5, fiveStarReviews: 5, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0, totalAccountReviews: 500 },
        { name: 'Indeed', rating: 4.5, reviews: 2, fiveStarReviews: 0, fourStarReviews: 2, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0, totalAccountReviews: 140 }
      ],
      negativeReasons: [
        { name: 'Service Issues (Glassdoor)', value: 3, percentage: 42.9 },
        { name: 'Spam Reviews (Google US)', value: 2, percentage: 28.6 },
        { name: 'No App Updates (Mannarpuram)', value: 2, percentage: 28.6 }
      ]
    },
    'Jan': {
      totalReviews: 64,
      positiveReviews: 60,
      neutralReviews: 3,
      slightlyNegativeReviews: 0,
      negativeReviews: 1,
      accountStatus: [
        { name: 'Google US', rating: 4.9, reviews: 48, fiveStarReviews: 45, fourStarReviews: 3, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 },
        { name: 'Google Mannarpuram', rating: 4.5, reviews: 11, fiveStarReviews: 10, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 1 },
        { name: 'Ambition Box', rating: 5.0, reviews: 5, fiveStarReviews: 5, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 }
      ],
      negativeReasons: [
        { name: 'No App Updates', value: 1, percentage: 100 }
      ]
    },
    'Feb': {
      totalReviews: 33,
      positiveReviews: 28,
      neutralReviews: 4,
      slightlyNegativeReviews: 0,
      negativeReviews: 1,
      accountStatus: [
        { name: 'Google US', rating: 4.8, reviews: 27, fiveStarReviews: 25, fourStarReviews: 1, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 1 },
        { name: 'Google Raja Colony', rating: 4.8, reviews: 4, fiveStarReviews: 3, fourStarReviews: 1, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 },
        { name: 'Indeed', rating: 4.0, reviews: 2, fiveStarReviews: 0, fourStarReviews: 2, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 }
      ],
      negativeReasons: [
        { name: 'Spam Review', value: 1, percentage: 100 }
      ]
    },
    'Mar': {
      totalReviews: 44,
      positiveReviews: 32,
      neutralReviews: 7,
      slightlyNegativeReviews: 0,
      negativeReviews: 5,
      accountStatus: [
        { name: 'Google US', rating: 5.0, reviews: 25, fiveStarReviews: 25, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 },
        { name: 'Glassdoor', rating: 4.0, reviews: 16, fiveStarReviews: 5, fourStarReviews: 7, threeStarReviews: 0, twoStarReviews: 1, oneStarReviews: 3 },
        { name: 'Google Raja Colony', rating: 4.0, reviews: 3, fiveStarReviews: 2, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 1 }
      ],
      negativeReasons: [
        { name: 'Service Issues (Glassdoor)', value: 4, percentage: 80 },
        { name: 'Spam Review', value: 1, percentage: 20 }
      ]
    },
    'Apr': {
      totalReviews: 27,
      positiveReviews: 25,
      neutralReviews: 1,
      slightlyNegativeReviews: 1,
      negativeReviews: 0,
      accountStatus: [
        { name: 'Google US', rating: 5.0, reviews: 20, fiveStarReviews: 20, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 },
        { name: 'Google Raja Colony', rating: 4.4, reviews: 5, fiveStarReviews: 3, fourStarReviews: 1, threeStarReviews: 1, twoStarReviews: 0, oneStarReviews: 0 },
        { name: 'Google Mannarpuram', rating: 5.0, reviews: 2, fiveStarReviews: 2, fourStarReviews: 0, threeStarReviews: 0, twoStarReviews: 0, oneStarReviews: 0 }
      ],
      negativeReasons: [
        { name: 'Minor Issues', value: 1, percentage: 100 }
      ]
    }
  };

  // Time period options
  const timePeriods = ['All Months', 'Jan', 'Feb', 'Mar', 'Apr'];
  
  // Now define state
  const [timePeriod, setTimePeriod] = useState('All Months');
  
  // Get current data based on selected time period
  const currentData = dataByPeriod[timePeriod];
  
  // Calculate percentage of positive and negative reviews for current period
  const positivePercentage = Math.round((currentData.positiveReviews / currentData.totalReviews) * 100);
  const negativePercentage = Math.round((currentData.negativeReviews / currentData.totalReviews) * 100);
  const neutralPercentage = Math.round((currentData.neutralReviews / currentData.totalReviews) * 100);

  // PowerBI style column chart gradient
  const columnChartGradient = (id, color) => {
    return (
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.95}/>
          <stop offset="95%" stopColor={color} stopOpacity={0.7}/>
        </linearGradient>
      </defs>
    );
  };
  
  // PowerBI style gauge component
  const GaugeChart = ({ value, max, color, label, percentage, subtitle }) => {
    const percent = (value / max) * 100;
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" 
              stroke="#E0E0E0" 
              strokeWidth="5" 
              fillOpacity="0"
            />
            <path 
              d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" 
              stroke={color} 
              strokeWidth="5" 
              fillOpacity="0" 
              strokeDasharray={`${percent * 2.96}, 296.6`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="text-3xl font-bold" style={{ color }}>{value.toLocaleString()}</div>
            {percentage && <div className="text-xs text-gray-500">{percentage}%</div>}
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-700 text-center">{label}</div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
    );
  };

  // Custom tooltip for PowerBI style
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

  // Get insight based on current period
  const getInsight = () => {
    if (timePeriod === 'All Months') {
      return "Google US leads with 120 reviews (4.8⭐) from 1,075 total platform reviews; Glassdoor at 4.0⭐ with service feedback from 300 total reviews.";
    } else if (timePeriod === 'Jan') {
      return "Exceptional start with 94% 5-star reviews; Google US leads with perfect sentiment (48 reviews, 4.9⭐).";
    } else if (timePeriod === 'Feb') {
      return "Strong performance continues with 85% 5-star reviews; minimal negative feedback across all platforms.";
    } else if (timePeriod === 'Mar') {
      return "Glassdoor feedback impacts overall rating; Google US maintains perfect 5.0⭐ rating while Glassdoor shows service concerns.";
    } else {
      return "Recovery month with 93% positive reviews; Google US achieves perfect 5.0⭐ rating with 20 reviews.";
    }
  };

  // Calculate overall average rating
  const calculateOverallRating = () => {
    const totalScore = currentData.accountStatus.reduce((sum, account) => sum + (account.rating * account.reviews), 0);
    const totalReviews = currentData.accountStatus.reduce((sum, account) => sum + account.reviews, 0);
    return totalReviews > 0 ? (totalScore / totalReviews).toFixed(1) : 0;
  };

  return (
    <div className="p-4 bg-white font-sans min-h-screen" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* PowerBI-style Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">CSM Reviews Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Customer Satisfaction & Reviews Analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right mr-4">
            <div className="text-xs text-gray-500">Overall Rating</div>
            <div className="text-xl font-bold" style={{ color: COLORS.primary }}>{calculateOverallRating()}⭐</div>
          </div>
          <div className="flex space-x-1.5">
            {timePeriods.map(period => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm`}
                style={{ 
                  background: timePeriod === period ? 'linear-gradient(90deg, #4F4FFF 0%, #8F00FF 100%)' : '#F5F5F5',
                  color: timePeriod === period ? 'white' : '#333',
                  border: 'none'
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Key Metrics Section */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <GaugeChart 
            value={currentData.totalReviews} 
            max={200} 
            color={COLORS.primary} 
            label="Total Reviews" 
          />
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <GaugeChart 
            value={currentData.positiveReviews} 
            max={currentData.totalReviews} 
            color={COLORS.success} 
            label="5★ Reviews" 
            percentage={positivePercentage}
          />
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <GaugeChart 
            value={currentData.neutralReviews} 
            max={currentData.totalReviews} 
            color={COLORS.tertiary} 
            label="4★ Reviews" 
            percentage={neutralPercentage}
          />
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <GaugeChart 
            value={currentData.slightlyNegativeReviews} 
            max={currentData.totalReviews} 
            color={COLORS.warning} 
            label="3★ Reviews" 
            percentage={Math.round((currentData.slightlyNegativeReviews / currentData.totalReviews) * 100)}
          />
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <GaugeChart 
            value={currentData.negativeReviews} 
            max={currentData.totalReviews} 
            color={COLORS.danger} 
            label="1-2★ Reviews" 
            percentage={negativePercentage}
          />
        </div>
      </div>
      
      {/* Account Status & Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Account Status</h2>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-sm">{timePeriod}</span>
            </div>
          </div>
          
          <div className="mb-3 px-2">
            <div className="p-2 rounded-sm text-xs" style={{ 
              background: 'linear-gradient(90deg, rgba(79,79,255,0.05) 0%, rgba(79,79,255,0.1) 100%)', 
              color: '#333', 
              border: '1px solid #DEEBFF',
              borderLeft: '3px solid #4F4FFF'
            }}>
              <span className="font-bold" style={{ color: COLORS.primary }}>Key Insight:</span> {getInsight()}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={currentData.accountStatus}
              margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              barSize={30}
            >
              {columnChartGradient('reviewsGradient', COLORS.primary)}
              {columnChartGradient('positiveGradient', COLORS.success)}
              {columnChartGradient('negativeGradient', COLORS.danger)}
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} angle={-45} textAnchor="end" height={60} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="reviews" name="Total Reviews" fill="url(#reviewsGradient)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="fiveStarReviews" name="5★ Reviews" fill="url(#positiveGradient)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="oneStarReviews" name="1★ Reviews" fill="url(#negativeGradient)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Rating Distribution</h2>
          </div>
          
          <div className="space-y-3 mt-4">
            {currentData.accountStatus.map(account => (
              <div key={account.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#666' }}>{account.name}</span>
                  <div className="flex items-center">
                    <span className="text-xs font-bold mr-1" style={{ color: '#333' }}>{account.rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={COLORS.tertiary} stroke={COLORS.tertiary}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex h-1.5 w-full rounded-sm overflow-hidden">
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: COLORS.success, 
                      width: `${(account.fiveStarReviews/account.reviews)*100}%` 
                    }}
                  ></div>
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: COLORS.tertiary, 
                      width: `${(account.fourStarReviews/account.reviews)*100}%` 
                    }}
                  ></div>
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: COLORS.warning, 
                      width: `${(account.threeStarReviews/account.reviews)*100}%` 
                    }}
                  ></div>
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: COLORS.danger, 
                      width: `${((account.oneStarReviews + account.twoStarReviews)/account.reviews)*100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs" style={{ color: '#999' }}>{account.reviews} reviews</span>
                  <span className="text-xs" style={{ color: COLORS.success }}>{Math.round((account.fiveStarReviews/account.reviews)*100)}% 5★</span>
                </div>
                {account.totalAccountReviews && (
                  <div className="mt-1">
                    <span className="text-xs font-semibold" style={{ color: '#666' }}>Total on platform: {account.totalAccountReviews.toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Reasons for Negative Reviews & Monthly Trends */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Negative Review Analysis</h2>
          </div>
          
          <div className="mb-3 px-2">
            <div className="p-2 rounded-sm text-xs" style={{ 
              background: 'linear-gradient(90deg, rgba(79,79,255,0.05) 0%, rgba(79,79,255,0.1) 100%)', 
              color: '#333', 
              border: '1px solid #DEEBFF',
              borderLeft: '3px solid #4F4FFF'
            }}>
              <span className="font-bold" style={{ color: COLORS.primary }}>Key Insight:</span> {
                currentData.negativeReviews > 0 
                  ? `Negative reviews mainly from: Service issues on Glassdoor, spam on Google US, and app update requests on Google Mannarpuram`
                  : 'No negative reviews in this period!'
              }
            </div>
          </div>
          
          {currentData.negativeReviews > 0 ? (
            <div className="flex h-64">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentData.negativeReasons}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {currentData.negativeReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                          index === 0 ? COLORS.danger : 
                          index === 1 ? COLORS.warning :
                          index === 2 ? COLORS.tertiary :
                          index === 3 ? COLORS.quaternary :
                          COLORS.info
                        } />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                {currentData.negativeReasons.map((reason, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ 
                      backgroundColor: index === 0 ? COLORS.danger : 
                      index === 1 ? COLORS.warning :
                      index === 2 ? COLORS.tertiary :
                      index === 3 ? COLORS.quaternary :
                      COLORS.info
                    }}></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium" style={{ color: '#666' }}>{reason.name}</span>
                      <div className="flex items-center">
                        <span className="text-xs font-bold" style={{ color: '#333' }}>{reason.value}</span>
                        <span className="text-xs ml-1" style={{ color: '#999' }}>({reason.percentage}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill={COLORS.success} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold" style={{ color: COLORS.success }}>No negative reviews!</p>
                <p className="text-xs text-gray-500 mt-1">Excellent performance this period</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Monthly Review Trends</h2>
          </div>
          
          <div className="mb-3 px-2">
            <div className="p-2 rounded-sm text-xs" style={{ 
              background: 'linear-gradient(90deg, rgba(0,173,91,0.05) 0%, rgba(0,173,91,0.1) 100%)', 
              color: '#333', 
              border: '1px solid #D0F0E0',
              borderLeft: '3px solid #00AD5B'
            }}>
              <span className="font-bold" style={{ color: COLORS.secondary }}>Key Insight:</span> Review volume varies by month (27-64); consistently high ratings (4.2-4.8⭐) with 86% average 5-star reviews.
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
              data={monthlyTrendData}
              margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <YAxis yAxisId="right" orientation="right" domain={[3.5, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="total" name="Total Reviews" fill={COLORS.primary} radius={[2, 2, 0, 0]} barSize={12} />
              <Bar yAxisId="left" dataKey="positive" name="5★ Reviews" fill={COLORS.success} radius={[2, 2, 0, 0]} barSize={12} />
              <Bar yAxisId="left" dataKey="neutral" name="4★ Reviews" fill={COLORS.tertiary} radius={[2, 2, 0, 0]} barSize={12} />
              <Bar yAxisId="left" dataKey="negative" name="1-2★ Reviews" fill={COLORS.danger} radius={[2, 2, 0, 0]} barSize={12} />
              <Line yAxisId="right" type="monotone" dataKey="rating" name="Rating" stroke={COLORS.tertiary} strokeWidth={2.5} dot={{ stroke: COLORS.tertiary, r: 4, strokeWidth: 2, fill: 'white' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Account Rating Analysis */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Platform Performance Radar</h2>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentData.accountStatus}>
              <PolarGrid stroke="#E0E0E0" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#666' }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10, fill: '#666' }} />
              <Radar name="Rating" dataKey="rating" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.6} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-sm font-semibold" style={{ color: '#252423' }}>Review Volume vs Rating</h2>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart
              data={currentData.accountStatus}
              margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} angle={-45} textAnchor="end" height={60} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <YAxis yAxisId="right" orientation="right" domain={[3, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="reviews" name="Reviews" fill={COLORS.primary} radius={[2, 2, 0, 0]} barSize={20} />
              <Line yAxisId="right" type="monotone" dataKey="rating" name="Rating" stroke={COLORS.tertiary} strokeWidth={2.5} dot={{ stroke: COLORS.tertiary, r: 4, strokeWidth: 2, fill: 'white' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Summary Statistics */}
      <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#252423' }}>Quick Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.primary }}>{currentData.totalReviews}</div>
            <div className="text-xs text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.success }}>{positivePercentage}%</div>
            <div className="text-xs text-gray-600">5-Star Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.tertiary }}>{calculateOverallRating()}⭐</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.info }}>{currentData.accountStatus.length}</div>
            <div className="text-xs text-gray-600">Platforms</div>
          </div>
        </div>
      </div>
      
      {/* PowerBI-style footer with last updated timestamp */}
      <div className="mt-4 border-t border-gray-200 pt-2">
        <div className="flex justify-between">
          <div className="text-xs" style={{ color: '#999' }}>
            Data as of: May 23, 2025
          </div>
          <div className="text-xs" style={{ color: '#999' }}>
            CSM Reviews Dashboard v2.0 - Actual Data
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSMDashboard;