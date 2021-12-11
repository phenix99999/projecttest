
const FIRST_DAY = 0;
export const areSameDates = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};
export function getDaysInMonth(month: number, year: number) {
    var date = new Date(year, month, 1);

    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export function groupDaysByWeek(dates: Date[]) {
    return dates.reduce<Date[][]>((weeks, date) => {
        if (weeks.length === 0 || date.getDay() === FIRST_DAY) {
            const newWeek = [date];
            return weeks.concat([newWeek]);
        }
        let week = weeks[weeks.length - 1];
        week.push(date);
        return weeks.slice(0, weeks.length - 1).concat([week]);
    }, []);
}

export function dateToFMDate(date: Date) {
    let month = parseInt(date.getMonth()) + 1;

    if (month < 10 && month.length == 1) {
        month = "0" + month;
    }

    let day = date.getDate();
    if (day < 10 && day.length == 1) {
        day = "0" + day;
    }

    console.log("Month " + month);
    console.log("Day " + day);
    return month + '/' + day + '/' + date.getFullYear()
}

export function dateToFrench(date: Date) {

    const months = [
        'Janv', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}


export function getNotEmptyDates(data, fieldName) {
    let notEmptyDates = [];
    let indexNotEmptyDates = 0;
    for (let i = 0; i < data.length; i++) {
        if (!notEmptyDates.includes(data[i][fieldName])) {
            notEmptyDates[indexNotEmptyDates] = new Date(data[i][fieldName]);
            indexNotEmptyDates++;
        }
    }

    return notEmptyDates;
}
