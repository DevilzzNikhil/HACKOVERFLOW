import React from 'react'

const NavBar = (props) => {

    let { name, url, start_time, end_time, duration, site, status } = props;

    const countseconds = (totalSeconds) => {
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const days = Math.floor(totalSeconds / (3600 * 24));

        const secondsStr = makeHumanReadable(seconds, 'second');
        const minutesStr = makeHumanReadable(minutes, 'minute');
        const hoursStr = makeHumanReadable(hours, 'hour');
        const daysStr = makeHumanReadable(days, 'day');

        return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(/,\s*$/, '');
    }

    function makeHumanReadable(num, singular) {
        return num > 0
          ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
          : '';
      }

     const k = countseconds(props.duration);

    return (
        <div className='container'>

            <br />
            <br />

            <h2> {{name} ? "" : "None Of"}</h2>
            <div className="card text-center my-5">
                <div className="card-header bg-dark" style={{ color: 'white', fontSize: '20px' }} >
                    {site}
                </div>
                <div className="card-body" style={{ backgroundColor: 'whitesmoke' }}>
                    <h1 className="card-title" style={{color: "black"}} ><b>{name}</b></h1>
                    <br />
                    <br />
                    <p className="card-text"> <strong>Start Time</strong> : {new Date(start_time).toGMTString()}</p>
                    <p className="card-text"> <strong>End Time</strong> :  {new Date(end_time).toGMTString()}</p>
                    <p className="card-text"> <strong>Duration</strong> :  {k}</p>

                    <a href={url} className="btn btn-lg btn-info">Go to Link </a>
                </div>
                <div className="card-footer bg-success" style={{ color: 'white', fontSize: '20px' }}>
                    {status === "CODING" ? 'ACTIVE' : 'INACTIVE'}
                </div>
            </div>
        </div>
    )

}

export default NavBar