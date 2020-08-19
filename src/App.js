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
        name: 'My Favourites',
        songs: [
          {name:'Caledonia', duration: 200}, 
          {name:'Keep Ya Head Up', duration: 300}, 
          {name: 'Slippin', duration: 400}]
      },
      {
        name: 'Tunes',
        songs: [
          {name:'Naruto', duration: 231}, 
          {name:'Hey Ya', duration: 231}, 
          {name: 'Dream Attack', duration: 432}]
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
        <img alt=''/>
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, display:"inline-block", width: "25%"}}>
        <img alt=''/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>)}
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount(){
    setTimeout(()=>{ 
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    // gets playlists to render, only keep if includes filterString
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
    ) : []
  
    return(
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle,'font-size': '54px' }}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistsToRender.map(playlist => 
            <Playlist playlist={playlist}/>
          )}
          
        </div> : <h1 style={defaultStyle}>Loading</h1>}
      </div>
    );
  }
  
}

export default App;
