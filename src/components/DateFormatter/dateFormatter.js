function toGetTimeAgo(timestamp) {
    const currentDate = new Date();
    const date = new Date(timestamp);
    const timeDifference = currentDate.getTime() - date.getTime();
    const secondsInMs = 1000;
    const minutesInMs = secondsInMs * 60;
    const hoursInMs = minutesInMs * 60;
    const daysInMs = hoursInMs * 24;
    const weeksInMs = daysInMs * 7;

    if (timeDifference < minutesInMs) {
        return 'Just now';
    } else if (timeDifference < hoursInMs) {
        const minutesAgo = Math.floor(timeDifference / minutesInMs);
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < daysInMs) {
        const hoursAgo = Math.floor(timeDifference / hoursInMs);
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < weeksInMs) {
        const daysAgo = Math.floor(timeDifference / daysInMs);
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else {
        const monthsAgo = Math.floor(currentDate.getMonth() - date.getMonth() +
            (12 * (currentDate.getFullYear() - date.getFullYear())));
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    }
}

export { toGetTimeAgo };
