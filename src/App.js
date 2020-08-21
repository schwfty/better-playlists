import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
          {name:'Batman', duration: 200}, 
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
      <div style={{...defaultStyle, display:"inline-block", margin: '20px', width: "25%"}}>
        <img alt='' src={playlist.imageUrl} style={{width: '160px'}}/>
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

    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    if (!accessToken) {
      return
    }

   // fetch the username
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({user: {name: data.display_name}}))

    // fetch the playlists - see https://developer.spotify.com/documentation/web-api/reference/playlists/

      // https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/ playlist read private may be an issue, let's see

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      return this.setState({
        playlists: data.items.map(item => {
          console.log(data.items)
          return {
            name: item.name,
            songs: [],
            imageUrl: item.images[0] ? item.images[0].url : ""
          }
        })
      });
    })

  }
  render() {
    // gets playlists to render, only keep if includes filterString
    let playlistsToRender = 
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []
  
    return(
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle,'font-size': '54px' }}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistsToRender.map(playlist => 
            <Playlist playlist={playlist}/>
          )}
          
        </div> : <button 
          onClick={()=> window.location.href.includes('localhost') 
          ? window.location.href='http://localhost:8888/login'
          : window.location.href='http://better-playlists-tom-backend.herokuapp.com/login'
          }
            style={{padding: '20px', 'font-size': '30px','margin-top': '20px'}}>Sign in with Spotify</button>}
      </div>
    );
  }
  
}

export default App;
