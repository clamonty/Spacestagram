import React from 'react'
import {useGlobalContext} from '../context'


const CalendarForm = () => {
    const {setStartDate, setEndDate, getDateDifference, getEndDate, startDate, endDate} = useGlobalContext();

    const today = new Date().toISOString().slice(0, 10);


    const handleSubmit = (e) => {
        // prevent page reload
        e.preventDefault();
        console.log(e.target[0].value);
        // Get todays date in yyyy/mm/dd
        const selectedDate = e.target[0].value;
        if (getDateDifference(selectedDate, today) <= 0) {
            setStartDate(today);
            setEndDate('');
        }
        else if (getDateDifference(selectedDate, today) < 30) {
            setStartDate(selectedDate);
            setEndDate('');
        }
        else {
            setStartDate(selectedDate);
            setEndDate(getEndDate(selectedDate));
        }
        console.log(startDate, endDate);
    }
    return (
        <section className='section search'>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="count">Starting from which date?</label>
                    <input defaultValue={today} min='2020-01-01' type="date"/>
                </div>
                <button className='btn btn-primary' type='submit'>Show me!</button>
            </form>            
        </section>
    )
}

export default CalendarForm
