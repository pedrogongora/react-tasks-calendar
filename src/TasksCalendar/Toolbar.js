import React from 'react';
import moment from 'moment';
import Editable from './Editable';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export default function Toolbar({
  year,
  month,
  nextMonth,
  previousMonth,
  setYear,
  setMonth,
}) {
  const today = () => {
    const m = moment();
    setYear(m.year());
    setMonth(m.month());
  };
  return (
    <div className="toolbar clearfix">
      <div className="float-left">
        <div className="dropdown d-inline-block pr-3 align-baseline">
          <button
            type="button"
            className="p-0 btn dropdown-toggle"
            data-toggle="dropdown"
          >
            <span className="month h2 text-primary align-bottom">
              {months[month]}
            </span>
          </button>
          <div className="dropdown-menu">
            {months.map((n, i) => (
              <a
                key={`months[${i}]`}
                className="dropdown-item"
                href="#"
                onClick={() => setMonth(i)}
              >
                {n}
              </a>
            ))}
          </div>
        </div>

        <Editable
          text={year}
          classes="year h4 mb-0 text-primary align-middle"
          inputProps={{type: 'number', min: 1900, max: 2100, size: 4}}
          autoFocus={true}
          onChange={(y) => setYear(y)}
        />
      </div>

      <div className="nav-buttons float-right">
        <button
          type="button"
          className="btn btn-primary ml-5 d-inline align-middle"
          onClick={today}
        >
          Hoy
        </button>
        <div className="btn-group ml-5 d-inline align-middle">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={previousMonth}
          >
            &#9664;
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={nextMonth}
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
}
