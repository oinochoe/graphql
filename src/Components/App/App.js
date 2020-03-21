import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notes from "../../Routes/Notes";

import { Query } from "react-apollo";
import { GET_NOTES } from "../../queries";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact={true} path={"/"} component={Notes} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
