
export default class SystemService {

  constructor() {
  }

  // gets the current "system" time
  // this could be calling out to a separate service where the real system time is obtained
  getCurrentTime() {
    return new Date();
  }

}


