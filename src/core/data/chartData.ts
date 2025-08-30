/* Device Chart */ 
export interface ActivityDevicesDataPoint {
  time: string;
  activity: number;
  devices: number;
  actualDate?: Date;
}

const hourlyLabels = Array.from({ length: 24 }, (_, h) =>
  h.toString().padStart(2, "0") + ":00"
);

export function generateHourlyActivityDevicesData(): ActivityDevicesDataPoint[] {
  return hourlyLabels.map((time) => ({
    time,
    activity: +(Math.random() * 100).toFixed(1),
    devices: +(5 + Math.random() * 15).toFixed(1), // 5–20 devices
  }));
}

export function generateDailyActivityDevicesData(days: number): ActivityDevicesDataPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const dayNum = days - i;
    const date = new Date(Date.now() - (dayNum - 1) * 24 * 60 * 60 * 1000);

    let label = "";
    if (days === 7) {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      label = weekdays[date.getDay()];
      if (dayNum === 1) label = "Today";
    } else if (dayNum === 1) {
      label = "Today";
    } else if (dayNum === days) {
      label = `${days}d ago`;
    } else if (days === 30 && (dayNum % 5 === 0 || dayNum === 1 || dayNum === days)) {
      label = `${dayNum}d`;
    }

    return {
      time: label,
      activity: +(Math.random() * 100).toFixed(1),
      devices: +(5 + Math.random() * 15).toFixed(1),
      actualDate: date,
    };
  });
}

export function getActivityDevicesDataByPeriod(period: string): ActivityDevicesDataPoint[] {
  switch (period) {
    case "24h":
      return generateHourlyActivityDevicesData();
    case "7d":
      return generateDailyActivityDevicesData(7);
    case "30d":
      return generateDailyActivityDevicesData(30);
    default:
      return generateHourlyActivityDevicesData();
  }
}

/*  Energy Chart Data */

export type TimeLabelValue = {
    time: string;
    value: number;
    actualDate?: Date;
  };
  
  export function generateHourlyEnergyData(): TimeLabelValue[] {
    const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    return hours.map(hour => ({
      time: hour,
      value: +(50 + Math.random() * 100).toFixed(1)
    }));
  }
  
  export function generateDailyEnergyData(days: number): TimeLabelValue[] {
    return Array.from({ length: days }, (_, i) => {
      const dayNum = days - i;
      const date = new Date(Date.now() - (dayNum - 1) * 24 * 60 * 60 * 1000);
      let label = '';
  
      if (days === 7) {
        // For 7-day view, use weekday abbreviations
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        label = weekdays[date.getDay()];
        if (dayNum === 1) label = 'Today';
      } else if (dayNum === 1) {
        label = 'Today';
      } else if (dayNum === days) {
        label = `${days}d ago`;
      } else if (days === 30 && [5, 10, 15, 20, 25, 30].includes(dayNum)) {
        label = `${dayNum}d`;
      }
  
      return {
        time: label,
        value: +(500 + Math.random() * 1000).toFixed(1),
        actualDate: date
      };
    });
  }
  
  /* Temperature Chart Data */
  export interface TemperatureDataPoint {
    time: string;
    qualityControlLab: number;
    coldStorageRoom: number;
    cleanRoom: number;
    actualDate?: Date;
  }
  
  export function generateHourlyTemperatureData(): TemperatureDataPoint[] {
    const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    return hours.map((hour) => ({
      time: hour,
      qualityControlLab: +(22 + Math.random() * 3).toFixed(1),
      coldStorageRoom: +(20 + Math.random() * 2).toFixed(1),
      cleanRoom: +(22.5 + Math.random() * 3).toFixed(1),
    }));
  }
  
  export function generateDailyTemperatureData(days: number): TemperatureDataPoint[] {
    return Array.from({ length: days }, (_, i) => {
      const dayNum = days - i;
      const date = new Date(Date.now() - (dayNum - 1) * 24 * 60 * 60 * 1000);
      let label = '';
  
      if (days === 7) {
        // For 7-day view, use weekday abbreviations
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        label = weekdays[date.getDay()];
        if (dayNum === 1) label = 'Today';
      } else if (dayNum === 1) {
        label = 'Today';
      } else if (dayNum === days) {
        label = `${days}d ago`;
      } else if (days === 30 && (dayNum % 5 === 0 || dayNum === 1 || dayNum === days)) {
        label = `${dayNum}d`;
      }
  
      return {
        time: label,
        qualityControlLab: +(22 + Math.random() * 3).toFixed(1),
        coldStorageRoom: +(20 + Math.random() * 2).toFixed(1),
        cleanRoom: +(22.5 + Math.random() * 3).toFixed(1),
        actualDate: date
      };
    });
  }
  
  export function getTemperatureDataByPeriod(period: string): TemperatureDataPoint[] {
    switch (period) {
      case "24h":
        return generateHourlyTemperatureData();
      case "7d":
        return generateDailyTemperatureData(7);
      case "30d":
        return generateDailyTemperatureData(30);
      default:
        return generateHourlyTemperatureData();
    }
  }
  
  // Sample static temperature data (optional)
  export const temperatureData = [
    { time: "00:00", qualityControlLab: 22.4, coldStorageRoom: 21.8, cleanRoom: 23.1 },
    { time: "04:00", qualityControlLab: 21.8, coldStorageRoom: 21.2, cleanRoom: 22.5 },
    { time: "08:00", qualityControlLab: 21.6, coldStorageRoom: 20.8, cleanRoom: 22.3 },
    { time: "12:00", qualityControlLab: 23.2, coldStorageRoom: 22.5, cleanRoom: 24.1 },
    { time: "16:00", qualityControlLab: 24.5, coldStorageRoom: 23.2, cleanRoom: 25.6 },
    { time: "20:00", qualityControlLab: 23.8, coldStorageRoom: 22.9, cleanRoom: 24.2 },
    { time: "24:00", qualityControlLab: 22.6, coldStorageRoom: 22.1, cleanRoom: 23.4 }
  ];


/* Temperature and Humidity Chart Data */
export interface TempHumidityDataPoint {
  time: string;
  temperature: number;
  humidity: number;
  actualDate?: Date;
}

const tempTimeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];

export function generateHourlyTempHumidityData(): TempHumidityDataPoint[] {
  return tempTimeLabels.map((time) => ({
    time,
    temperature: +(20 + Math.random() * 10).toFixed(1), // 20–30°C
    humidity: +(40 + Math.random() * 30).toFixed(1),    // 40–70%
  }));
}

export function generateDailyTempHumidityData(days: number): TempHumidityDataPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const dayNum = days - i;
    const date = new Date(Date.now() - (dayNum - 1) * 24 * 60 * 60 * 1000);

    let label = "";
    if (days === 7) {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      label = weekdays[date.getDay()];
      if (dayNum === 1) label = "Today";
    } else if (dayNum === 1) {
      label = "Today";
    } else if (dayNum === days) {
      label = `${days}d ago`;
    } else if (days === 30 && (dayNum % 5 === 0 || dayNum === 1 || dayNum === days)) {
      label = `${dayNum}d`;
    }

    return {
      time: label,
      temperature: +(20 + Math.random() * 10).toFixed(1),
      humidity: +(40 + Math.random() * 30).toFixed(1),
      actualDate: date,
    };
  });
}

export function getTempHumidityDataByPeriod(period: string): TempHumidityDataPoint[] {
  switch (period) {
    case "24h":
      return generateHourlyTempHumidityData();
    case "7d":
      return generateDailyTempHumidityData(7);
    case "30d":
      return generateDailyTempHumidityData(30);
    default:
      return generateHourlyTempHumidityData();
  }
}
  
/* Solar Energy ConsumptionChart Data */
export interface EnergyConsumGenDataPoint {
  time: string;
  consumption: number;
  generation: number;
  actualDate?: Date;
}

const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];

export function generateHourlyEnergyConsumGenData(): EnergyConsumGenDataPoint[] {
  return timeLabels.map((time) => ({
    time,
    consumption: +(2 + Math.random() * 3).toFixed(1), // 2–5 kW
    generation: +(Math.random() * 3).toFixed(1),       // 0–3 kW
  }));
}

export function generateDailyEnergyConsumGenData(days: number): EnergyConsumGenDataPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const dayNum = days - i;
    const date = new Date(Date.now() - (dayNum - 1) * 24 * 60 * 60 * 1000);
    
    let label = "";
    if (days === 7) {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      label = weekdays[date.getDay()];
      if (dayNum === 1) label = "Today";
    } else if (dayNum === 1) {
      label = "Today";
    } else if (dayNum === days) {
      label = `${days}d ago`;
    } else if (days === 30 && (dayNum % 5 === 0 || dayNum === 1 || dayNum === days)) {
      label = `${dayNum}d`;
    }

    return {
      time: label,
      consumption: +(2 + Math.random() * 3).toFixed(1),
      generation: +(Math.random() * 3).toFixed(1),
      actualDate: date,
    };
  });
}

export function getEnergyConsumGenDataByPeriod(period: string): EnergyConsumGenDataPoint[] {
  switch (period) {
    case "24h":
      return generateHourlyEnergyConsumGenData();
    case "7d":
      return generateDailyEnergyConsumGenData(7);
    case "30d":
      return generateDailyEnergyConsumGenData(30);
    default:
      return generateHourlyEnergyConsumGenData();
  }
}