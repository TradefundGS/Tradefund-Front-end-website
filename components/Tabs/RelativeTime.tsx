import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface RelativeTimeProps {
    date: string;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({ date }) => {
    const dateObject = new Date(date);
    const relativeTime = formatDistanceToNow(dateObject, { addSuffix: true });

    return <span>{relativeTime}</span>;
};

export default RelativeTime;
