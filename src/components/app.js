import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search-bar';
import YTSearch from 'youtube-api-search';
import VideoList from "./video-list";
import VideoDetails from './video-details';
const YOUTUBE_API_KEY = 'AIzaSyBt5BwHlA7akczxsbrWvemBVwgYNk15mas';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('tactical military best')    
  }

  videoSearch(term) {
    YTSearch({ key: YOUTUBE_API_KEY, term: `tactical ${term}`} , videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    })
  }

  render() {
    const searchVideo = _.debounce((term) => {this.videoSearch(term)}, 500)

    return (
      <div className="app">
        <div className="logo">Tactical
          <span className="tube">Tube</span>
        </div>
        <SearchBar onSearchTermChange={searchVideo} />
        <VideoDetails video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}
