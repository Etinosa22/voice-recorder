import React, { Component } from 'react'
import "./App.css"
import vmsg from 'vmsg'


//INITIALIZE NEW RECORDER 
const recorder = new vmsg.Recorder({
    //WEBASSEMBLYURL
    wasmURL: 'https://unpkg.com/vmsg@0.4.0/vmsg.wasm'
  })

class Record extends Component{
    state = {
        isLoading:false,
        isRecording:false,
        recordings:[]
      }
    
      record = async () => {
        this.setState({isLoading:true})
    
        //Permission to use Microphone
        if(this.state.isRecording){
          const blob = await recorder.stopRecording()
          this.setState({
            isLoading:false,
            isRecording:false,
            recordings:this.state.recordings.concat(URL.createObjectURL(blob))
          })
        }
        else{
          try{
            await recorder.initAudio()
            await recorder.initWorker()
            recorder.startRecording()
            this.setState({isLoading:false,isRecording:true})
          } catch(e){
            console.error(e)
            this.setState({isLoading:false})
          }
        }
      }
    
      render(){
    
        const {isLoading, isRecording, recordings} = this.state
    
        return(
          <React.Fragment>
            <div className="cont">
                <button onClick={this.record} disabled={isLoading} className="btn">{isRecording ? "stop" : "Record"}</button>
                <ul>
                    {recordings.map(url => (
                    <li key={url}>
                        <audio src={url} controls></audio>
                    </li>
                    ))}
                </ul>
           </div>
          </React.Fragment>
        )
      }
    }

export default Record
