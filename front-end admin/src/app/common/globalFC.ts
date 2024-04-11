import { TestBed } from "@angular/core/testing";

export function addDataChart(chart: any, label: any, newData: any) {
  chart.data.labels = label;
  chart.data.datasets.forEach((dataset: any) => {
    dataset.data = [];
    dataset.data = newData;
  });
  chart.update();
}

export function addBackGroundColor(chart: any) {
  chart.data.datasets[0].backgroundColor = [];
  chart.data.datasets[0].borderColor = [];
  for (let i = 1; i <= chart.data.labels.length; i++) {
    let resColor = getRandomRGBAColor();
    chart.data.datasets[0].backgroundColor = [
      ...chart.data.datasets[0].backgroundColor,
      resColor.backgroundColor,
    ];
    chart.data.datasets[0].borderColor = [
      ...chart.data.datasets[0].borderColor,
      resColor.borderColor,
    ];
  }
  chart.update();
}

export function addValueInChart(chart: any, fillText: any) {
  chart.options.animation.onComplete = ({ chart }: any) => {
    const ctx = chart.ctx;
    chart.config.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((bar: any, index: number) => {
        const data = `${getFormatPercentage(fillText[index])}%`;

        ctx.fillText(data, bar.x - 13, bar.y - 5);
      });
    });
  };
  chart.update();
}

export function deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomRGBAColor() {
  let R: number = getRandomInt(255),
    G: number = getRandomInt(255),
    B: number = getRandomInt(255),
    A: number = 0.2;
  return {
    backgroundColor: `rgba(${R}, ${G}, ${B}, ${A})`,
    borderColor: `rgba(${R}, ${G}, ${B})`,
  };
}

export function getFormatPercentage(value: number) {
  return parseFloat(`${value}`).toFixed(1);
}

export function getObjectTruThy(param: any) {
  let obj = param;
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
}
