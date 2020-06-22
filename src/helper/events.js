const EventEmitter = {
  events:{},
  dispatch:(event,data) => {
    if(!EventEmitter.events[event]) return;
    EventEmitter.events[event].forEach(callback => callback(data));
  },
  subscribe:(event, callback) => {
    
    if(!EventEmitter.events[event])
    {
      EventEmitter.events[event] = [];
    }
    EventEmitter.events[event].push(callback);
  }
}

export default EventEmitter;