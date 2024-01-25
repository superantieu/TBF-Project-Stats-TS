export const labelsStyle = {
  show: true,
  rotate: 0,
  hideOverlappingLabels: false,
  trim: true,
  style: {
    colors: "#e7dede",
    fontSize: "12px",
  },
};

export const optionsChart = (text: string, columnWidth: string) => {
  return {
    title: {
      text: text,
      align: "center",
      style: {
        fontSize: "16px",
        color: "#fff",
      },
    } as ApexTitleSubtitle,
    plotOptions: {
      bar: {
        columnWidth: columnWidth,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
};

export const yAxisStyleFc = (text: string, color: string) => {
  return {
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
      color: color,
    },
    labels: {
      style: {
        colors: color,
      },
    },
    title: {
      text: text,
      style: {
        color: color,
        fontSize: "14px",
      },
    },
  };
};

export const contributeOptionStyle = (categories: string[]) => {
  return {
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    } as ApexChart,
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      tickPlacement: "on",
      labels: labelsStyle,
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: "#e7dede",
      },
      title: {
        text: "Working time (hours)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#e7dede",
        },
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        formatter: function (val: any) {
          return val;
        },
        style: {
          colors: "#e7dede",
        },
      },
    },
  };
};
