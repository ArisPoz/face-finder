import React, { Component } from 'react';
import Navigation from './Componenets/Navigation/Navigation';
import Rank from './Componenets/Rank/Rank';
import ImageLinkForm from './Componenets/ImageLinkForm/ImageLinkForm';
import FaceRecongition from './Componenets/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '76dcb5e080494e83b71d6dde6d160654'
})

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateBoxPosition = (data) => {
    const faceLocations = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftColumn: (faceLocations.left_col * width),
      topRow: (faceLocations.top_row * height),
      rightColumn: width - (faceLocations.right_col * width),
      bottomRow: height - (faceLocations.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
              .then(response => this.displayFaceBox(this.calculateBoxPosition(response)))
              .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Particles  className='particles' params={particlesOptions}/>
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecongition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;