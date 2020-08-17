import { combineEpics } from "redux-observable";

// import * as app from '../features/app/epics';
// import * as articles from '../features/articles/epics';
import * as core from "../features/core/epics";

export default combineEpics(...Object.values(core));
