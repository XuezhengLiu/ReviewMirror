import ReactEcharts from 'echarts-for-react'
import '../css/Infographic.css'

function Infographic () {
  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Amount Lost', 'Number of Reports']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Amount Lost',
        min: 0,
        max: 1500000,
        interval: 500000,
        axisLabel: {
          formatter: '$ {value}'
        }
      },
      {
        type: 'value',
        name: 'Number of Reports',
        min: 0,
        max: 3000,
        interval: 1000,
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],
    series: [
      {
        name: 'Amount Lost',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return '$ ' + value
          }
        },
        data: [
          686879, 566319, 527216, 420639, 451184, 562045, 673494, 959780, 1044253, 847829, 652816, 681757
        ]
      },
      {
        name: 'Number of Reports',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value
          }
        },
        data: [1285, 1147, 1568, 1686, 1811, 1695, 1681, 2318, 2822, 1873, 1425, 1382]
      }
    ]
  }

  const option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Amount Lost', 'Number of Reports']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Under 18', '18 - 24', '25 - 34', '35 - 44', '45 - 54', '55 - 64', 'Over 65'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Amount Lost',
        min: 0,
        max: 2000000,
        interval: 500000,
        axisLabel: {
          formatter: '$ {value}'
        }
      },
      {
        type: 'value',
        name: 'Number of Reports',
        min: 0,
        max: 4000,
        interval: 1000,
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],
    series: [
      {
        name: 'Amount Lost',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return '$ ' + value
          }
        },
        data: [
          96735, 955638, 1580571, 1627852, 1332559, 1043750, 834698
        ]
      },
      {
        name: 'Number of Reports',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value
          }
        },
        data: [298, 1768, 3591, 3406, 2875, 2530, 2483]
      }
    ]
  }

  return (
    <div className='Infographic'>
      <div className="container">
        <div className="row">
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
          <div className='col-xs-12 col-sm-12 col-md-10 col-lg-10 graphic'>
            <h3>Month distribution of Fake Review loss</h3>
            <ReactEcharts option={option1} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
        </div>
        <div className="row">
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
          <div id='graphic2' className='col-xs-12 col-sm-12 col-md-10 col-lg-10 graphic'>
            <h3>Age distribution of Fake Review loss</h3>
            <ReactEcharts option={option2} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
        </div>
      </div>
    </div>
  )
}

export default Infographic