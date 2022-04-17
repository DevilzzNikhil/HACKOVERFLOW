import React, { Component } from 'react'
import loading from '../../GIFS/loading.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className='container text-center my-5 '>
          <img src={loading} alt="loading" />
      </div>
    )
  }
}
