function getDate(date) {
    let getyear = new Date().getFullYear(date);
    let getmounth = new Date(date).getMonth() + 1;
    if (getmounth < 10) getmounth = "0" + getmounth;
    let getday = new Date(date).getDate();
    if (getday < 10) getday = "0" + getday;

    return getday + "." + getmounth + "." + getyear;
}

export { getDate }