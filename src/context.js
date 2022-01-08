import React, {useState, useContext, useEffect} from 'react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import add from 'date-fns/add';


const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState('');
    const [photos, setPhotos] = useState([]);

    

    // Helper function to check if # of days distance is > 30;
    // Takes two dates in yyyy-mm-dd format for comparison
    const getDateDifference = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        let differenceInTime = d2.getTime() - d1.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    }
    
    const getEndDate = (d1) => {
        // Add 30 days to the parameter date
        const endDate = add(new Date(d1), {
            days: 30,
        });
        // Format the end date as yyyy-mm-dd
        const endDateFormatted = endDate.toISOString().slice(0, 10);
        setEndDate(endDateFormatted);
    }

    const fetchPhotos = async () => {
        // Base search url for APOD
        let url=`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&start_date=${startDate}`;
        // Start loading before fetch starts
        setLoading(true);
        try {
            if(endDate) {
                url += `&end_date=${endDate}`;
            }
            // Parse the json data and set to photos state value
            const response = await fetch(url);
            const data = await response.json();
            const newPhotos = data.filter(picture => {
                if (picture.media_type === 'image') {
                    return picture;
                }
            })
            setPhotos(newPhotos);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPhotos();
    }, [startDate])

    return <AppContext.Provider value={{loading, setLoading, startDate, setStartDate, endDate, setEndDate, photos, setPhotos, getDateDifference, getEndDate}}>{children}</AppContext.Provider>
}

// Custom global context hook to access api url
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};