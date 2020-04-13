import Dash from 'dash';

let client;

export default store => next => action => {
  next(action);

  switch(action.type){
    case 'INIT':
      client = new Dash.Client({network: 'testnet'});
      client.isReady(bla => console.log(bla));
    break;

    default:
      return;
  }
};
