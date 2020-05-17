import React from "react";
import TimeAgo from "react-timeago";
import hoc from "./Covid19";
import "./Covid19.css";

function Page(props) {
  return (
    <table className="tablstl">
      <thead>
        <tr>
          <th className="title">Country</th>
          <th className="title">Confirmed</th>
          <th className="title">Recovered</th>
          <th className="title">Deaths</th>
          <th className="title">Last Update</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((stat, index) => (
          <tr key={index.toString()}>
            <td className="tdstyle">{stat.countryRegion}</td>
            <td className="tdstyle">{stat.confirmed}</td>
            <td className="tdstyle">{stat.recovered}</td>
            <td className="tdstyle">{stat.deaths}</td>
            <td className="tdstyle">
              {<TimeAgo date={stat.lastUpdate}></TimeAgo>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default hoc(Page, "https://covid19.mathdro.id/api/confirmed");
