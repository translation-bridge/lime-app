import { h, Component } from 'preact';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { changeInterface, changeStation, startAlign, stopTimer } from './alignActions';


import { getAll } from './alignSelectors';
import { getSelectedHost } from '../meta/metaSelectors';

class Align extends Component {

  componentWillMount() {
    this.props.startAlign();
  }

  componentWillUnmount() {
    this.props.stopAlign();
  }

  render(state) {
    return (
      <div class="container" style={{paddingTop:'100px'}}>
        <div class="row">
          <div  class="six columns">
            <span class="hostname">
              {this.props.selectedHost || ''}
            </span>
            <h1 class="signal">
              {state.alignData.currentReading.signal || 0}
            </h1>
            <span class="hostname">
              {state.alignData.currentReading.hostname || ''}
            </span>
          </div>
          <div class="six columns">
            <label translate="yes">Intefaces</label>
            <select class="block" onChange={(e)=>{ this.props.changeInterface(e.target.value); }} value={state.alignData.currentReading.iface ? state.alignData.currentReading.iface : null }>
              {state.alignData.ifaces.map((iface)=> {
                return <option value={iface.name}>{iface.name}</option>;
              })}
            </select>
            <label translate="yes">Stations</label>
            <select  class="block" onChange={(e) => { this.props.changeStation(e.target.value); }} value={state.alignData.currentReading.mac ? state.alignData.currentReading.mac : null }>
              {state.alignData.stations.map((station)=> {
                return <option value={station.mac}>{station.hostname}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    alignData: getAll(state),
    selectedHost: getSelectedHost(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterface : bindActionCreators(changeInterface, dispatch),
    changeStation : bindActionCreators(changeStation, dispatch),
    startAlign: bindActionCreators(startAlign, dispatch),
    stopAlign: bindActionCreators(stopTimer,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Align);
