import React from "react";
import axios from "axios";

// import { AgGridReact } from "ag-grid-react"
// import "ag-grid-community/dist/styles/ag-grid.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css"

function hoc(Component, api) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        statistics: [],
      };
    }
    componentDidMount() {
      axios
        .get(api)
        .then((response) => {
          let arrMain = [];
          let arrProvince = [];
          let arrMutual = [];
          let arrSeparate = [];
          //console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            if (!response.data[i].provinceState) {
              arrMain.push(response.data[i]);
            } else {
              arrProvince.push(response.data[i]);
            }
          }
          for (let j = 0; j < arrProvince.length; j++) {
            if (!arrMutual.includes(arrProvince[j].countryRegion)) {
              arrMutual.push(arrProvince[j].countryRegion);
            }
          }
          for (let k = 0; k < arrMutual.length; k++) {
            arrSeparate.push({
              countryRegion: arrMutual[k],
              lastUpdate: arrMutual[k],
              confirmed: 0,
              recovered: 0,
              deaths: 0,
            });
          }
          for (let f = 0; f < arrSeparate.length; f++) {
            for (let e = 0; e < arrProvince.length; e++) {
              if (
                arrSeparate[f].countryRegion === arrProvince[e].countryRegion
              ) {
                arrSeparate[f].confirmed += arrProvince[e].confirmed;
                arrSeparate[f].recovered += arrProvince[e].recovered;
                arrSeparate[f].deaths += arrProvince[e].deaths;
                arrSeparate[f].lastUpdate = arrProvince[e].lastUpdate;
              }
            }
          }
          for (let g = 0; g < arrMain.length; g++) {
            for (let d = 0; d < arrSeparate.length; d++) {
              if (arrSeparate[d].countryRegion === arrMain[g].countryRegion) {
                arrMain[g].confirmed += arrSeparate[d].confirmed;
                arrMain[g].recovered += arrSeparate[d].recovered;
                arrMain[g].deaths += arrSeparate[d].deaths;
                arrMain[g].lastUpdate = arrSeparate[d].lastUpdate;
                arrSeparate.splice(d, 1);
              }
            }
          }
          for (let z = 0; z < arrSeparate.length; z++) {
            arrMain.unshift(arrSeparate[z]);
          }
          //console.log(arrSeparate);

          this.setState({ statistics: arrMain });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    render() {
      return <Component data={this.state.statistics} {...this.props} />;
    }
  };
}

export default hoc;
