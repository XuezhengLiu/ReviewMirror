import ReactEcharts from 'echarts-for-react'
import '../css/Infographic.css'

function Infographic () {
  const option1 = {
    color: ['#5470c6', '#91cc75'],
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

  // const option3 = {
  //   color: ['#73c0de', '#5470c6'],
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     top: '5%',
  //     left: 'center'
  //   },
  //   series: [
  //     {
  //       name: 'Believe in Online Reviews',
  //       type: 'pie',
  //       radius: ['40%', '70%'],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: 'center'
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: '20',
  //           fontWeight: 'bold'
  //         }
  //       },
  //       labelLine: {
  //         show: false
  //       },
  //       data: [
  //         { value: 28, name: "No" },
  //         { value: 72, name: 'Yes' }
  //       ]
  //     }
  //   ]
  // }

  // const option4 = {
  //   color: ['#73c0de', '#5470c6'],
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     top: '5%',
  //     left: 'center'
  //   },
  //   series: [
  //     {
  //       name: 'Fallen for Fake Reviews',
  //       type: 'pie',
  //       radius: ['40%', '70%'],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: 'center'
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: '20',
  //           fontWeight: 'bold'
  //         }
  //       },
  //       labelLine: {
  //         show: false
  //       },
  //       data: [
  //         { value: 48, name: "No" },
  //         { value: 52, name: 'Yes' }
  //       ]
  //     }
  //   ]
  // }

  // const option5 = {
  //   color: ['#73c0de', '#5470c6'],
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     top: '5%',
  //     left: 'center'
  //   },
  //   series: [
  //     {
  //       name: 'Hard to Identify Fake Reviews',
  //       type: 'pie',
  //       radius: ['40%', '70%'],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: 'center'
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: '20',
  //           fontWeight: 'bold'
  //         }
  //       },
  //       labelLine: {
  //         show: false
  //       },
  //       data: [
  //         { value: 74, name: "No" },
  //         { value: 26, name: 'Yes' }
  //       ]
  //     }
  //   ]
  // }

  return (
    <div className='Infographic'>
      <div className="container">
        {/* <div className="row">
          <div className='col-xs-12 col-sm-5 col-md-5 col-lg-5 graphicPie'>
            <ReactEcharts option={option3} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-12 col-sm-7 col-md-7 col-lg-7 pieTitle'>
            <h3>28% say they don't trust online reviews</h3>
          </div>
        </div>
        <div className="row">
          <div className='col-xs-12 col-sm-5 col-md-5 col-lg-5 graphicPie'>
            <ReactEcharts option={option4} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-12 col-sm-7 col-md-7 col-lg-7 pieTitle'>
            <h3>52% believe they have have fallen for fake reviews</h3>
          </div>
        </div> */}
        {/* <div className="row">
          <div className='col-xs-12 col-sm-5 col-md-5 col-lg-5 graphicPie'>
            <ReactEcharts option={option3} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-12 col-sm-7 col-md-7 col-lg-7 pieTitle'>
            <h3>28% say they don't trust online reviews</h3>
          </div>
        </div> */}
        <div className="row">
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
          <div className='col-xs-12 col-sm-12 col-md-10 col-lg-10 graphic'>
            <h3>Month distribution of Fake Review loss in 2021</h3>
            <ReactEcharts option={option1} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
        </div>
        <div className="row">
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
          <div id='graphic2' className='col-xs-12 col-sm-12 col-md-10 col-lg-10 graphic'>
            <h3>Age distribution of Fake Review loss in 2021</h3>
            <ReactEcharts option={option2} style={{ height: '75%' }} />
          </div>
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
        </div>
        {/* <div className="row">
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
          <div className='col-xs-12 col-sm-12 col-md-10 col-lg-5 pieContainerLeft'>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-7 graphicPie'>
              <ReactEcharts option={option3} style={{ height: '75%' }} />
            </div>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-5 pieTitle'>
              <h5>Month distribution of Fake Review loss in 2021</h5>
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-10 col-lg-5  pieContainerRight'>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-7 graphicPie'>
              <ReactEcharts option={option4} style={{ height: '75%' }} />
            </div>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-5 pieTitle'>
              <h5>Month distribution of Fake Review loss in 2021</h5>
            </div>
          </div>
          <div className='col-xs-0 col-sm-0 col-md-1 col-lg-1'></div>
        </div> */}
      </div>
    </div>
  )
}

export default Infographic