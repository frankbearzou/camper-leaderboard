import React from 'react';

const Title = (props) => (
  <div className="row text-center">
    <div className="col-md-12 title">
      <h3>Leader board</h3>
    </div>
  </div>
);

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_type: 'recent',
      recent_data: [],
      all_data: [],
    };
  }

  componentDidMount() {
    // get recent recent_data
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => response.json())
      .then(data => this.setState({
        recent_data: data
      }))
      .catch(err => console.log(err));

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(response => response.json())
      .then(data => this.setState({
        all_data: data
      }))
      .catch(err => console.log(err));
  }

  loadRecentData = () => {
    if (this.state.data_type === 'recent') {
      return;
    } else if (this.state.data_type === 'all') {
      this.setState({
        data_type: 'recent'
      });
    }
  };

  loadAllData = () => {
    if (this.state.data_type === 'all') {
      return;
    } else if (this.state.data_type === 'recent') {
      this.setState({
        data_type: 'all'
      });
    }
  };

  render() {
    console.log(this.state.recent_data.length);
    console.log(this.state.all_data.length);

    let data = [];
    if (this.state.data_type === 'recent') {
      data = this.state.recent_data;
    } else if (this.state.data_type === 'all') {
      data = this.state.all_data;
    }

    let tbody = (
      <tbody>
      {data.map((user, i) => {
        return (
          <tr key={i + 1}>

            <td className="col-md-1">{i + 1}</td>
            <td className="col-md-5">
              <a href={`https://www.freecodecamp.com/${user.username}`} target="_blank">
                <img src={user.img} className="user-img" alt="user-img"/>
                <span className="user-name">{user.username}</span>
              </a>

            </td>
            <td className="col-md-3 text-center">{user.recent}</td>
            <td className="col-md-3 text-center">{user.alltime}</td>
          </tr>
        );
      })}
      </tbody>
    );

    return (
      <div className="container">
        <Title/>
        <div className="row">
          <table className="col-md-12">
            <thead>
            <tr>
              <th className="col-md-1">#</th>
              <th className="col-md-5">Camper Name</th>
              <th id="recent" className="col-md-3 text-center"><a onClick={this.loadRecentData}>Points in past 30 days{this.state.data_type === 'recent' ? " ▼" : ''}</a></th>
              <th id="alltime" className="col-md-3 text-center"><a onClick={this.loadAllData}>All time points{this.state.data_type === 'all' ? " ▼" : ''}</a></th>

            </tr>
            </thead>
            {tbody}
          </table>
        </div>
      </div>
    );
  }
}

export default Detail;
