import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#EDF2F7'
}

let fakeServerData = {
  user: {
    name: 'Thomas',
    playlists: [
      {
        name: 'My favourites',
        songs: [
          {name:'Caledonia', duration: 200}, 
          {name:'Keep Ya Head Up', duration: 300}, 
          {name: 'Party Up', duration: 400}]
      },
      {
        name: 'Tunes',
        songs: [
          {name:'Naruto', duration: 231}, 
          {name:'Hey Ya', duration: 231}, 
          {name: 'Thwok boom clash', duration: 432}]
      },
      {
        name: 'Classical guitar',
        songs: [
          {name:'Adagio', duration: 240}, 
          {name:'Formaggio', duration: 320}, 
          {name: 'Lente', duration: 222}]
      }
    ]
  }

};

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists.length} Playlists
        </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=> {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, song) => sum + song.duration, 0)
    return(
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{Math.round(totalDuration/60)} Minutes
        </h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, display:"inline-block", width: "25%"}}>
        <img/>
        <h3>Playlist name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {serverData: {}}
  }
  componentDidMount(){
    setTimeout(()=>{ 
      this.setState({serverData: fakeServerData});
    }, 5000);
  }
  render() {
    return(
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle,'font-size': '54px' }}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> : <h1 style={defaultStyle}>Loading</h1>}
      </div>
    );
  }
  
}

export default App;
